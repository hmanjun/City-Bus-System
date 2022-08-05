const router = require('express').Router()
const {Route, RouteStop, Stop} = require('../../models')

router.get('/:location', async (req,res) => {
    try{
        const routeData = await Route.findAll({
            where: {location_id: req.params.location}
        })

        if(!routeData){
            res.status(400).json({message: `Could not find any routes for that location`})
            return
        }

        res.status(200).json(routeData)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/:location', async (req,res) => {
    try{
        const {name, stops} = req.body
        const routeData = await Route.create({
            name,
            location_id: req.params.location
        })
        /*
        const routeStopData = stops.map((stop) => {
            const rsData = RouteStop.create()
        })
        */
        res.status(200).json(routeData)
    } catch (err) {
        res.status(400).json(err)
    }
})







module.exports = router