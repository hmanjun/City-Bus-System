const router = require('express').Router()
const {Location} = require('../../models')
const withAuth = require('../../util/auth')

//Get all locations
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

//Post a new location
router.post('/', withAuth, async (req,res) => {
    try {
        const locationData = await Location.create(req.body)

        res.status(200).json(locationData)
    } catch (err) {
        res.status(400).json(err)
    }
})



module.exports = router