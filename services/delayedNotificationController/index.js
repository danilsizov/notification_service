const plannedNotificationsDB = require('../../db/plannedNotifications')
const sendNotification = require('../notificationController/send')
const cron = require('node-cron');

const scheduleNotification = async (user_id, category_id, content, critical) => {
    await plannedNotificationsDB.createNotification(user_id, category_id, content, critical)
    
    return('Notification scheduled')
}

const sendDelayedNotifications = async () => {
    const notifications = await plannedNotificationsDB.getNotifications()
    let results = []

    for (const notification of notifications) {
        try {
            await sendNotification(
                notification.user_id,
                notification.category_id,
                notification.content,
                notification.critical
            );
            results.push({ status: 'success', id: notification.id });
        } catch (error) {
            console.error(`Error sending notification ID ${notification.id}:`, error);
            results.push({ status: 'error', id: notification.id, error: error.message });
        }
    }

    // Log results or handle them as needed
    console.log('Notification sending results:', results);

    await plannedNotificationsDB.clearTable()

    return('All delayed notifications are sent')
}

// Schedule the job to run every minute
cron.schedule('*/5 * * * * *', sendDelayedNotifications, {
    scheduled: true,
});

module.exports = { scheduleNotification, sendDelayedNotifications }