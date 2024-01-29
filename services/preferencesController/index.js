const preferencesDB = require('../../db/preferences')
const constants = require('../../constants/index')

const getPreferencedMethods = async (user_id, category_id, critical) => {
    let methods = [constants.method];

    const userPreferences = getUserPreferences(user_id, category_id, critical)

    if (userPreferences && userPreferences.length > 0) {
        methods = userPreferences.map(preference => preference.notification_method);
    }

    return methods;
}

const getPreferencedFrequency = async (user_id, category_id, critical) => {
    let frequency = [constants.frequency];

    const userPreferences = getUserPreferences(user_id, category_id, critical)

    if (userPreferences && userPreferences.length > 0) {
        frequency = userPreferences.map(preference => preference.frequency);
    }

    return frequency
}

const getUserPreferences = async (user_id, category_id, critical) => {
    const queryCategoryId = critical ? 1 : category_id;
    let userPreferences = await preferencesDB.getPreferences(user_id, queryCategoryId);

    if (critical && (!userPreferences || userPreferences.length === 0)) {
        userPreferences = await preferencesDB.getPreferences(user_id, category_id);
    }

    if(!userPreferences || userPreferences.length === 0){
        userPreferences = [{
            user_id: user_id,
            category_id: category_id,
            frequency: constants.frequency,
            notification_method: constants.method
        }]
    }

    return userPreferences
}

//Just return raw objects
const getAllUserPreferences = async (user_id) => {
    const preferences = await preferencesDB.getAllPreferences(user_id)

    return preferences
}

const setPreferences = async (user_id, preferences) => {
    //Uniqueness of categories array
    const categories = [...new Set(preferences.map(p => p.category_id))];

    const preferencesToCreate = preferences.map(preference => ({
        user_id: user_id,
        category_id: preference.category_id,
        notification_method: preference.notification_method,
        frequency: preference.frequency
    }));

    await preferencesDB.deletePreferences(user_id, categories)

    await preferencesDB.createPreferences(preferencesToCreate)
}

module.exports = { getPreferencedMethods, getPreferencedFrequency, getUserPreferences, setPreferences, getAllUserPreferences }