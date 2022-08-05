const router = require('express').Router()
const {Location} = require('../../models')

router.post('/location', async (req,res) => {
    try {
        const locationData = await Location.create(req.body)

        res.status(200).json(locationData)
    } catch (err) {
        res.status(400).json(err)
    }
})


module.exports = router