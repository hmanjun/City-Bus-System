//Open location data from home button click
$(".city-btn").on("click", function () {
    const location_id = $(this).data("id")
    window.open(`/location/${location_id}`, "_self")
})

//Open route data page from click on location page
$(".route-btn").on("click", function () {
    const route_id = $(this).data("id")
    window.open(`/route/${route_id}`, "_self")
})