const supabase = require('./db_init')

const getPreferences = async (user_id, category_id) => {
    const { data: preferences, error } = await supabase
        .from('preferences')
        .select("*")
        .eq('user_id', user_id)
        .eq('category_id', category_id)
    
    return(preferences)
}

const getAllPreferences = async (user_id) => {
    const { data: preferences, error } = await supabase
        .from('preferences')
        .select("*")
        .eq('user_id', user_id)
    
    return(preferences)
}

const updatePreference = async (user_id, category_id, method) => {
    const { data, error } = await supabase
        .from('preferences')
        .update({ 'notification_method': method })
        .eq('user_id', user_id)
        .eq('category_id', category_id)
        .select()
}

const createPreferences = async (preferences) => {
    const { data, error } = await supabase
        .from('preferences')
        .insert(preferences)
        .select()
}

const deletePreferences = async (user_id, categories) => {
    const { data, error } = await supabase
        .from('preferences')
        .delete()
        .eq('user_id', user_id)
        .in('category_id', categories)
}

module.exports = { getPreferences, updatePreference, createPreferences, deletePreferences, getAllPreferences }