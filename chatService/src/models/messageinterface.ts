import {Document, model, Schema} from "mongoose";
import { ObjectId } from 'mongodb';

export interface ChatInter {

        sender: ObjectId;
        content: String;
        chat:ObjectId ;
      
      
  }
//   export interface 