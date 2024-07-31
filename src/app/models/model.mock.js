const ModelMock = {};

/*
 *  STUBS
 */
ModelMock.collection = {
    123: {
        _id: 123,
        title: "title",
        body: "body",
        tags: ["tag1", "tag2"],
    },
};

/*
 * MONGOOSE_MODEL CLASS
 */
ModelMock.GooseModel = class {
    findById = jest.fn(async (id) => {
        return ModelMock.collection[id];
    });
};

/*
 * MODEL OBJECT
 */
ModelMock.object = {};

/*
 * MODEL CLASS
 */
ModelMock.Class = jest.fn(async (id) => {
    // All models have an async constructor
    const _model = new ModelMock.GooseModel();
    const _doc = await _model.findById(id);

    for (let k in _doc) {
        ModelMock.object[k] = _doc[k];
    }

    return ModelMock.object;
});

/*
 * HELPERS
 */
ModelMock.clearModelObject = () => {
    ModelMock.object = {
        save: jest.fn(),
    };
};

ModelMock.clearModelObject();

/*
 *  IMPORTS
 *  See: https://jestjs.io/docs/ecmascript-modules#module-mocking-in-esm
 */
jest.unstable_mockModule("@models/model.js", () => ({
    default: ModelMock.Class,
}));

const mongoose = (await import("mongoose")).default;
mongoose.model = jest.fn(() => ModelMock.GooseModel);

export default ModelMock;
