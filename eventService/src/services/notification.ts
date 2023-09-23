var FCM=require('fcm-node');
var serverKey='AAAA9mFkxvw:APA91bG0MYFAOeR_IDBtDNegKWqCGeN-zx1faQ7ay0GGJJL9LCJtwDc2FIYAiFkrrU5UK_Ns7bLUW86hfRSEmcwn83iDWuw9DXEz1Mobn_4MXwcbK2OKO9jZQF43Pr8QTzw78EC6NxOk';
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
    },
      data: {
    screen: screen // Screen name to redirect to
  }
    
};
console.log("message",message);

fcm.send(message,(err:any,response:any)=>{
if(err){
    console.log("something has gon wrong");
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

