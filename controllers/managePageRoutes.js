const router = requre('express').router()
const {Stop, Route, Location} = require('../models')

router.get('/', async (req,res) => {
    try {
        const stopData = await Stop.findAll({
            where: { location_id: req.params.location_id }
        })
        const stops = await stopData.map((stop) => stop.get({ plain:true }));

        const routeData = await Route.findAll({
            where: { location_id: req.params.location_id }
        })
        const routes = await routeData.map((route) => route.get({ plain:true }))

        const locationData = await Location.findByPk(req.session.location_id)
        const location = locationData.get({ plain: true })

        res.render('managepage', {stops, routes, location, logged_in: req.session.logged_in})

    } catch (err) {
        res.status(500).json(err)
    }
})