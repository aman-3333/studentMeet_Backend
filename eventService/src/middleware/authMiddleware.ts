import express, { Request, Response } from 'express';

let baseUrl: any;
class authMiddleware {
  /* start middleware */
  public async authManagement(req: express.Request, res: express.Response, next: any) {
    baseUrl = req.headers.mailerurl;
    next();
  };

  /* end middleware*/

}

export { baseUrl };

export default new authMiddleware()