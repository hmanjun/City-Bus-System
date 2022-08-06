const router = require('express').Router()
const {Location} = require('../../models')

router.get('/', async (req,res) => {
    try {
        const locationData = await Location.findAll()
        if(locationData){
            res.status(200).json(locationData)
        }
    } catch (err) {
        res.status(400).json(err)
    }
})

router.post('/', async (req,res) => {
    try {
        const locationData = await Location.create(req.body)

        res.status(200).json(locationData)
    } catch (err) {
        res.status(400).json(err)
    }
})



module.exports = router