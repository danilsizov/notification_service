const express = require('express');
const router = express.Router();
const notificationController = require('../services/notificationController')
const preferencesController = require('../services/preferencesController')
const strToBool = require('../helpers/strToBool')


/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('Im alive');
});

router.post('/create-notification', async (req, res, next) => {
  const critical = strToBool(req.body.critical)
  await notificationController.createNotification(
    req.body.user_id, 
    req.body.category_id, 
    req.body.content, 
    critical)
  res.send('Notification created');
});

router.get('/get-preferences', function(req, res, next) {
  res.send('preferences');
});

router.post('/set-preferences', async (req, res, next) => {
  await preferencesController.setPreferences(req.body.user_id, req.body.preferences)
  res.send('preferences set');
});

module.exports = router;
