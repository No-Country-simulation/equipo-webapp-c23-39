const express = require('express');
const { savePreferences, getPreferences, updatePreference, deletePreference } = require('../controllers/preferenceController');
const router = express.Router();

router.post('/save', savePreferences);
router.get('/:userId', getPreferences);
router.put('/:preferenceId', updatePreference);
router.delete('/:preferenceId', deletePreference);

module.exports = router;