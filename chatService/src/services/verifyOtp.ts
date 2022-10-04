export async function verifyOtp(otpInfo: any, otp: String) {
    var axios = require('axios');

    var config = {
        method: 'get',

        url: 'https://2factor.in/API/V1/3f1fec94-c46e-11eb-8089-0200cd936042/SMS/VERIFY/' + otpInfo.otpId + '/' + otp,

        headers: {
            'Content-Type': 'application/json'
        }
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