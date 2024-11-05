import { jest } from '@jest/globals';
import * as crypto from "node:crypto";

global.jest = jest;

// Generate a new HTTP secret in case it's not defined in the .env file
Object.defineProperty(process.env, "SESSION_SECRET", {
    value: process.env.SESSION_SECRET || crypto.randomBytes(20).toString("hex"),
    writable: false,
    enumerable: true,
    configurable: true,
});
