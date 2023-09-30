var FCM=require('fcm-node');
var serverKey='AAAAv7G5mjA:APA91bFq_kizDd0N3mckMNDyYzhg8WItH3xvHXeKqfT8MUaUjiT_aCl-_iR9YeEZSsaRJ6HOx7Rv3Xp4MA-NbVJ8tBDKR_5mOLnx6Rm7_PBaB6ssL44NQgazOrtJ-FzB95SS5qG74D1n';
var fcm =new FCM(serverKey)
const admin = require('firebase-admin');
 


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
console.log("message",message);

fcm.send(message,(err:any,response:any)=>{
if(err){
    console.log("something has gon wrong",err);
}
else{
    console.log("successful send ",response);
}
})
}







// export async function sendNotification(deviceToken:any,title:any,body:any,screen:any) {


// admin.initializeApp({
//   credential: admin.credential.cert(serverKey),
//   databaseURL: 'YOUR_DATABASE_URL'
// });

// const payload = {
//   notification: {
//     title: title,
//     body: body
//   },
//   data: {
//     screen: screen // Screen name to redirect to
//   }
// };
// admin.messaging().sendToDevice(deviceToken, payload);

// }
// Send the notification

