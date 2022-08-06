const sequelize = require('../config/connections');
const { Location, Stop } = require('../models');

const locationData = require('./locationData.json');
const stopData = require('./stopData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const locations = await Location.bulkCreate(locationData);

    const stops = await Stop.bulkCreate(stopData);

    process.exit(0);

};

seedDatabase();