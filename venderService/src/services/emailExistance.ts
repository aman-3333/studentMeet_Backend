
export async function emailExistance(email: any,api_key_email:any) {
    var axios = require('axios');
    var config = {
        method: 'get',
        url: `https://emailverification.whoisxmlapi.com/api/v1?apiKey=${api_key_email}&emailAddress=${email}`,
        headers: { }
      };
      
     const resp = await axios(config).then(function (response: any) {
        console.log(JSON.stringify(response.data));
        return response.data
      }).catch(function (error: any) {
        console.log(error);
        return error.response.data
      });

      return resp;

}