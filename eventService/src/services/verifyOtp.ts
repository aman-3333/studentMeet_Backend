export async function verifyOtp(otpInfo: any, otp: String) {
    var axios = require('axios');

    var config = {
        method: 'get',

        url: 'https://2factor.in/API/V1/f943f4f2-7c7a-11ed-9158-0200cd936042/SMS/VERIFY/' + otpInfo.otpId + '/' + otp,

        headers: {
            'Content-Type': 'application/json'
        }
    };

    let resp = await axios(config).then(function (response: any) {
        return response.data;
    }).catch(function (error: any) {
        return error.response.data;
    });

    return resp;

}