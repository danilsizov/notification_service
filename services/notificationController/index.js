const senderManager = require('../notificationSender/index')
const externalDB = require('../externalDB/index')
const categoriesDB = require('../../db/categories')
const preferencesController = require('../preferencesController/index')
const delayedNotificationController = require('../delayedNotificationController')

const createNotification = async (user_id, category_id, content, critical) => {
    const preferences = await preferencesController.getUserPreferences(user_id, category_id, critical)

    const notificationPromises = preferences.map(preference => {
        switch(preference.frequency) {
            case "Immediately":
                return sendNotification(user_id, category_id, content, critical);
            case "Daily":
                return delayedNotificationController.scheduleNotification(user_id, category_id, content, critical);
            default:
                console.log(`No action for: ${preference.frequency}`);
                return Promise.resolve();
        }
    });
    
    try {
        await Promise.all(notificationPromises);
    } catch (error) {
        console.error('Error processing notifications:', error);
    }
}

const sendNotification = async (user_id, category_id, content, critical) => {
    const user = await externalDB.getUserById(user_id)
    const category = await categoriesDB.getCategoryById(category_id)

    if(critical){
        content = content + " IT'S CRITICAL NOTIFICATION!!!"
    }

    const methods = await preferencesController.getPreferencedMethods(user_id, category_id, critical)

    methods.map(method => {
        const sendNotification = senderManager.notificationSenders[method];
        if (sendNotification) {
            return sendNotification(user, category, content, critical);
        }
    })
}

module.exports = { createNotification }