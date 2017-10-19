

function sendRequest(lat,lng){
    $.getScript('https://ajax.aspnetcdn.com/ajax/knockout/knockout-3.3.0.js', function()
{
    var vm = {
    searchResults: ko.observableArray()
};
ko.applyBindings(vm);

                var user_lat = lat;
                var user_lng = lng;
                var info =[];
                info[0]=user_lat; info[1]=user_lng
                    $.ajax({
                        url:"/Navigate/" + info,
                        type: "POST",
                        dataType: "json",
                        contentType: "Application/Json",
                        success:function(data){
                            for (i = 0; i < data.businesses.length; i++){
                            alert(data.businesses.length);
                            alert(data.businesses[i].name);
                            alert(data.businesses[i].phone);
                            alert(data.businesses[i].location.display_address);
                                var x = document.createElement("LABEL");
                                var t = document.createTextNode("Male");
                                var parentTextBox = window.opener.document.getElementById('male');
                                }
                            location.href="/fetching_yelpdata/";
                            
                        },
                        error:function(){
                            alert("error");
                        }  
            });
        });
            }



