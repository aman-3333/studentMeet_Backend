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

  
  var config = {
    method: 'post',
    url: 'https://api.razorpay.com/v2/accounts',
    headers: headers,
    data,

  };
  const resp = await axios(config)
  .then(function (response: any) {
    
    return response.data
  })
  .catch(function (error: any) {
    

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
     
      // Handle error
    } else {
     
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










export async function accountStatusUpdate(account_id: any,name:any,email:any) {


  const axios = require('axios');

  const apiKey = razorpayKey; // Replace with your Razorpay API key
  const apiUrl = 'https://api.razorpay.com/v1/accounts'; // Razorpay API endpoint for accounts
  

  

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`,
  };
  const activationData = {
    // Include the necessary fields to complete the activation form
    // Refer to the Razorpay API documentation for the required fields
    // Example:
    legal_name: name,
    email: email,
    // Add more fields as needed
  };
  



  try {
    const response = await axios.patch(`${apiUrl}/${account_id}`, activationData, { headers });

    console.log('Activation form completed successfully:', response.data);
  } catch (error:any) {
    console.error('Error completing activation form:', error.response ? error.response.data : error.message);
  }



 
  











}




