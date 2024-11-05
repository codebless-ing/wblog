import "dotenv/config";

const env = process.env;

const app = {
    port: env.PORT ?? 6010,
    name: env.ENV_NAME ? `wlog:${env.ENV_NAME}` : "wlog",
    http: {
        cookie: {
            httpOnly: true, // By design, our client won't rely on Javascript
            sameSite: true,
            secure: env.NODE_ENV == "production" // HTTPS only enabled for prod environment
        },
        session: {
            secret: env.SESSION_SECRET
        }
    },
};

export default app;
