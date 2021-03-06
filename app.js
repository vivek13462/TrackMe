var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var Yelp = require("yelp");
var configAuth = require('./config/auth');
var yelp = new Yelp(configAuth.yelp);
var multer = require('multer');

var Gallery = require('express-photo-gallery');

/*mongoose.connect('mongodb://cpsc473:webdev@ds053146.mlab.com:53146/473projects');*/
mongoose.connect('mongodb://vivek.13462:montuu8088@ds115035.mlab.com:15035/trs');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


app.use('/', routes);
app.use('/users', users);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});

app.get('/get-location', function (req,res) {
  var user = req.user.agent_id;
  db.collection('locations').find({ userid: { $eq: user }}).toArray(function (err, resultArray) {
    if (err) return console.log(err);
    res.render('sentlocations', {items: resultArray, condition:true});
  });
});

app.get('/get-allThreats', function (req,res) {
  var user = req.user.agent_id;
  db.collection('locations').find({ }).toArray(function (err, resultArray) {
    if (err) return console.log(err);
    res.render('AllThreats', {items: resultArray});
  });
});


var options = {
  title: 'Crime Footage'
};
 
app.use('/crimeFootage', Gallery('crime_footage', options));

app.get('/get-count', function (req,res) {
  var noOfReports = db.collection('locations').find({userCity: { $in: ["Fullerton, CA 92831, USA"]} }).count({}, function( err, count){
      console.log(count);
   res.json({'count': count});
})
});

 var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./crime_footage");
     },
     filename: function(req, file, callback) {
         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
     }
 });

 var upload = multer({
     storage: Storage
 }).array("imgUploader", 3); //Field name and max count

app.post("/footageUpload", function(req, res) {
     upload(req, res, function(err) {
         if (err) {
             return res.end("Something went wrong!");
         }
         res.render('sentlocations', {condition:true});
     });
 });

app.get('/fetching_yelpdata/:policeInfo', function (req,res) {
  var data= req.params.policeInfo
  var dataArray = data.split(",");
    res.render('NearbyPolice', {name: dataArray[0],phone: dataArray[1],address: dataArray[2],city: dataArray[3],state: dataArray[4]});
  });

app.post('/Navigate/:info', function (req,res) {
     global.user_ll = req.params.info;
    
     yelp.search({
            term: "police",
            ll: user_ll
        })
            .then(function(data) {
                res.json(data);
            })
            .catch(function(err) {
                console.log(err);
            });
    
});

app.post('/updateStatus/:userName', function (req,res) {
    db.collection('locations').update({username:req.params.userName}, {$set: {status:"Complete"}})
    db.collection('locations').update({username:req.params.userName}, {$set: {clientStatus:"Police is on the way"}})
 
});

app.post('/sendSMS/:source_address', function (req,res) {
var source = req.params.source_address;  
var destination = user_ll;
var origin = source.split(' ').join('+');
/*const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: "5c171cf4",
  apiSecret: "b53eed2bba15618f"
});
 
 
nexmo.message.sendSms(
  '12013514504', '16572818186', 'https://www.google.com/maps/dir/?api=1&origin=' + origin +'&destination=' + destination,
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
          console.log("YESS");
        console.dir(responseData);
      }
    }
 );*/

 // Twilio Credentials
const accountSid = 'ACd7bc7aa1ebb76f11a5748151885a7a6a';
const authToken = 'd7968a3f67dceb70cfc0ee691102646e';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

client.messages.create(
  {
    to: '+16572818186',
    from: '+19103569235',
    body: 'https://www.google.com/maps/dir/?api=1&origin=' + origin +'&destination=' + destination,
  },
  (err, message) => {
    console.log(message.sid);
  }
);
    
 res.json({'result': "SMS successfully sent!"});
});

var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({ service: 'Gmail', auth: { user: 'tom.masonchill@gmail.com', pass: 'tommasonchill' } });

app.post('/', function(req, res) {
  var userLat = req.body.lat;
  var userLng = req.body.lng;
  var userMsg = req.body.msg;
  var city = req.body.city;    
  var userName;
  var userLocation = {
        lat: userLat,
        lng: userLng,
        message: userMsg
  };

  db.collection('users').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('Server Speaking by request');
    console.log("Latitude: " + userLat);
    console.log("Longitude" +userLng);
    console.log("Message: " + userMsg);

    var userId = req.user.agent_id;
    var userName = req.user.agent_name;

    db.collection('locations').insert({
      "username": userName,
      "userid": userId,
      "location": userLocation,
      "userCity": city,
      "status": "",
      "clientStatus": "In Progress"
    });

    console.log('saved to database');

    // setup e-mail data with unicode symbols
    var mailOptions = {
      from: userName, // sender address
      to: 'vivek.13462@gmail.com', // list of receivers
      subject: 'User Location- New Threat Reported', // Subject line
      text: "User Name: " + userName + ', Latitude: ' + userLat + ', Longitude: ' + userLng + ', Message: ' + userMsg, // plaintext body
      html: "User Name: " + userName + ', Latitude: ' + userLat + ', Longitude: ' + userLng + ', Message: ' + userMsg // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        res.json({'result': "Email error"});
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    })

    res.json({'result': "Email successfully sent!"});
  })
});
