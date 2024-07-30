const collectionStub = {
    '123': {
        _id: 123,
        title: 'title',
        body: 'body',
        tags: ['tag1', 'tag2']
    }
}
// Stub for instantiated model
const ModelObjStub = {
    save: jest.fn()
}

class mockModel {
    findById = jest.fn(async (id) => {
        const collection = collectionStub
        return collection[id]
    })
}

const ModelClassSpy = jest.fn(async (id) => {
    const tempMongooseModel = new mockModel()
    const tempMongooseDoc = await tempMongooseModel.findById(id)
    for(let k in tempMongooseDoc) {
        ModelObjStub[k] = tempMongooseDoc[k]
    }
    return ModelObjStub
}) // All models have an async constructor

/*
 *  IMPORTS
 *  See: https://jestjs.io/docs/ecmascript-modules#module-mocking-in-esm
 */
jest.unstable_mockModule('@models/article.model.js', () => ({
    default: ModelClassSpy
}));
const mongoose = (await import('mongoose')).default;
mongoose.model = jest.fn(() => mockModel);
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

            test.skip("should have an Article Model with said data", async () => {
                await ArticleService.create(validData)
                expect(ArticleModel).toHaveBeenCalledTimes(1) // Same as instantiating an object

                obj = await ArticleModel.mock.results[0].value
                expect(obj).toMatchObject(validData);
            })

            test.skip("should request the data to be saved through db lib", async () => {
                expect(obj.save).toHaveBeenCalledTimes(1)
            })
        })

        // TODO: test scenario with invalid data (when data validation is implemented)
    })
    describe('when reading an article', () => {
        describe('the article exists', () => {
            const result = ArticleService.read('123')
            test.skip('should return the article', () => {
                expect(result).resolves.toMatchObject({message: 'Article found!', data: collectionStub[123]})
            })
        })
    })
})
