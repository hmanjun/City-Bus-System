const { Location } = require('../models')

const locationdata = [
    {
        name: '1',
        stop: 'Stop 1',
        route: 'Route 1',
    },
    {
        name: '2',
        stop: 'Stop 2',
        route: 'Route 2',
    },
    {
        name: '3',
        stop: 'Stop 3',
        route: 'Route 3',
    },
    {
        name: '4',
        stop: 'Stop 4',
        route: 'Route 4',
    },
    {
        name: '5',
        stop: 'Stop 5',
        route: 'Route 5',
    },
    {
        name: '6',
        stop: 'Stop 6',
        route: 'Route 6',
    },
    {
        name: '7',
        stop: 'Stop 7',
        route: 'Route 7',
    },
    {
        name: '8',
        stop: 'Stop 8',
        route: 'Route 8',
    },
    {
        name: '9',
        stop: 'Stop 9',
        route: 'Route 9',
    },
];

const seedlocation = () => Location.bulkCreate(locationdata);

module.exports = seedlocation;