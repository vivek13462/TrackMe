
function sendRequest(lat,lng){
                /*alert(lat);
                alert(lng);*/
                var user_lat = lat;
                var user_lng = lng;
                var info =[];
                info[0]=user_lat; info[1]=user_lng
                 alert(info[0]);
                 alert(info[1]);
                    $.ajax({
                        url:"/Navigate/" + info,
                        type: "POST",
                        dataType: "json",
                        contentType: "Application/Json",
                        success:function(data){
                            user_info(data.result);},
                        error:function(){
                            alert("error");
                        }
                
            });
            }

function user_info(user_param){
                    $.ajax({
                        url:"/Navigate/",
                        type: "GET",
                        dataType: "json",
                        contentType: "Application/Json",
                        success:function(data){
                        location.href="/users/nearpolice/" + user_param
                        },
                        error:function(){
                            alert("error");
                        }
                
            });
            
}

function showPosition() {
    alert("New function");
    //Fetch Police dept nearby
    $.ajax({
        url: "/find/",
        dataType: "json",
        type: 'GET',
        success: function(data) {

            //console.log(data);
            data.businesses.forEach(function(business) {
                //console.log(business);
                business.newID = business.id + "123";
                business.newIDlink = "#" + business.newID;
                vm.searchResults.push(business);
                var restaurant = business.name;
            });
            
        },
        error: function(xhr, status, error) {
            console.log("search failed");
        }
    });
}
