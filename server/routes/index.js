const express = require('express')
const {loginFb} = require('../controllers/loginFb')
const {loginCbFb} = require('../controllers/ loginCbFb')
const router = express.Router()

router.get(
    '/login-facebook',
    loginFb
)

router.get(
    '/callback/facebook',
    loginCbFb
)

module.exports = router
