const express = require('express');
const router = express.Router();
const EmailController = require('../controllers/EmailController');

const emailController = new EmailController();

router.post('/send', emailController.sendEmail);
router.get('/inbox', emailController.getEmails);
router.get('/sent-emails', emailController.getSentEmails);
router.post('/search', emailController.searchSentEmails);
router.post('/:type/filter-by-date', emailController.filterEmailsByDate);

module.exports = router;
