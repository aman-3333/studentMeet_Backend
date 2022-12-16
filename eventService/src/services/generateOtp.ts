export async function generateOtp(phone: String, otp: String) {
    var axios = require('axios');

    var config = {
        method: 'get',

        url: 'https://2factor.in/API/V1/f943f4f2-7c7a-11ed-9158-0200cd936042/SMS/+' + phone + '/' + otp,

        headers: {}
    };

    let resp = await axios(config).then(function (response: any) {
        //console.log(JSON.stringify(response.data));;
        return response.data;
    }).catch(function (error: any) {
        //console.log(error.response.data);
        return error.response.data;
    });

    return resp;

}