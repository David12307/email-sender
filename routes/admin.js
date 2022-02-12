const express = require('express');
const settings = require('./variables');
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/user');

var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "fcb57efd8a697b",
      pass: "d571f719159607"
    }
  });

router.get('/', (req, res) => {
    if (settings.isValid === true && settings.currUser === 'david') {
        User.find({})
         .then(result => {
            var emails = [];
            for (i = 0; i < result.length; i++) {
                emails.push(result[i].email);
            }
            res.render('admin', {emails: emails});
         })
         .catch(err => console.log(err));
        
    } else {
        res.redirect('/');
    }
});

router.post('/', (req, res) => {
    var message = {
        from: "davidmarisca09@gmail.com",
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.content
    }

    transporter.sendMail(message, function (err, info) {
        if (err) throw err;
        console.log(info);
        res.send('Email sent to ' + req.body.email + '!');
    });
});

module.exports = router;