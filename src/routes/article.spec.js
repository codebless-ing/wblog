const request = (await import("supertest")).default;
const express = (await import("express")).default;

const ModelMock = (await import("@models/model.mock.js")).default;
const ArticleRoute = (await import("@routes/article.js")).default;

const app = new express();

/*
 *  HTTP SERVER MOCK
 */
app.set('view engine', 'pug');
app.set('views', './src/resources/views');
app.engine('pug', (path, options, callback) => {
    const details = Object.assign({ path, }, options);
    callback(null, JSON.stringify(details));
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/article', ArticleRoute);

describe('Article Controller', () => {
    beforeEach(() => {
        ModelMock.clearModelObject()
    });

    // CREATE
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
            test('should return a page with 400', done => { // TODO: Need an http sv mock making 404 pages
                const res = request(app).post('/article')

                res.expect("Content-Type", /html/)
                .expect(400, done)
            })
        })

        describe.skip('when receiving invalid data', () => {
            test('should return a page with 400', done => { // TODO: Need an http sv mock making 404 pages
                const res = request(app).post('/article')
                .send({ title: "h" })

                res.expect("Content-Type", /html/)
                .expect(400, done)
            })
        })
    })

    // READ
    describe('when getting an article', () => {
        describe('receiving a valid id', () => {
            ModelMock.addDocToCollection("SuperCoolIdColonCapitalDee", {
                title: "Super interesting article (:",
                body: "Super-duper uber computer ruler o' Vancouver",
                tags: ["tag", "you're it!"],
            })

            test('should return a page with 200', done => {
                const res = request(app)
                .get('/article/SuperCoolIdColonCapitalDee')
                .send()

                res.expect("content-type", /html/)
                .expect(200, done)
            })
        })

        describe.skip('when receiving an invalid id', () => {
            test('should return a page with 404', done => { // TODO: Need an http sv mock making 404 pages
                const res = request(app)
                .get('/article/NotSoCoolId')
                .send()

                res.expect("Content-Type", /html/)
                .expect(404, done)
            })
        })
    })
})
