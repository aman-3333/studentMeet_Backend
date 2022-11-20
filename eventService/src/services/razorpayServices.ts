export async function createVendorAccount(data: any, key_id: any, key_secret: any) {
  var axios = require('axios');
  var headers = {
    'Content-type': 'application/json'
  };
  var config = {
    method: 'post',
    url: 'https://api.razorpay.com/v1/beta/accounts',
    headers: headers,
    data: JSON.stringify(data),
    auth: {
      'username': key_id,
      'password': key_secret
    }
  };

  const resp = await axios(config)
    .then(function (response: any) {
      console.log(response, "respinse")
      return response.data
    })
    .catch(function (error: any) {
      console.log(error, "error")

      return error
    });
  return resp
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
      return error
    });
  return resp
}