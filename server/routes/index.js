const express = require('express')
const {loginFb} = require('../controllers/loginFb')
const {loginCbFb} = require('../controllers/loginCbFb')
const {getParticipants} = require('../controllers/getParticipants')
const router = express.Router()

router.get(
    '/login-facebook',
    loginFb
)

router.get(
    '/callback/facebook',
    loginCbFb
)

router.get(
    '/participants',
    getParticipants
)

module.exports = router
