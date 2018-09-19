$(document).on("click", "#scraperButton", function(event){
    event.preventDefault();
    console.log("Clickable")
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function(data){
        console.log("got it")
    })
})