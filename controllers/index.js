const router = require('express').Router()

const homeRoutes = require('./homeRoutes')
const loginRoutes = require('./loginRoutes')
const apiRoutes = require('./api')
const locationPageRoutes = require('./locationPageRoutes')


router.use('/', homeRoutes)
router.use('/login',loginRoutes)
router.use('/api',apiRoutes)
router.use('/location', locationPageRoutes)

module.exports = router;