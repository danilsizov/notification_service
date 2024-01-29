const senderManager = require('../notificationSender/index')
const externalDB = require('../externalDB/index')
const categoriesDB = require('../../db/categories')
const preferencesController = require('../preferencesController/index')

const sendNotification = async (user_id, category_id, content, critical, preference) => {
    try{
        const user = await externalDB.getUserById(user_id)
        const category = await categoriesDB.getCategoryById(category_id)

        //Change content to show that it's critical notification
        if(critical){
            content = content + " IT'S CRITICAL NOTIFICATION!!!"
        }
      
        const sendNotification = senderManager.notificationSenders[preference.notification_method];
            
        const result = sendNotification(user, category, content, critical);

        return result;
    } catch (error){
        return('Unable to send notification')
    }
}

module.exports = sendNotification