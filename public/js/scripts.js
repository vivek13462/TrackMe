
function sendRequest(lat,lng){
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
                            alert("Executing properly");
                            console.log(data);
                            location.href="/users/nearpolice/" +data
                        },
                        error:function(){
                            alert("error");
                        }  
            });
            }