import BaseModel from "./model.js";
import { Schema } from "mongoose";

const UserProvider = new Schema({});
const UserSettings = new Schema({
    timezone: {
        type: String, // TZ Identifier
        enum: Intl.supportedValuesOf("timeZone"),
        default: "UTC",
    },
});

class User extends BaseModel {
    static SCHEMA = new Schema(
        {
            email: {
                type: String,
                minLength: 6,
                maxLength: 320,
                lowercase: true,
                required: [true, "E-mail is a required field"],
            },
            username: {
                type: String,
                minLength: 3,
                maxLength: 50,
                required: [true, "Username is a required field"],
                unique: true,
            },
            password: {
                type: String,
                max: 5,
            },
            providers: [UserProvider],
            settings: UserSettings,
        },
        { timestamps: true }
    );
}

export default User;
