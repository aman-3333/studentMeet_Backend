import { v4 as uuidv4 } from "uuid";
import { IError } from "../models/Interfaces";
import { FAILED, INTERNAL_SERVER_ERROR } from "./Constants";

export async function getServerError(guid: string): Promise<IError> {
    const message = INTERNAL_SERVER_ERROR.replace("{guid}", guid);
    const serverError: IError = { status: 500, statusText: FAILED, message: message };
    return serverError;
}

export async function getGuid(reqBody:any): Promise<string> {
    let guid  = reqBody? reqBody["guid"]: "";
    if (!guid) {
        guid = uuidv4();
    }
    return guid;
}