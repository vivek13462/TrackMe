
function sendRequest(lat,lng){
                alert(lat);
                alert(lng);
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

function myFunction(temp) {
    alert(temp);
    document.getElementById("demo").innerHTML = temp;
}

