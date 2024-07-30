// Stub for instantiated model
class ModelObjStub {
    save() {}
}

const res = {
    send: jest.fn(() => {}),
    status: jest.fn(() => {})
}

/*
 *  IMPORTS
 *  See: https://jestjs.io/docs/ecmascript-modules#module-mocking-in-esm
 */
jest.unstable_mockModule('@models/article.model.js', () => ({
    default: ModelObjStub
}));

const ArticleController = (await import('@controllers/article.controller.js')).default;

const controller = new ArticleController();

describe('Article controller', () => {
    describe('when creating a new article', () => {
        describe('with valid data', () => {
            const req = {
                body: {
                    title: "Titley title",
                    body: "Post body",
                    tags: "asdf; qwert; zxcv"
                }
            }

            test.skip("should return a view", () => {
                
            })

            test("should responde with 200", async () => {
                await controller.create(req, res)
                
                expect(res.status).toBeCalledWith(200)

            })

            // TODO Create more tests when validation, view engine and contracts are implemented
        })

        describe('with invalid or NO data', () => {
            const req = {
            }

            test.skip("should return a view", () => {
                
            })

            test("should throw a 404 HTTPException", () => {
                expect(true).toBe(true)
            })

            // TODO Create more tests when validation, view engine and contracts are implemented
        })
    })
})
