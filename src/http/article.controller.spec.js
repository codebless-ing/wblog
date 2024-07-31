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

describe("Article controller", () => {
    beforeEach(() => {
        res.status.mockClear()
        ModelMock.clearModelObject()
    });
    describe("when creating a new article", () => {
        describe("with valid data", () => {
            const req = {
                body: {
                    title: "Titley title",
                    body: "Post body",
                    tags: "asdf; qwert; zxcv",
                },
            };

            test.skip("should return a view", () => {});

            test("should respond with 200", async () => {
                await controller.create(req, res)
                expect(res.status).toBeCalledWith(200);
            });

            // TODO Create more tests when validation, view engine and contracts are implemented
        });

        describe("with invalid or NO data", () => {
            const req = {};

            const result = controller.create(req, res);

            test.skip("should return a view", () => {});

            test("should throw a 404 HTTPException", () => {
                expect(result).rejects.toThrow(HttpException);
            });

            // TODO Create more tests when validation, view engine and contracts are implemented
        });
    });

    describe("when reading an article", () => {
        describe("with valid data", () => {
            ModelMock.addDocToCollection("66a941da61910f79bb7e22c7", {})
            const req = {
                params: {
                    id: "66a941da61910f79bb7e22c7",
                },
            };

            test("should respond with 200", async () => {
                await controller.read(req, res)
                //expect(result).resolves.not.toThrow();
                expect(res.status).toBeCalledWith(200);
            });
        });

        describe("with invalid data", () => {
            res.render.mockClear();
            const req = {
                params: {
                    id: false,
                },
            };
            const result = controller.read(req, res);

            test("should throw a 404 HTTPException", () => {
                expect(result).rejects.toThrow(HttpException);
            });
        });
    });

    describe("when updating an article", () => {
        describe("with valid data", () => {
            const req = {
                params: {
                    id: "66a941da61910f79bb7e22c7"
                },
                body: {
                    title: "Big titley",
                    body: "Bodey",
                    tags: "uiop; jklç",
                }
            }

            test.skip("should update the data", async () => {
                await controller.update(req, res);
                expect(ModelMock.collection[req.params.id]).toEqual(expect.anything())
                expect(ModelMock.collection).toMatchObject(req.body)
            })
            
            test("should respond with 200", async () => {
                await controller.update(req, res);
                
                expect(res.status).toBeCalledWith(200);
            })
        })
        // TODO Create more validation when the issues are fixed
    })
});
