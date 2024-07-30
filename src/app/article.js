import Article from '@models/article.model.js'

export default {
    create: async ({title, body, tags}) => {
        const article = await new Article();

        article.title = title
        article.body = body
        article.tags = tags

        // TODO: user_id and timezone must be implemented after authentication
        article.save()
    }
}
