const ModelMock = (await import("@models/model.mock.js")).default;

const ArticleModel = (await import("@models/article.model.js")).default;
const ArticleService = (await import("./article.js")).default;

afterEach(() => {
    ArticleModel.mockClear();
    ModelMock.clearModelObject().clearCollection();
});

describe("Article Service", () => {
    // CREATE
    describe("when creating a new article", () => {
        describe("with valid data", () => {
            let validData = {};

            beforeEach(() => {
                validData = {
                    title: "Valid title",
                    body: "Valid body",
                    tags: ["Tag 1", 2],
                    // TODO: properties below must be tested after authentication is implemented
                    // user_id: "66a592332b7a5264ab6ebfed",
                    // timezone: "-500"
                };
            });

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
            test("should return the article", () => {
                ModelMock.addDocToCollection(123, {
                    title: "title",
                    body: "body",
                    tags: ["tag1", "tag2"],
                });
                const result = ArticleService.read("123");

                expect(result).resolves.toMatchObject({
                    message: "Article found!",
                    data: ModelMock.collection[123],
                });
            });
        });
    });

    // UPDATE
    describe("when updating an article", () => {
        describe("with valid data", () => {
            const id = "66a941da61910f79bb7e22c7";
            let data = {};

            beforeEach(() => {
                data = {
                    title: "Big titley",
                    body: "Bodey",
                    tags: ["uiop", "jklç"],
                };
                ModelMock.addDocToCollection(id, { title: "a", body: "b" });
            });

            test("should have an Article Model with said data", async () => {
                // Make sure the doc is in the collection and that it's different from req
                const oldModel = await new ArticleModel(id);
                expect(oldModel).not.toMatchObject(data);

                await ArticleService.update({ id: id, ...data });
                expect(ArticleModel).toHaveBeenCalledTimes(2); // Same as instantiating an object

                expect(ModelMock.object).toMatchObject({ _id: id, ...data });
            });

            test("should request the new data to be saved through db lib", async () => {
                await ArticleService.create({ id: id, ...data });
                expect(ModelMock.object.save).toHaveBeenCalledTimes(1);
            });

            // Bonus step, since there's no garantee the db mock behaves like the actual db engine
            test("should update the data", async () => {
                // Make sure the doc is in the collection and that it's different from params
                expect(ModelMock.collection[id]).not.toMatchObject(data);

                await ArticleService.update({ id: id, ...data });

                expect(ModelMock.collection[id]).toMatchObject(data);
            });
        });
    });

    // DELETE
    describe("when deleting an article", () => {
        describe("with valid data", () => {
            const id = "66a941da61910f79bb7e22c7";

            beforeEach(() => {
                ModelMock.addDocToCollection(id, {});
            });

            test("should have an Article Model with said data", async () => {
                await ArticleService.delete(id);
                expect(ArticleModel).toHaveBeenCalledTimes(1);
            });

            test("should request the new data to be deleted through db lib", async () => {
                await ArticleService.delete(id);
                expect(ModelMock.object.delete).toHaveBeenCalledTimes(1);
            });

            test("should delete the data", async () => {
                await ArticleService.delete(id);
                expect(ModelMock.collection[id]).toBeUndefined();
            });
        });

        describe("when given id doesn't exist", () => {
            const id = "66a941da61910f79bb7e22c7";

            beforeEach(() => {
                ModelMock.addDocToCollection(id, {});
            });

            // TODO: Update this when Dtos are implemented
            test("should return false for the data", async () => {
                const result = await ArticleService.delete("0709");
                expect(result.data).toBe(false);
            });
        });
    });
});
