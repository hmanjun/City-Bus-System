const sequelize = require('../config/connections');
const { Location } = require('../models');

const locationData = require('./locationData.json');
// const seedStop = require('./stopData');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const locations = await Location.bulkCreate(locationData);

    process.exit(0);

};

seedDatabase();