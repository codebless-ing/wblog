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

    // Receives object with id, title, body and tags
    // If id exists: returns object with data (_id, title, body and tags) and a feedback message
    // If id doesn't exist: returns object with data (false) and a feedback message
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
    },

    delete: async (id) => {
        const article = await new Article(id);

        if (!article._id) {
            return {
                data: false,
                message: 'Article not found!'
            }
        }

        article.delete()
        return {
            data: article,
            message: 'Article deleted successfully'
        }
    }
}
