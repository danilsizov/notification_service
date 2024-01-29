const senderManager = require('../notificationSender/index')
const externalDB = require('../externalDB/index')
const categoriesDB = require('../../db/categories')
const preferencesController = require('../preferencesController/index')

const sendNotification = async (user_id, category_id, content, critical) => {
    try{
        const user = await externalDB.getUserById(user_id)
        const category = await categoriesDB.getCategoryById(category_id)

        //Change content to show that it's critical notification
        if(critical){
            content = content + " IT'S CRITICAL NOTIFICATION!!!"
        }

        //Identifing all methods for this category and user
        const methods = await preferencesController.getPreferencedMethods(user_id, category_id, critical)

        const notifications = methods.map(method => {
            const sendNotification = senderManager.notificationSenders[method];
            if (sendNotification) {
                return sendNotification(user, category, content, critical);
            }
        })

        const results = await Promise.all(notifications);

        return results.filter(result => result !== null).join('\n');
    } catch (error){
        return('Unable to send notification')
    }
}

module.exports = sendNotification