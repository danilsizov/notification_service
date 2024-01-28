const sendByEmail = (user, category, content) => {
    console.log('Email sent to ' + user.email)
    console.log('Category: ' + category.name)
    console.log('Content: ' + content)
    return('Email sent to ' + user.email + '\n', 'Category: ' + category.name + '\n', 'Content: ' + content)
}

const sendByPhone = (user, category, content) => {
    console.log('SMS sent to ' + user.phone)
    console.log('Category: ' + category.name)
    console.log('Content: ' + content)
    return('SMS sent to ' + user.phone + '\n', 'Category: ' + category.name + '\n', 'Content: ' + content)
}

const sendByApp = (user, category, content) => {
    console.log('App notification sent to ' + user.id)
    console.log('Category: ' + category.name)
    console.log('Content: ' + content)
    return('App notification sent to ' + user.id + '\n', 'Category: ' + category.name + '\n', 'Content: ' + content)
}

const notificationSenders = {
    'Email': sendByEmail,
    'SMS': sendByPhone,
    'App': sendByApp
};


module.exports = { sendByEmail, sendByPhone, sendByApp, notificationSenders }