const plannedNotificationsDB = require('../../db/plannedNotifications')
const sendNotification = require('../notificationController/send')
const preferencesController = require('../preferencesController/index')
const cron = require('node-cron');

//Save notification to send it in the future
const scheduleNotification = async (user_id, category_id, content, critical) => {
    try{
        await plannedNotificationsDB.createNotification(user_id, category_id, content, critical)
        
        return('Notification scheduled')
    } catch (error){
        return('Unable to schedule the notification')
    }
}

const sendDelayedNotifications = async () => {
    try{
        //Get all saved notifications from DB
        const notifications = await plannedNotificationsDB.getNotifications()
        let results = []

        //Send each notification
        for (const notification of notifications) {
            try {
                const preferences = await preferencesController.getUserPreferences(
                    notification.user_id, 
                    notification.category_id, 
                    notification.critical
                );
                await sendNotification(
                    notification.user_id,
                    notification.category_id,
                    notification.content,
                    notification.critical,
                    preferences
                );
                results.push({ status: 'success', id: notification.id });
            } catch (error) {
                console.error(`Error sending notification ID ${notification.id}:`, error);
                results.push({ status: 'error', id: notification.id, error: error.message });
            }
        }

        // Log results or handle them as needed
        console.log('Notification sending results:', results);

        //Delete all saved notifications
        await plannedNotificationsDB.clearTable()

        return('All delayed notifications are sent')
    } catch (err){
        console.log('Error during sending delayed notifications: ', err)
    }
}

// Schedule the job to run every 30 seconds
cron.schedule('*/30 * * * * *', sendDelayedNotifications, {
    scheduled: true,
});

module.exports = { scheduleNotification, sendDelayedNotifications }