const ModelMock = (await import("@models/model.mock.js")).default;
const repository = new (await import("./article.repository.js")).default();

describe("Article repository", () => {
    describe("when filtering articles", () => {
        test("should call the model find method with the right arguments", async () => {
            const result = await repository.filter("vey", ["fi", "dum"]);

            expect(ModelMock.object.find).toHaveBeenCalledTimes(1);
            expect(ModelMock.object.find).toHaveBeenCalledWith({
                title: { $regex: "vey", $options: "i" },
                $or: [
                    {
                        tags: {
                            $regex: "fi",
                        },
                    },
                    {
                        tags: {
                            $regex: "dum",
                        },
                    },
                ],
            });
        });
    });
});
