$(".city-btn").on("click", function () {
    const location_id = $(this).data("id")
    window.open(`/location/${location_id}`, "_self")
})