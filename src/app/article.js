import Article from '@models/article.model.js'

export default {
    create: async ({title, body, tags}) => {
        const article = await new Article();

        article.title = title
        article.body = body
        article.tags = tags

        // TODO: user_id and timezone must be implemented after authentication
        article.save()
    },

    read: async (id) => {
        const article = await new Article(id);

        if (!article._id) {
            return {
                data: false,
                message: 'Article not found!'
            }
        }

        return {
            data: article,
            message: 'Article found!'
        }
    },

    update: async (data) => {
        const article = await new Article(data.id);

        if (!article._id) {
            return {
                data: false,
                message: 'Article not found!'
            }
        }

        article.title = data.title
        article.body = data.body
        article.tags = data.tags

        article.save()
        return {
            data: article,
            message: 'Article updated successfully'
        }
    }
}
