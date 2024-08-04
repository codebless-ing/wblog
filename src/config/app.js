import "dotenv/config";

const env = process.env;

const app = {
    port: env.PORT ?? 6010,
    name: env.ENV_NAME ? `wblog:${env.ENV_NAME}` : "wblog"
};

export default app;
