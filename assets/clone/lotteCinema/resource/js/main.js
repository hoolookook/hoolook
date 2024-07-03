$(document).ready(function () {
  var owl = $("#owl1");
  var two = $("#owl2");
  var play = $("#playPause .play");
  var pause = $("#playPause .pause");

  owl.owlCarousel({
    items: 1, // 한번에 보여줄 아이템 수
    loop: true, // 반복여부
    margin: 0, // 오른쪽 간격
    autoplay: true, // 자동재생 여부
    autoplayTimeout: 3000, // 재생간격
    autoplayHoverPause: true, //마우스오버시 멈출지 여부
    dotsContainer: "#carousel-custom-dots",
  });

  two.owlCarousel({
    items: 5, // 한번에 보여줄 아이템 수
    loop: true, // 반복여부
    margin: 1, // 오른쪽 간격
    autoplay: true, // 자동재생 여부
    autoplayTimeout: 4000, // 재생간격
    autoplayHoverPause: true, //마우스오버시 멈출지 여부
    // navRewind:
  });

  // $(play).on("click", function () {
  //   $(pause).removeClass("selected");
  //   $(this).addClass("selected").css("opacity", "1");
  //   owl.trigger("play.owl.autoplay", [3000]);
  // });
  // $(pause).on("click", function () {
  //   $(play).removeClass("selected").css("opacity", "0.2");
  //   $(this).addClass("selected");
  //   owl.trigger("stop.owl.autoplay");
  // });

  $(play).on("click", function () {
    $(pause).css("opacity", "0.2");
    $(this).css("opacity", "1");
    owl.trigger("play.owl.autoplay", [3000]);
  });
  $(pause).on("click", function () {
    $(play).css("opacity", "0.2");
    $(this).css("opacity", "1");
    owl.trigger("stop.owl.autoplay");
  });

  $(".customNextBtn").click(function () {
    owl.trigger("next.owl.carousel");
  });

  $(".customPrevBtn").click(function () {
    owl.trigger("prev.owl.carousel", [300]);
  });
  $(".box_customNextBtn").click(function () {
    two.trigger("next.owl.carousel");
  });

  $(".box_customPrevBtn").click(function () {
    two.trigger("prev.owl.carousel", [300]);
  });
});
$(".owl-dot").click(function () {
  owl.trigger("to.owl.carousel", [$(this).index(), 300]);
});

//upward text

var rollUl = $("#upward").find("ul");
var li = $("#upward").find("li");
var liHeight = li.outerHeight();
var _index = 0;
var i = 1;

setInterval(function () {
  TweenMax.to("rollUl", 3, {
    top: -liHeight,
    ease: Expo.easeInOut,
    onComplete: topReturn,
  });
}, 3500);

function topReturn() {
  var liFirst = $("#upward").find("li:first");
  var liLast = $("#upward").find("li:last");
  rollUl.css({
    top: 0,
  });
  liFirst.insertAfter(liLast);
}

$(function () {
  $(".booking").mouseenter(function () {
    $(".hoverWrap").css("display", "block");
    $(".one").css("display", "inline-block");
  });
  $(".hoverWrap").mouseleave(function () {
    $(".hoverMenu , .hoverWrap").css("display", "none");
    $(".one").css("display", "none");
  });
  $(".movie").mouseenter(function () {
    $(".hoverWrap").css("display", "block");
    $(".two").css("display", "inline-block");
  });
  $(".hoverWrap").mouseleave(function () {
    $(".hoverMenu , .hoverWrap").css("display", "none");
    $(".two").css("display", "none");
  });
  $(".theater").mouseenter(function () {
    $(".hoverWrap").css("display", "block");
    $(".three").css("display", "inline-block");
  });
  $(".hoverWrap").mouseleave(function () {
    $(".hoverMenu , .hoverWrap").css("display", "none");
    $(".three").css("display", "none");
  });
  $(".eventM").mouseenter(function () {
    $(".hoverWrap").css("display", "block");
    $(".four").css("display", "inline-block");
  });
  $(".hoverWrap").mouseleave(function () {
    $(".hoverMenu , .hoverWrap").css("display", "none");
    $(".four").css("display", "none");
  });
  $(".store").mouseenter(function () {
    $(".hoverWrap").css("display", "block");
    $(".five").css("display", "inline-block");
  });
  $(".hoverWrap").mouseleave(function () {
    $(".hoverMenu , .hoverWrap").css("display", "none");
    $(".five").css("display", "none");
  });
});
