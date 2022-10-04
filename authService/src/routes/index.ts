import express from "express";
import AuthController from "../controllers/AuthController";
import InstututeController from "../controllers/InstituteController";
import { ILogin, IOtp } from "../models/Interfaces";
// import { IToken } from "../models/Tokens";
import { getServerError, getGuid } from "../utils/Functions";
// import async from "async";
// import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { IUser } from "../models/Users";
import { IInstitute } from "../models/institute.model";
import nconf from "nconf";
import { IToken } from "../models/Tokens";
// import { ObjectId } from "mongodb";

import { successResponse, errorResponse } from "../services/apiResponse"
const router = express.Router();

router.post("/authService/login", async (req, res) => {
    let guid = await getGuid(req.body);
    try {
        const body = req.body as Pick<ILogin, "email" | "password">
        const controller = new AuthController();
        const response = await controller.login(body.email, body.password);
        return res.send(response);
    } catch (error) {
        console.error("error in /login", error);
        const serverError: any = await getServerError(guid);
        serverError.message = error;
        return res.send(serverError);
    }
});

router.post("/authService/checktoken", async (req, res, next) => {
    let guid = await getGuid(req.body);

    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        const controller = new AuthController();
        if (token) {

            const response = await controller.isTokenValid(token);

            if (response == true) {
                return res.send(response);
            }
            else {
                res.send('token is invalid or expired, please check again & check userid too!')
            }

            next();
        }
        else {
            res.send('undefined or null token');

        }
    } catch (error) {

        console.error("invalid token!", error);
        const serverError: any = await getServerError(guid);
        console.log(serverError)
        return res.send(serverError);
    }
});


/ end token valid /
router.post('/authService/logout', async (req, res) => {


    let guid = await getGuid(req.body);
    try {
        const body = req.body as Pick<IToken, "userid" | "id">
        const controller = new AuthController();
        const response = await controller.isLogout(body.userid, body.id);
        if (response == true) {
            res.status(201).send({ message: "logout success", flag: 'updated as number' });
        }
        else {
            res.status(401).send({ message: "Please check token id & username!" });
        }


    } catch (error) {
        console.error("invalid token", error);
        const serverError: any = await getServerError(guid);
        return res.send(serverError);
    }

});

// start google auth logins
router.post("/authService/googlelogin", async (req, res) => {
    let guid = await getGuid(req.body);
    try {
        const body = req.body as Pick<ILogin, "googleId" | "email" | "imageUrl" | "name" | "country_code" | "whatsapp_contact">
        const controller = new AuthController();
        const response = await controller.googleLogin(body.googleId, body.email, body.imageUrl, body.name, body.country_code, body.whatsapp_contact);
        return res.send(response);
    } catch (error) {
        console.error("error in /login", error);
        const serverError: any = await getServerError(guid);
        serverError.message = error;
        return res.send(serverError);
    }
});
// end google auth login

router.post("/authService/sendotp", async (req, res) => {
    let guid = await getGuid(req.body);
    try {
        const body = req.body
        const controller = new AuthController();
        const response = await controller.sendotp(body);
        return res.send(response);
    } catch (error) {
        console.error("error in /sendotp", error);
        return res.send(error);
    }
});


router.post("/authService/sendotpforsignup", async (req, res) => {
    let guid = await getGuid(req.body);
    try {
        const body = req.body
        const controller = new AuthController();
        const response = await controller.sendotpforsignup(body);
        return res.send(response);
    } catch (error) {
        console.error("error in /sendotpforsignup", error);
        return res.send(error);
    }
});

router.post("/authService/sendotpforlogin", async (req, res) => {
    let guid = await getGuid(req.body);
    try {
        const body = req.body
        const controller = new AuthController();
        const response = await controller.sendotpforlogin(body);
        return res.send(response);
    } catch (error) {
        console.error("error in /sendotpforlogin", error);
        return res.send(error);
    }
});

router.post("/authService/sendContactVerifyOtp", async (req, res) => {
    let guid = await getGuid(req.body);
    try {
        const body = req.body
        const controller = new AuthController();
        const response = await controller.sendContactVerifyOtp(body);
        return res.send(response);
    } catch (error) {
        //console.error("error in /sendotp", error);
        return res.send(error);
    }
});
router.get("/authService/otp", async (req, res) => {
    try {
        const body = req.body;
        const controller = new AuthController();
        const response = await controller.getOtpInfo(body);
        return res.send(response);
    } catch (error) {
        console.error("error in /getotpinfo", error);
        return res.send(error);
    }
})

router.post("/authService/verifyotp", async (req, res) => {
    try {
        const body = req.body as IOtp;
        const controller = new AuthController();
        const response = await controller.verifyotp(body);
        return res.send(response);
    } catch (error) {
        console.error("error in /verifyotp", error);
        return res.send(error);
    }
})
router.post("/authService/verifyContactOtp", async (req, res) => {
    try {
        const body = req.body as any;
        const controller = new AuthController();
        const response = await controller.verifyContactOtp(body);
        return res.send(response);
    } catch (error) {
        console.error("error in /verifyotp", error);
        return res.send(error);
    }
})

router.post("/authService/managephone", async (req, res) => {
    try {
        const body = req.body as IOtp;
        const controller = new AuthController();
        const response = await controller.managephone(body);
        return res.send(response);
    } catch (error) {
        console.error("error in /managephone", error);
        return res.send(error);
    }
})

router.post("/authService/accountverification", async (req, res) => {
    try {
        const body = req.body;
        const controller = new AuthController();
        const response = await controller.accountVerification(body);
        return res.send(response);
    } catch (error: any) {
        console.error("error in /accountverification", error);
        return res.status(400).json({ error: error.toString() });
    }
})

router.post("/authService/resetpassword", async (req, res) => {
    try {
        const body = req.body;
        const controller = new AuthController();
        const response = await controller.resetpassword(body);
        return res.send(response);
    } catch (error) {
        console.error("error in /resetpassword", error);
        return res.send(error);
    }
})

router.post("/authService/whatsapp", async (req, res) => {
    try {
        const body = req.body;
        const controller = new AuthController();
        const response = await controller.addWhatsappNumber(body);
        return res.send(response);
    } catch (error) {
        console.error("error in /whatsapp", error);
        return res.send(error);
    }
})

router.post("/authService/otpsignup", async (req, res) => {
    let guid = await getGuid(req.body);
    try {
        const body = req.body as IUser;
        const controller = new AuthController();
        const response = await controller.otpsignup(body);
        return res.send(response);
    } catch (error: any) {
        console.error("error in /otpsignup", error);
        return res.status(400).json({ error: error.toString() });
    }
});


router.post("/authService/otplogin", async (req, res) => {
    let guid = await getGuid(req.body);
    try {
        const body = req.body
        const controller = new AuthController();
        const response = await controller.otplogin(body);
        return res.send(response);
    } catch (error) {
        console.error("error in /otplogin", error);
        const serverError: any = await getServerError(guid);
        serverError.message = error;
        return res.send(serverError);
    }
});



// for new token endpoints
router.post("/authService/newtoken", async (req, res, next) => {
    let guid = await getGuid(req.body);
    try {
        const token = req.headers.authorization;
        const controller = new AuthController();
        if (token) {
            const secret = nconf.get('secret');
            var userData: any = await jwt.verify(token, secret, { ignoreExpiration: true });
            var userId = { userid: userData.id, userexp: userData.exp };
            const response = await controller.newTokenAgain(userId.userid, userId.userexp);
            return res.send(response);
        }

    } catch (error) {
        console.error("error in /authService/newtoken", error);
        const serverError: any = await getServerError(guid);
        serverError.message = error;
        return res.send(serverError);
    }
});

// login for private domain

router.post("/authService/private_domain_login", async (req, res) => {
    let guid = await getGuid(req.body);
    try {
        const body = req.body as Pick<ILogin, "email" | "password" | "institute_domain">
        const controller = new AuthController();
        const response = await controller.privateDomainLogin(body.email, body.password, body.institute_domain);
        return res.send(response);
    } catch (error) {
        console.error("error in /private_domain_login", error);
        const serverError: any = await getServerError(guid);
        serverError.message = error;
        return res.send(serverError);
    }
});




router.post("/authService/private_domain_resetpassword", async (req, res) => {
    try {
        const body = req.body;
        const controller = new AuthController();
        const response = await controller.privateDomainResetPassword(body);
        return res.send(response);
    } catch (error) {
        console.error("error in /private_domain_resetpassword", error);
        return res.send(error);
    }
})
router.post("/authService/EmailCheckUnique", async (req, res) => {
    try {
        const body = req.body;
        const controller = new AuthController();
        const response = await controller.emailUniqueCheck(body);
        return res.send(response);
    } catch (error) {
        console.error("error in /EmailCheckUnique", error);
        return res.send(error);
    }
})
router.post("/authService/contact_password_login_private_domain", async (req, res) => {
    try {
        const body = req.body;
        const controller = new AuthController();
        const response = await controller.contact_password_login_private_domain(body);
        return res.send(response);
    } catch (error) {
        console.error("error in /contact_password_login_private_domain", error);
        return res.send(error);
    }
})
router.post("/authService/contact_password_login", async (req, res) => {
    try {
        const body = req.body;
        const controller = new AuthController();
        const response = await controller.contact_password_login(body);
        return res.send(response);
    } catch (error) {
        console.error("error in /contact_password_login", error);
        return res.send(error);
    }
})


router.post("/authService/signup_email_otp_send", async (req, res) => {
    try {
        const body = req.body;
        const controller = new AuthController();
        const response = await controller.signUpEmailSend(body);
        return res.send(response);
    } catch (error) {
        console.error("error in /signup_email_otp_send", error);
        return res.send(error);
    }
})
router.post("/authService/signup_email_otp_verification", async (req, res) => {
    try {
        const body = req.body;
        const controller = new AuthController();
        const response = await controller.verifyEmailSignUpOtp(body);
        return res.send(response);
    } catch (error) {
        console.error("error in /signup_email_otp_verification", error);
        return res.send(error);
    }
})


router.post("/Institute", async (req, res) => {
    try {
        const body = req.body as IInstitute;

        const controller = new InstututeController();
        const response: IInstitute = await controller.createInstutute(body);
        res.status(200).json(successResponse("create Institute", response, res.statusCode));
    } catch (error) {
        console.error("error in create Institute", error);
        res.status(500).json(errorResponse("error in create Institute", res.statusCode));
    }
});

router.patch("/Institute/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;

        const body = req.body as IInstitute;
        const controller = new InstututeController();
        const response: IInstitute = await controller.editInstutute(body, categoryId);
        res.status(200).json(successResponse("Institute update", response, res.statusCode));
    } catch (error) {
        console.error("error in Institute update", error);
        res.status(500).json(errorResponse("error in Institute update", res.statusCode));
    }
});

router.get("/InstituteList", async (req, res) => {
    try {
        const controller = new InstututeController();
        const categoryId = req.query.categoryId
        const userId = req.body.userId;
        const response: IInstitute[] = await controller.getInstutute(categoryId);
        res.status(200).json(successResponse("get Institute", response, res.statusCode));
    } catch (error) {
        console.error("error in get Institute", error);
        res.status(500).json(errorResponse("error in get Institute", res.statusCode));
    }
});

router.patch("/deleteInstutute/:id", async (req, res) => {
    try {
        const controller = new InstututeController();
        const InstututeId = req.params.id;
        const response = await controller.deleteInstutute(InstututeId);
        res.status(200).json(successResponse("get Institute", response, res.statusCode));
    } catch (error) {
        console.error("error in get Institute", error);
        res.status(500).json(errorResponse("error in get Institute", res.statusCode));
    }
});

router.get("/Institute/:id", async (req, res) => {
    try {
        const InstituteId: string = req.params.id;
        const userId = req.body.userId;
        const controller = new InstututeController();
        const response: IInstitute = await controller.getInstututeInfoById(InstituteId);
        res.status(200).json(successResponse("get Institute by Id ", response, res.statusCode));
    } catch (error) {
        console.error("error in get Institute by Id", error);
        res.status(500).json(errorResponse("error in get Institute by Id", res.statusCode));
    }
});
//end

export default router;