const router = require('express').Router()
const {Stop, RouteStop, Route} = require('../../models')
const withAuth = require('../../util/auth')

//Get all stops for a single location
router.get('/:location/', async (req,res) => {
    try {
        const stopData = await Stop.findAll({
            where: {location_id: req.params.location}
        })

        if(!stopData){
            res.status(404).json({message: `Could not find any stops for that location`})
            return
        }

        res.status(200).json(stopData)

    } catch (err) {
        res.status(400).json(err)
    } 
})

//Get information for a single stop
router.get('/:location/:id', async (req,res) => {
    try{
        const stopData = await Stop.findOne({
            where: {location_id: req.params.location, id: req.params.id},
            include: {model: Route}
        })

        if(!stopData){
            res.status(400).json({message: `Could not find any stops with that id`})
            return
        }

        res.status(200).json(stopData)
    } catch (err) {
        res.status(400).json(err)
    }
})

//Add a stop
router.post('/:location', withAuth ,async (req,res) => {
    try{
        const stopData = await Stop.create({
            ...req.body,
            location_id: req.params.location
        })

        res.status(200).json(stopData)
    } catch (err) {
        res.status(400).json(err)
    }
})

//Delete a stop
router.delete('/:location/:id', withAuth ,async (req,res) => {
    try {
        const stopData = await Stop.destroy({
            where: {id: req.params.id}
        })

        if(!stopData){
            res.status(400).json({message: `No stop found with that id`})
            return
        }

        res.status(200).json({message: `Deleted stop with id ${req.params.id}`})
    } catch (err) {
        res.status(400).json(err)
    }
})


module.exports = router