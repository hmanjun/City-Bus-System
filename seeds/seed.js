const sequelize = require('../config/connection');
const { Loction } = require('../models');

const locationData = require('./locationData.json');
// const seedStop = require('./stopData');

const seedDatabase = async () => {
    await sequilize.sync({ force: true });

    process.exit(0);
};

seedDatabase();