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

//TODO: Location has many Users

//TODO: Location has many Routes

//TODO: Location has many Stops

//TODO: Route belongs to one Location

//TODO: Stop belongs to one Location

module.exports = {
    User, Location, Route, Stop, RouteStop
}