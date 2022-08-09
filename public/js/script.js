var newRouteDataArr = []

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

//Open stop data page from click on location page
$(".stop-btn").on("click", function () {
    const stop_id = $(this).data("id")
    window.open(`/stop/${stop_id}`, "_self")
})

//Login check
$("#log-btn").on("click", async function () {
    const user_name = $("#log-username").val()
    const password = $("#log-password").val()
    console.log(user_name,password)

    if(user_name && password){
        const body = {
            user_name: user_name,
            password: password
        }

        $.post('api/user/login', body, (response) => {
            console.log(response)
            if(response.message == "You are now logged in!"){
                window.open('/', "_self")
            } else{
                alert("Failed to login")
            }
        })
    }
})

//Sign in
$('#sign-btn').on("click", async function () {
    const user_name = $("#sign-username").val()
    const password = $("#sign-password").val()
    const location = $("#inputGroupSelect01").val()
    console.log(user_name, password, location)

    if(user_name && password && location){
        const body = {
            user_name: user_name,
            password: password,
            location_id: location
        }

        $.post('api/user', body, (response) => {
            if(response.id){
                window.open('/',"_self")
            }
        })
    }
})

//Logout
$("#logout-btn").on("click", async function() {
    await $.post('api/user/logout',{}, () =>{
        window.open('/',"_self")
    })
})

//Add stop
$("#add-stop-btn").on("click", async function() {
    const name = $("#new-stop-name").val()
    const location = $("#new-stop-name").data("location")
    
    if(name){
        const body = {
            name: name
        }
        const stop_id = $("#new-stop-name").data("stop")
        if(stop_id){

            await $.ajax({
                url: `/api/stop/${location}/${stop_id}`,
                type: "PUT",
                data: body,
                success: function(response){
                    window.open('/manage', "_self")
                }
            })
        } else {  

            await $.post(`/api/stop/${location}`, body, (response) => {
                if(response.name){
                    window.open('/manage', "_self")
                } else {
                    alert("An error occured when trying to add stop")
                }
            })
        }
    }
})

//Open add stop
$("#m-add-stop-btn").on("click", async function () {
    window.open('/edit/stop', "_self")
})

//Open add route
$("#m-add-route-btn").on("click", async function () {
    window.open('/edit/route', "_self")
})

//Add stop to new route
$(".add-stop-2-route").on("click", function () {
    const stop_id = $(this).data("id")
    const stop_name = $(this).data("name")
    console.log(stop_id, stop_name)
    newRouteDataArr.push(stop_id)

    const container = $("#add-spps")
    const seq1 = $("<h3>").text(`${newRouteDataArr.length}  ${stop_name}`).addClass("text-light")
    container.append(seq1)
})

//Add new route to db
$("#add-new-route-btn").on("click", async function () {
    const name = $("#new-route-name").val()
    const stops = []
    newRouteDataArr.forEach((elem, index) => {
        const obj = {
            sequence: index + 1,
            stop_id: elem
        }
        stops.push(obj)
    })

    const body = {
        name: name,
        stops: stops
    }

    const location = $("#new-route-name").data("location")
    console.log(location)

    const route_id = $("#new-route-name").data("route")
    if(route_id){

        await $.ajax({
            url: `/api/route/${location}/${route_id}`,
            type: "PUT",
            data: body,
            success: function(response){
                window.open('/manage', "_self")
            }
        })

    } else {

        await $.post(`/api/route/${location}`, body, (response) =>{
            if(response.routeData.id){
                window.open('/manage', "_self")
            } else {
                alert("An error occured when trying to add route")
            }
        })
    }
})

//Open add stop
$("#ed-stop-btn").on("click", async function () {
    const stop_id = $("#stop-2-edit").val()
    window.open(`/edit/stop/${stop_id}`, "_self")
})

//Open edit route
$("#ed-route-btn").on("click", async function () {
    const route_id = $("#route-2-edit").val()
    window.open(`/edit/route/${route_id}`, "_self")
})

const nodePositions = {}
//Get nodes
const getNodes = async (location_id) => {
    const response = await $.ajax({
        url: `/api/stop/${location_id}`,
        type: "GET"
    })
    const nodeArr = response.map((stop,index) => {
        nodePositions[stop.id] = index
        return {name: stop.name}
    })
    return nodeArr
}

//Create location map
const urlSplit = window.location.href.split('/location')
if(urlSplit.length == 2){
    const nodes = getNodes(urlSplit[1])
    console.log(nodePositions)
}