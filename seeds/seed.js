const sequelize = require('../config/connection');
// const { User, Project } = require('../models');
const seedLocation = require('./locationData');
const seedStop = require('./stopData');

const seedAll = async () => {
    await sequilize.sync({ force: true });

    // To Do:
    // const routes = await Route.bulkCreate()
    await seedLocation();
    
    await seedStop();

    process.exit(0);
};

seedAll();