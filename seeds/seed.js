const sequelize = require('../config/connections');
const { Location, Stop, Route, RouteStop } = require('../models');

const locationData = require('./locationData.json');
const stopData = require('./stopData.json');
const routeData = require('./routeData.json');
const routestopData = require('./routestopData');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const locations = await Location.bulkCreate(locationData);

    const stops = await Stop.bulkCreate(stopData);

    const routes = await Route.bulkCreate(routeData);

    const routestops = await RouteStop.bulkCreate(routestopData);

    process.exit(0);

};

seedDatabase();