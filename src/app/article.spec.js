const ModelMock = (await import("@models/model.mock.js")).default;

const ArticleModel = (await import("@models/article.model.js")).default;
const ArticleService = (await import("./article.js")).default;

describe("Article Service", () => {
    beforeEach(() => {
        ArticleModel.mockClear();
        ModelMock.clearModelObject()
    });

    // CREATE
    describe("when creating a new article", () => {
        describe("with valid data", () => {
            const validData = {
                title: "Valid title",
                body: "Valid body",
                tags: ["Tag 1", 2],
                // TODO: properties below must be tested after authentication is implemented
                // user_id: "66a592332b7a5264ab6ebfed",
                // timezone: "-500"
            };

            test("should have an Article Model with said data", async () => {
                await ArticleService.create(validData);
                expect(ArticleModel).toHaveBeenCalledTimes(1); // Same as instantiating an object

                expect(ModelMock.object).toMatchObject(validData);
            });

            test("should request the data to be saved through db lib", async () => {
                await ArticleService.create(validData);
                expect(ModelMock.object.save).toHaveBeenCalledTimes(1);
            });
        });

        // TODO: test scenario with invalid data (when data validation is implemented)
    });

    // READ
    describe("when reading an article", () => {
        describe("the article exists", () => {
            const result = ArticleService.read("123");

            test("should return the article", () => {
                expect(result).resolves.toMatchObject({
                    message: "Article found!",
                    data: ModelMock.collection[123],
                });
            });
        });
    });
});
