// Stub for instantiated model
class ModelObjStub {
    save() {}
}

/*
 *  IMPORTS
 *  See: https://jestjs.io/docs/ecmascript-modules#module-mocking-in-esm
 */
jest.unstable_mockModule('@models/article.model.js', () => ({
    default: ModelObjStub
}));

const ArticleModel = (await import("@models/article.model.js")).default;
const request = (await import("supertest")).default;
const express = (await import("express")).default;
const ArticleRoute = (await import("@routes/article.js")).default;

const app = new express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/article', ArticleRoute);

describe('Article Controller', () => {
    describe('when creating an article', () => {
        describe('receiving appropriate data', () => {
            test('should return a page with 200', done => {
                const res = request(app)
                .post('/article')
                .type("form")
                .send({
                    title: "Titley title",
                    body: "Post body",
                    tags: "asdf; qwert; zxcv"
                })

                res.expect("content-type", /html/)
                .expect(200, done)
            })
        })

        describe.skip('when receiving no data', () => {
            test('should return a page with 400', done => { // No view engine yet
                const res = request(app).post('/article')

                res.expect("Content-Type", /html/)
                .expect(400, done)
            })
        })

        describe.skip('when receiving invalid data', () => {
            test('should return a page with 400', done => { // No view engine yet
                const res = request(app).post('/article')
                .send({ title: "h" })

                res.expect("Content-Type", /html/)
                .expect(400, done)
            })
        })
    })
})
