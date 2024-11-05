const request = (await import("supertest")).default;

const app = (await import("../app.mock.js")).default;
import "express-async-errors";
import { HttpException } from "@common/exceptions/appExceptions.js";

beforeAll(() => {
    /*
     * Hacky way of injecting routes that precede the notFoundHandler middleware. 😢
     * This is necessary due to the fact the app mock inherits all the setup from the actual app,
     * including the routes, middlewares and how they are ordered. Any route we add for testing will
     * naturally come after the notFoundHandler middleware in the router stack and thus never be accessible.
     */
    // Push the new routes for testing
    app.get("/instaDeath", async () => {
        throw new HttpException(500, "Very very mean error )':>");
    });

    app.get("/mysteriousDeath", async () => {
        throw new HttpException(418, "The most important HTTP error code");
    });

    // Obtain the index of the sub app (routes/index.js) in the stack
    const routerIndex = app._router.stack.findIndex((layer) => layer.name == "mounted_app");

    // Pop the new routes from the end of the stack and insert them right after the routerIndex
    app._router.stack.splice(routerIndex + 1, 0, app._router.stack.pop());
    app._router.stack.splice(routerIndex + 1, 0, app._router.stack.pop());
});

describe("General HTTP behaviour", () => {
    describe("when requesting a non existent route", () => {
        test("should return a page with 404", (done) => {
            const res = request(app).get("/thisroutecantexist").send();

            res.expect("content-type", /html/).expect(404, done);
        });
    });

    describe("when the request leads to a specified internal error", () => {
        test("should return a page with 500", (done) => {
            const res = request(app).get("/instaDeath").send();

            res.expect("content-type", /html/).expect(500, done);
        });
    });

    describe("when the request leads to an unspecified internal error", () => {
        test("should return a page with 500", (done) => {
            const res = request(app).get("/mysteriousDeath").send();

            res.expect("content-type", /html/).expect(500, done);
        });
    });
});
