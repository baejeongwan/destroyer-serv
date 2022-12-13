let controller = new ScrollMagic.Controller();
let tween1 = TweenMax.to("#startText", 0.5, {
    fontSize: "50pt"
})

let scene = new ScrollMagic.Scene({
    triggerElement: "#trigger1",
    offset: 330
}).setTween(tween1).addTo(controller)//.addIndicators({name: "1"})

let tween2 = TweenMax.to("#section1", 0.5, {
    left: "0vw"
})

let scene2 = new ScrollMagic.Scene({
    triggerElement: "#section1",
    offset: 100
}).setTween(tween2).addTo(controller)//.addIndicators({name: "2"})

let tween3 = TweenMax.to("#section2", 0.5, {
    right: "0vw"
})

let scene3 = new ScrollMagic.Scene({
    triggerElement: "#section2",
    offset: 0
}).setTween(tween3).addTo(controller)//.addIndicators({name: "3"})

let tween4 = TweenMax.to("#section3", 0.5, {
    scale: 10
})

let scene4 = new ScrollMagic.Scene({
    triggerElement: "#section3",
    offset: 0
}).setTween(tween4).addTo(controller)//.addIndicators({name: "4"})

let tween5 = TweenMax.to("#section4", 0.5, {
    fontSize: "50pt"
})

let scene5 = new ScrollMagic.Scene({
    triggerElement: "#section4",
    offset: 100
}).setTween(tween5).addTo(controller)//.addIndicators({name: "5"})

let tween6 = TweenMax.to("#section5", 1, {
    opacity: 1
})

let scene6 = new ScrollMagic.Scene({
    triggerElement: "#section5",
    offset: 0
}).setTween(tween6).addTo(controller)//.addIndicators({name: "6"})