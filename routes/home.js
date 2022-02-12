const express = require('express');
const router = express.Router();
const settings = require('./variables');

router.get('/', (req, res) => {
    if (settings.isValid === true) {
        res.render('home');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;