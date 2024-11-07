import "dotenv/config";

const env = process.env;

const app = {
    port: env.PORT ?? 6010,
    name: env.ENV_NAME ? `wlog:${env.ENV_NAME}` : "wlog",
    http: {
        session: {
            secret: env.SESSION_SECRET,
            unset: "destroy",
            resave: false,
            saveUninitialized: true,
            cookie: {
                httpOnly: true, // By design, our client won't rely on Javascript
                sameSite: true,
                secure: env.NODE_ENV == "production" // HTTPS only enabled for prod environment
            }
        }
    },
};

export default app;
