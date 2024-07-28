import "dotenv/config";

const env = process.env;

const app = {
    port: env.PORT ?? 6010,
    appName: env.ENV_NAME ? `blog:${env.ENV_NAME}` : "blog"
};

export default app;
