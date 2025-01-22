import BaseModel from "./model.js";
import { Schema } from "mongoose";

class Article extends BaseModel {
    static SCHEMA = new Schema(
        {
            title: {
                type: String,
                minLength: [3, "Title must have at least 3 characters"],
                maxLength: 250,
                required: [true, "Title is a required field"],
            },
            body: {
                type: String,
                maxLength: 500000,
                required: [true, "Body is a required field"],
            },
            tags: {
                type: [String],
                validate: [
                    (value) => {
                        for (let k in value) {
                            if (value[k].length < 2) {
                                return false;
                            }
                        }
                        return value.length <= 10;
                    },
                    "You can only have a max of 10 tags and each of them must have at least 2 characters",
                ],
            },
            user_id: { type: Schema.Types.ObjectId, ref: "User" },
            timezone: {
                type: String, // TZ Identifier
                enum: Intl.supportedValuesOf("timeZone"),
                default: "UTC",
            },
        },
        { timestamps: true }
    );
}

export default Article;
