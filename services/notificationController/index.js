const sendNotification = require('./send')
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

        const results = await Promise.all(notificationPromises);

        return results.filter(result => result !== null).join('\n');
    } catch (error) {
        console.error('Error processing notifications:', error);
    }
}

module.exports = { createNotification }