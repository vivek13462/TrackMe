

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
                            var policeInfo =[];
                            policeInfo[0]=data.businesses[0].name;
                            policeInfo[1]=data.businesses[0].phone;
                            policeInfo[2]=data.businesses[0].location.display_address;
                            location.href="/fetching_yelpdata/" +policeInfo;
                            
                        },
                        error:function(){
                            alert("error");
                        }  
            });
   
            }



function ChangeStatus(userName){
        
                       $.ajax({
                        url:"/updateStatus/" + userName,
                        type: "POST",
                        dataType: "json",
                        contentType: "Application/Json",
                        success:function(data){
                            alert("Success");
                            
                        },
                        error:function(){
                            alert("error");
                        }  
            });
   
} 



