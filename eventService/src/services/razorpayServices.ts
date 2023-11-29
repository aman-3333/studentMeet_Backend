const razorpayKey= "rzp_test_sIR02kOhciAGll";
const  razorpaySecret="mg1EJI3f1zr07H6YeRkCF98O";
const crypto = require("crypto");
const Razorpay = require('razorpay');
var axios = require('axios');
const auth = Buffer.from(`${razorpayKey}:${razorpaySecret}`).toString('base64');
const  headers={
    'Content-Type': 'application/json',
    'Authorization': `Basic ${auth}`
  }




export async function linkedAccount(data: any) {
  console.log("data 14",data);
  
  var config = {
    method: 'post',
    url: 'https://api.razorpay.com/v2/accounts',
    headers: headers,
    data,

  };
  const resp = await axios(config)
  .then(function (response: any) {
    console.log(response, "response")
    return response.data
  })
  .catch(function (error: any) {
    console.log(error, "error")

    return error
  });

 return resp
}






export async function capturePayment(payment_id:any,amount:any) {
  const razorpay = new Razorpay({
    key_id: razorpayKey,
    key_secret: razorpaySecret,
  });
 
  const Amount  = amount*100

return razorpay.payments.capture(payment_id, Amount, (error:any, payment:any) => {
    if (error) {
      console.error('Capture failed:', error);
      // Handle error
    } else {
      console.log('Payment captured:', payment);
      return payment
   
      // Process successful payment capture
    }
  });

 
  




   
}


export async function validatePayment(order_id: any,payment_id:any,razorpay_signature:any) {
  const sign = crypto
    .createHmac("sha256", razorpaySecret)
    .update(order_id+ "|" + payment_id)
    .digest("hex");
  return sign == razorpay_signature;
   
}




export async function createProduct(account_id: any) {
  const createProduct ={
    product_name:"route",
    tnc_accepted:true
 };
  const axiosInstance = axios.create({
    baseURL: 'https://api.razorpay.com/v2',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    }
  });


let linkProduct = await  axiosInstance.post(`/accounts/${account_id}/products`, createProduct)
  .then((response:any) => {
    return  response.data
    // Handle successful response
  })
  .catch((error:any) => {
    // Log the error response for more details
    if (error.response) {
      console.error('Request failed with status:', error.response.status);
      console.error('Error response data:', error.response.data);
    } else {
      console.error('Error message:', error.message);
    }
  });
  
return linkProduct    
}




export async function addBankDetail(account_id:any,product_id:any,bankDetail:any,beneficiary_name:any) {
console.log(account_id,product_id)
 const bank_details = {
 settlements:{
  account_number:bankDetail.account_number,
  ifsc_code:bankDetail.ifsc_code,
  beneficiary_name:beneficiary_name
},
tnc_accepted:true,

 }





  const axiosInstance = axios.create({
    baseURL: 'https://api.razorpay.com/v2',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    }
  });


let updateProduct = await  axiosInstance.patch(`/accounts/${account_id}/products/${product_id}/`, bank_details)
  .then((response:any) => {
    return  response.data
    // Handle successful response
    console.log('Success:', response.data);
  })
  .catch((error:any) => {
    // Log the error response for more details
    if (error.response) {
      console.log(error,"error")
      console.error('Request failed with status:', error.response.status);
      console.error('Error response data:', error.response.data);
    } else {
      console.error('Error message:', error.message);
    }
  });

return updateProduct
  
    
}


export async function verifyBankDetail(bankDetail:any,beneficiary_name:any) {

  
  
  const axiosInstance = axios.create({
    baseURL: 'https://api.razorpay.com/v2',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    }
  });
  
  
 


  
  const bankDetails = {
    account_number:bankDetail.account_number,
    ifsc_code:bankDetail.ifsc_code,
    beneficiary_name:beneficiary_name
    // Add any other required details
  };
  
  axiosInstance.post('/verify/bank_account', bankDetails)
    .then((response:any) => {
      console.log('Verification Response:', response.data);
      // Handle the verification response here
    })
    .catch((error:any) => {
      console.error('Error verifying bank details:', error.response ? error.response.data : error.message);
      // Handle errors here
    });


    
      
  }










export async function accountStatusUpdate(account_id: any) {
  const razorpay = new Razorpay({
    key_id: razorpayKey,
    key_secret: razorpaySecret,
  });

  razorpay.accounts.edit(account_id, {
    active: true // Set the appropriate field or parameters according to your requirement
}, function(error:any, response:any) {
    if (error) {
        console.error('Error updating account status:', error);
        // Handle error appropriately
    } else {
        console.log('Account status updated:', response);
        // Handle successful response
    }
});






}

