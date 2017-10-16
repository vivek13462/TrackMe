
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

function FindNearbyPolice() {
    alert("New function");
    //Fetch Police dept nearby
    $.ajax({
        url: "/find/",
        dataType: "json",
        type: "GET",
        contentType: "Application/Json",
        success: function(data) { 
            console.log(data);
            alert("Successful");
        },
        error: function() {
            alert("search failed");
        }
    });
}
