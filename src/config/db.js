import "dotenv/config";

const env = process.env;

const db = {
    uri: env.DB_URI,
    user: env.DB_USER,
    pass: env.DB_PASS,
    database: env.DB_DATABASE
};

export default db;
