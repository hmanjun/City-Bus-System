const router = require('express').Router()
const {Route, RouteStop, Stop} = require('../../models')
const withAuth = require('../../util/auth')

router.get('/:location', async (req,res) => {
    try{
        const routeData = await Route.findAll({
            where: {location_id: req.params.location},
            include: {model: Stop}
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

router.get('/:location/:id', async (req,res) => {
    try {
        const routeData = await Route.findByPk(req.params.id,
            {include: {model: Stop}})
        
        if(!routeData){
            res.status(400).json({message: `Could not found a route with that id`})
            return
        }
        res.status(200).json(routeData)
    } catch (err) {
        res.status(200).json(err)
    }
})

router.post('/:location', withAuth ,async (req,res) => {
    try{
        const {name, stops} = req.body
        
        const routeData = await Route.create({
            name,
            location_id: req.params.location
        })

        
        const routeStopsArr = stops.map((stop) => {
            return {
                route_id: routeData.id,
                stop_id: stop.stop_id,
                sequence: stop.sequence
            }
        })

        const routeStopData = await RouteStop.bulkCreate(routeStopsArr)
        res.status(200).json({routeData,routeStopData})
    } catch (err) {
        res.status(400).json(err)
    }
})

router.put('/:location/:id', withAuth ,async (req,res) => {
    try{
        const {name, stops} = req.body

        const routeData = await Route.update({name,location_id: req.params.location}, {
            where: {id: req.params.id}
        })

        await RouteStop.destroy({
            where: {route_id: req.params.id}
        })

        const routeStopsArr = stops.map((stop) => {
            return {
                route_id: req.params.id,
                stop_id: stop.stop_id,
                sequence: stop.sequence
            }
        })

        const routeStopData = await RouteStop.bulkCreate(routeStopsArr)

        res.status(200).json({routeData, routeStopData})

    } catch (err) {
        res.status(200).json(err)
    }
})

router.delete('/:location/:id', withAuth ,async (req,res) => {
    try{
        const routeData = await Route.destroy({
            where : {id: req.params.id}
        })

        if(!routeData){
            res.status(400).json({message: `Could not found route with that id`})
            return
        }

        res.status(200).json({message: `Route with id ${req.params.id} was deleted`})
    } catch (err) {
        res.status(400).json(err)
    }
})



module.exports = router