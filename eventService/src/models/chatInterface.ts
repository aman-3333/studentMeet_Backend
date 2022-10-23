import {Document, model, Schema} from "mongoose";
import { ObjectId } from 'mongodb';

export interface ChatInter {
    chatName: string;
    isGroupChat: Boolean;
    users:any ;
    latestMessage?: string | ObjectId
    groupAdmin:ObjectId;
  }

//   export interface 

