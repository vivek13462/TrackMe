

function sendRequest(lat,lng,status){
                           if(status == "Complete")
                           {
                               alert("Case Already Reported");
                           }
    else{
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
   
            }



function ChangeStatus(userName){
    
                       $.ajax({
                        url:"/updateStatus/" + userName,
                        type: "POST",
                        dataType: "json",
                        contentType: "Application/Json" 
            });
        } 


function InformPolice(source_address){
        
                       $.ajax({
                        url:"/sendSMS/" + source_address ,
                        type: "POST",
                        dataType: "json",
                        contentType: "Application/Json",
                        success:function(data){
                            alert(data.result);
                            
                        }
            });
   
} 

function graphView(){
                         
                    $.ajax({
                        url:"/get-count",
                        type: "GET",
                        dataType: "json",
                        contentType: "Application/Json",
                        success:function(data){
                            var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Fullerton", "Los Angeles", "Manhattan", "Detroit", "Boston", "Dallas"],
        datasets: [{
            label: '# of Crimes',
            data: [data.count, 4, 3, 15, 2, 8],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
                        },
                        error:function(){
                            alert("error");
                        }  
            });
        }
function SuccessUpload(){
        
                     alert("Footage sent to Police Department");
} 

