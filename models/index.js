const User = require('./User')
const Location = require('./Location')
const Route = require('./Route')
const Stop = require('./Stop')
const RouteStop = require('./RouteStop')

//Route belongs to many Stops through RouteStop
Route.belongsToMany(Stop, {
    through: RouteStop
})

//Stop belongs to many Routes through RouteStop
Stop.belongsToMany(Route, {
    through: RouteStop
})

//TODO: User belongs to one Location
User.belongsTo(Location,{
    foreignKey: 'location_id'
})

//TODO: Location has many Users
Location.hasMany(User, {
    foreignKey: 'location_id',
    onDelete: 'CASCADE'
})

//TODO: Location has many Routes
Location.hasMany(Route, {
    foreignKey: 'location_id',
    onDelete: 'CASCADE'
})

//TODO: Location has many Stops
Location.hasMany(Stop, {
    foreignKey: 'location_id',
    onDelete: 'CASCADE'
})

//TODO: Route belongs to one Location
Route.belongsTo(Location, {
    foreignKey: 'location_id'
})

//TODO: Stop belongs to one Location
Stop.belongsTo(Location, {
    foreignKey: 'location_id'
})

module.exports = {
    User, Location, Route, Stop, RouteStop
}