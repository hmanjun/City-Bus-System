const { Stop } = require('../models');

const stopdata = [
    {
        name: 'Stop 1',
        route_id: 8,
        pickup_time: '8 AM',
        filename: 'insert bus stop img here',
        description: 'Buses run every other hour.'
    },
    {
        name: 'Stop 2',
        route_id: 1,
        pickup_time: '8:15 AM',
        filename: 'insert bus stop img here',
        description: 'Buses run every other hour.'
    },
    {
        name: 'Stop 3',
        route_id: 2,
        pickup_time: '8:30 AM',
        filename: 'insert bus stop img here',
        description: 'Buses run every other hour.'
    },
    {
        name: 'Stop 4',
        route_id: 3,
        pickup_time: '8:45 AM',
        filename: 'insert bus stop img here',
        description: 'Buses run every other hour.'
    },    {
        name: 'Stop 5',
        route_id: 4,
        pickup_time: '9 AM',
        filename: 'insert bus stop img here',
        description: 'Buses run every other hour.'
    },
    {
        name: 'Stop 6',
        route_id: 5,
        pickup_time: '9:15 AM',
        filename: 'insert bus stop img here',
        description: 'Buses run every other hour.'
    },    
    {
        name: 'Stop 7',
        route_id: 6,
        pickup_time: '9:30 AM',
        filename: 'insert bus stop img here',
        description: 'Buses run every other hour.'
    },
    {
        name: 'Stop 8',
        route_id: 7,
        pickup_time: '9:45 AM',
        filename: 'insert bus stop img here',
        description: 'Buses run every other hour.'
    },    {
        name: 'Stop 9',
        route_id: 8,
        pickup_time: '10:00 AM',
        filename: 'insert bus stop img here',
        description: 'Buses run every other hour.'
    },
];

const seedstop = () => Stop.bulkCreate(stopdata);

module.exports = seedstop;