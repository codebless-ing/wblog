import { HttpException } from "@common/exceptions/appExceptions.js";
const ModelMock = (await import("@models/model.mock.js")).default;
const controller = new (await import("@controllers/article.controller.js")).default();

/*
 * RESPONSE STUB
 */
const res = {
    send: jest.fn(() => {}),
    status: jest.fn(() => {}),
    render: jest.fn(() => {}),
};

afterEach(() => {
    res.status.mockClear();
    res.render.mockClear();
    ModelMock.clearModelObject().clearCollection();
});

describe("Article controller", () => {
    // CREATE
    describe("when creating a new article", () => {
        describe("with valid data", () => {
            let req = {};

            beforeEach(() => {
                req = {
                    body: {
                        title: "Titley title",
                        body: "Post body",
                        tags: "asdf; qwert; zxcv",
                    },
                };
            });

            test.skip("should return a view", () => {});

            test("should respond with 200", async () => {
                await controller.create(req, res);
                expect(res.status).toBeCalledWith(200);
            });

            // TODO Create more tests when validation, view engine and contracts are implemented
        });

        describe("with invalid or NO data", () => {
            test.skip("should return a view", () => {});

            test("should throw a 404 HTTPException", () => {
                expect(controller.create({}, res)).rejects.toThrow(HttpException);
            });

            // TODO Create more tests when validation, view engine and contracts are implemented
        });
    });

    // READ
    describe("when reading an article", () => {
        describe("with valid data", () => {
            const req = {
                params: {
                    id: "66a941da61910f79bb7e22c7",
                },
            };

            test("should respond with 200", async () => {
                ModelMock.addDocToCollection("66a941da61910f79bb7e22c7", {});

                await controller.read(req, res);
                expect(res.status).toBeCalledWith(200);
            });
        });

        describe("with invalid data", () => {
            const req = {
                params: {
                    id: false,
                },
            };

            test("should throw a 404 HTTPException", () => {
                expect(controller.read(req, res)).rejects.toThrow(HttpException);
            });
        });
    });

    // UPDATE
    describe("when updating an article", () => {
        describe("with valid data", () => {
            let req = {};

            beforeEach(() => {
                req = {
                    params: {
                        id: "66a941da61910f79bb7e22c7",
                    },
                    body: {
                        title: "Big titley",
                        body: "Bodey",
                        tags: "uiop; jklç",
                    },
                };
                ModelMock.addDocToCollection(req.params.id, { title: "a", body: "b" });
            });

            test("should respond with 200", async () => {
                await controller.update(req, res);

                expect(res.status).not.toThrow();
                expect(res.status).toBeCalledWith(200);
            });
        });

        describe("with invalid data", () => {
            const req = {
                params: {
                    id: false,
                },
            };

            test("should throw a 404 HTTPException", () => {
                expect(controller.update(req, res)).rejects.toThrow(HttpException);
            });
        });
    });

    // DELETE
    describe("when deleting an article", () => {
        describe("with valid data", () => {
            let req = {};

            beforeEach(() => {
                req = {
                    params: {
                        id: "66a941da61910f79bb7e22c7",
                    }
                };
                ModelMock.addDocToCollection(req.params.id, {});
            });

            test("should respond with 200", async () => {
                await controller.delete(req, res);

                expect(res.status).not.toThrow();
                expect(res.status).toBeCalledWith(200);
            });
        });

        describe("with invalid data", () => {
            const req = {
                params: {
                    id: false,
                },
            };

            test("should throw a 404 HTTPException", () => {
                expect(controller.delete(req, res)).rejects.toThrow(HttpException);
            });
        });
    });
});
