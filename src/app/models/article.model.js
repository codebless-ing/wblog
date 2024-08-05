import BaseModel from "./model.js";
import { Schema } from 'mongoose'

class Article extends BaseModel {
    static SCHEMA = new Schema({
        title: {
            type: String,
            minLength: [3, "Title must have at least 3 characters"],
            maxLength: 250
        },
        body: {
            type: String,
            maxLength: 500000
        },
        tags: {
            type: [String],
            validate: [(value) => {
                for (let k in value) {
                    if (value[k].length < 2) {
                        return false
                    }
                }
                return value.length > 0 && value.length <= 10
            }, 'Needs at least 1 tag, max of 10 and must have at least 2 characters']
        },
        user_id: String,
        timezone: {
            type: String,
            min: 4,
            max: 5
        }
    })
}

export default Article;
