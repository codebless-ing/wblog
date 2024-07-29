// Stub for instantiated model
const ModelObjStub = {
    save: jest.fn()
}

const ModelClassSpy = jest.fn(async () => ModelObjStub) // All models have an async constructor

/*
 *  IMPORTS
 *  See: https://jestjs.io/docs/ecmascript-modules#module-mocking-in-esm
 */
jest.unstable_mockModule('@models/article.model.js', () => ({
    default: ModelClassSpy
}));
const ArticleModel = (await import("@models/article.model.js")).default;
const ArticleService = (await import("./article.js")).default;

describe('Article Service', () => {
    // CREATE
    describe('when creating a new article', () => {
        describe('with valid data', () => {
            const validData = {
                title: "Valid title",
                body: "Valid body",
                tags: ["Tag 1", 2],
                // TODO: properties below must be tested after authentication is implemented
                // user_id: "66a592332b7a5264ab6ebfed",
                // timezone: "-500"
            }

            let obj // Model object

            test("should have an Article Model with said data", async () => {
                await ArticleService.create(validData)
                expect(ArticleModel).toHaveBeenCalledTimes(1) // Same as instantiating an object

                obj = await ArticleModel.mock.results[0].value
                expect(obj).toMatchObject(validData);
            })

            test("should request the data to be saved through db lib", async () => {
                expect(obj.save).toHaveBeenCalledTimes(1)
            })
        })

        // TODO: test scenario with invalid data (when data validation is implemented)
    })
})
