var FCM=require('fcm-node');
var serverKey='';
var fcm =new FCM(serverKey)



export async function sendNotification(fcmToken:any,title:any,body:any) {
var message={
    to:fcmToken,
    notification:{
        title:title,
        body:body,
        sound:true,
        vibrate:true
    }
};
fcm.send(message,(err:any,response:any)=>{
if(err){
    console.log("something has gon wrong");
}
else{
    console.log("successful send ",response);
}
})
}