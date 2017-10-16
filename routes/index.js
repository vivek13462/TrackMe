var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
    if(req.user.agent_name != "Admin")
	res.render('index',{items: req.user.agent_name, condition:true}); //The 'condition' parameter is used in layout.handlebars page.
    else if(req.user.agent_name = "Admin")
        res.render('AllThreats',{items: req.user.agent_name, condition:false});
    else
      res.render('index',{items: req.user.agent_name});  
});

function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/users/login');
	}
}

module.exports = router;
