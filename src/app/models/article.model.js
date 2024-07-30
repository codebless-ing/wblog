import BaseModel from "./model.js";
import { Schema } from 'mongoose'

class Article extends BaseModel {
    static SCHEMA = new Schema({
        title: String,
        body: String,
        tags: [String],
        user_id: String,
        timezone: String
    })
}

export default Article;
