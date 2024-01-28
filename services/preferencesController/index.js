const preferencesDB = require('../../db/preferences')
const constants = require('../../constants/index')

const getPreferences = async (user_id, category_id, critical) => {
    let methods = [constants.method];

    const queryCategoryId = critical ? 1 : category_id;
    let userPreferences = await preferencesDB.getPreferences(user_id, queryCategoryId);

    if (critical && (!userPreferences || userPreferences.length === 0)) {
        userPreferences = await preferencesDB.getPreferences(user_id, category_id);
    }

    if (userPreferences && userPreferences.length > 0) {
        methods = userPreferences.map(preference => preference.notification_method);
    }

    return methods;
}

const setPreferences = async (user_id, preferences) => {
    const categories = [...new Set(preferences.map(p => p.category_id))];

    const preferencesToCreate = preferences.map(preference => ({
        user_id: user_id,
        category_id: preference.category_id,
        notification_method: preference.notification_method
    }));

    await preferencesDB.deletePreferences(user_id, categories)

    await preferencesDB.createPreferences(preferencesToCreate)
}

module.exports = { getPreferences, setPreferences }