const router = require('express').Router()

const homeRoutes = require('./homeRoutes')
const loginRoutes = require('./loginRoutes')
const stopPageRoutes = require ('./stopPageRoutes')
const apiRoutes = require('./api')
const locationPageRoutes = require('./locationPageRoutes')


router.use('/', homeRoutes)
router.use('/login', loginRoutes)
router.use('./stopPageRoutes', stopPageRoutes)
router.use('/location', locationPageRoutes)
router.use('/api', apiRoutes)

module.exports = router;