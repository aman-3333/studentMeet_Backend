export async function generateOtp(phone: String, otp: String) {
    var axios = require('axios');

    var config = {
        method: 'get',

        url: 'https://2factor.in/API/V1/09cd0315-b240-11ec-a4c2-0200cd936042/SMS/+' + phone + '/' + otp,

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