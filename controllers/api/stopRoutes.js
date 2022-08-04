const router = require('express').Router()
const {Stop} = require('../../models')

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

router.get('/:location/:id', async (req,res) => {
    try{
        const stopData = await Stop.findOne({
            where: {location_id: req.params.location, id: req.params.id}
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

module.exports = router