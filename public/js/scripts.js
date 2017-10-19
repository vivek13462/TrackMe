

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
                            console.log(data.region);
                            alert("Executing properly");
                            data.businesses.forEach(function(business) {
                            business.newID = business.id + "123";
                            business.newIDlink = "#" + business.newID;
                            alert(data.businesses[0].name);
                            vm.searchResults.push(business);
                            })
                            location.href="/fetching_yelpdata/" +vm.searchResults;
                            
                        },
                        error:function(){
                            alert("error");
                        }  
            });
        });
            }



