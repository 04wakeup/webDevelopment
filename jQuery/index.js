// $("h1").text("bybye")
 
// console.log($("img").attr("src"));
// $("a").attr("href", "https://www.naver.com");
// $("button ").html("<em>Hey</em>");

// $("button").click(function(){
//     $("h1").css("color", "purple");
// })
 
// $(document).keypress(function(event){
//     console.log(event.key);
//     $("h1").text(event.key);
// })

$("h1").on("mouseover", function(){
    $("h1").css("color","purple");
})

$("button").on("click", function(){
    $("h1").slideUp().slideDown().animate({opacity: 0.5});//animate({opacity: 0.5}); //slideToggle(); //slideUp(); fadeToggle(); // fadeOut(); // toggle(); // show() or hide();
})