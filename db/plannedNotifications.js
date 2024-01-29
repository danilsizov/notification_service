const supabase = require('./db_init')

const getNotifications = async () => {
    const { data: planned_notifications, error } = await supabase
        .from('planned_notifications')
        .select('*')

    return planned_notifications
}

const createNotification = async (user_id, category_id, content, critical) => {
    const { data, error } = await supabase
        .from('planned_notifications')
        .insert([
            { 
                user_id: user_id, 
                category_id: category_id, 
                content: content, 
                critical: critical 
            },
        ])
        .select()
}

const clearTable = async () => {
    const { error } = await supabase
        .from('planned_notifications')
        .delete()
        .gte('id', '1')
}

module.exports = { getNotifications, createNotification, clearTable }