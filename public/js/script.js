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
        await $.post(`/api/stop/${location}`, body, (response) => {
            if(response.name){
                window.open('/manage', "_self")
            } else {
                alert("An error occured when trying to add stop")
            }
        })
    }
    
})
