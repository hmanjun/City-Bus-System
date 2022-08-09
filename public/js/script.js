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

const bsort = (arr) => {
    let swapped = false;
    for(let i =0; i < arr.length-1; i++) {
       if(arr[i].sequence > arr[i+1].sequence){
           let swapElem = arr[i+1];
           arr[i+1] = arr[i]
           arr[i] = swapElem
           swapped = true
       }
    }
    if(swapped) return bsort(arr)
    else return arr
 }

const getLinks = async (location_id, nodes) => {
    const response = await $.ajax({
        url: `/api/route/${location_id}`,
        type: "GET"
    })
    const links = []
    for(let i = 0; i < response.length; i++){
        const stops = []
        response[i].stops.forEach((stop) => {
            stops.push({stop_id: stop.id, sequence: stop.routestop.sequence})
        })
        const sorted = bsort(stops)
        for(let j = 1; j < sorted.length; j++){
            const posS = nodePositions[sorted[j-1].stop_id]
            const posT = nodePositions[sorted[j].stop_id]
            links.push({source: nodes[posS], target: nodes[posT]})
        }
    }
    return links
}

const urlSplit = window.location.href.split('/location')
const createMap = async () => {
    const location_id = urlSplit[1]
    const nodes = await getNodes(location_id)
    const links = await getLinks(location_id, nodes)
    
    const w = 300, h = 300

    const circleWidth = 5

    const colors = {
        red: "#C61C6F",
        gray: "#FCF4DC"
    }

    const container = d3.select("#graph2").append("svg").attr("width",w).attr("height",h)

    const force = d3.layout.force().nodes(nodes).links([]).gravity(0.1).charge(-200).size([w,h])

    const link = container.selectAll(".linkLine").data(links).enter().append("line").attr("class", "linkLine").attr("stroke", "#CCC").attr("fill", "none")

    link.insert("text").text((d) => d.name).attr("x",circleWidth+5).attr("y",circleWidth).attr("color", colors.gray).attr("font-size", "10px").attr("text-anchor", "end")

    const node = container.selectAll("circle.node").data(nodes).enter().append("g").attr("class", "node")

    node.append("svg:circle").attr("cx", (d) => d.x).attr("cy", (d) => d.y).attr("r", circleWidth).attr("fill",colors.red)

    node.append("text").text((d) => d.name).attr("x",circleWidth+5).attr("y",circleWidth).attr("fill", colors.gray).attr("font-size", "1em").attr("text-anchor", "beginning")

    force.on("tick", () => {
        node.attr("transform", (d) => {
            return `translate(${d.x},${d.y})`
        })

        link.attr("x1", (d) => d.source.x).attr("y1", (d) => d.source.y).attr("x2", (d) => d.target.x).attr("y2", (d) => d.target.y)
    })

    force.start()
}

//Create location map

if(urlSplit.length == 2){
    createMap()
}