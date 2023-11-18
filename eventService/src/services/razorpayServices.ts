const razorpayKey= "rzp_test_sIR02kOhciAGll";
const  razorpaySecret="mg1EJI3f1zr07H6YeRkCF98O";
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
    console.log(response, "response")
    return response.data
  })
  .catch(function (error: any) {
    console.log(error, "error")

    return error
  });

 return resp
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




export async function addBankDetail(account_id:any,product_id:any,bankDetail:any) {
console.log(account_id,product_id)
 const bank_details = {
 settlements:{
  account_number:"1234567890",
  ifsc_code:"HDFC0000317",
  beneficiary_name:"Gaurav Kumar"
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


export async function verifyBankDetail() {

  
  
  const axiosInstance = axios.create({
    baseURL: 'https://api.razorpay.com/v2',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    }
  });
  
  
 


  
  const bankDetails = {
    account_number:"1234567890",
    ifsc_code:"HDFC0000317",
    beneficiary_name:"Gaurav Kumar"
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






export async function CapturePayment(paymentID: any, amount: any, currency: any, key: any, secret: any) {
  var axios = require('axios');
  var headers = {
    'Content-type': 'application/json'
  };
  var config = {
    method: 'post',
    url: `https://${key}:${secret}@api.razorpay.com/v1/payments/${paymentID}/capture`,
    headers: headers,
    data: {
      amount: amount,
      currency: currency,
    },

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
