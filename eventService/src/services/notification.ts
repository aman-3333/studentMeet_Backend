var FCM=require('fcm-node');
var serverKey='AAAA9mFkxvw:APA91bG0MYFAOeR_IDBtDNegKWqCGeN-zx1faQ7ay0GGJJL9LCJtwDc2FIYAiFkrrU5UK_Ns7bLUW86hfRSEmcwn83iDWuw9DXEz1Mobn_4MXwcbK2OKO9jZQF43Pr8QTzw78EC6NxOk';
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