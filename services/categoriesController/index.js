const categoriesDB = require('../../db/categories')

const getCategories = async () => {
    const categories = await categoriesDB.getAllCategories()

    return categories
}

module.exports = getCategories;