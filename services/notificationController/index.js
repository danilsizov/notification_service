const senderManager = require('../notificationSender/index')
const externalDB = require('../externalDB/index')
const categoriesDB = require('../../db/categories')
const preferencesController = require('../preferencesController/index')

const createNotification = async (user_id, category_id, content, critical) => {
    const user = await externalDB.getUserById(user_id)
    const category = await categoriesDB.getCategoryById(category_id)

    if(critical){
        content = content + " IT'S CRITICAL NOTIFICATION!!!"
    }

    const methods = await preferencesController.getPreferences(user_id, category_id, critical)

    methods.map(method => {
        const sendNotification = senderManager.notificationSenders[method];
        if (sendNotification) {
            return sendNotification(user, category, content, critical);
        }
    })
}

module.exports = { createNotification }