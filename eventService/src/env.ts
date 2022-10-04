import nconf from "nconf";

export default function setEnvironment() {
   // console.log("Arguments provided: ", process.argv);
    const params = process.argv.filter((a) => a.startsWith("env="))
    if(!params || params.length < 0) {
        throw Error("Please provide the enviroment as a param. [env=dev/test/prod]");
    }
    const env = params[0].split('=')[1];
    console.log("Environment: ", env);
    nconf.set('NODE_ENV', env);
    let envFile = './config/dev.json';
    switch (env.toLowerCase()) {
        case 'prod':
            envFile = './config/prod.json';
            break;
        case 'test':
            envFile = './config/test.json';
            break;
        case 'dev': //default is 'dev'
        default:
            envFile = './config/dev.json';
            break;
    }
    nconf.file({ file: envFile });
}