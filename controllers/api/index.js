const router = require('express').Router()

const userRoutes = require('./userRoutes')
const stopRoutes = require('./stopRoutes')
const routeRoutes = require('./routesRoutes')
const locationRoutes = require('./locationRoutes')

router.use('/user', userRoutes)
router.use('/stop', stopRoutes)
router.use('/route', routeRoutes)
router.use('/location', locationRoutes)

module.exports = router