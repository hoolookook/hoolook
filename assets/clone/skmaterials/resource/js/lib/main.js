// nav메뉴 hover & scroll Event
$(document).ready(function () {
  // bool값
  // var hovering = false;
  // var fixing = false;
  var hovering,
    fixing,
    raising,
    counting = false;

  function hoverFun(hovering) {
    if (hovering) {
      $("#header").css({
        "background-color": "white",
      });

      $(".logo img").attr(
        "src",
        "resource/images/icons/header-ci-black.png"
      );
      $(".navWrap .nav .login").css({
        "background-image":
          "url(resource/images/icons/nav-login-icon-black.png)",
      });
      $(".navWrap .nav a").css({
        color: "black",
      });
    } else {
      $("#header").removeClass("deepMenuOn").css({
        "background-color": "transparent",
      });
      $(".logo img").attr(
        "src",
        "resource/images/icons/header-ci-white.png"
      );
      $(".navWrap .nav .login").css({
        "background-image":
          "url(resource/images/icons/nav-login-icon-white.png)",
      });
      $(".navWrap .nav a").css({
        color: "white",
      });
    }
  }
  function fixedUp(fixing) {
    if (fixing) {
      $("#fixed").addClass("fixed");
      $("#upicon").css({ position: "fixed", display: "block" });
    } else {
      $("#fixed").removeClass("fixed");
      $("#upicon").css({ display: "none" });
    }
  }
  // ////////////////////////////////////////////////////////////////////////
  // media에 따른 bar 크기 관리
  function barRaise(raising, leftGrey, rightGrey, black, Allwidth) {
    // 높이 비교 해서 raising =true;일때
    if (raising) {
      var industGreyBar = $(".industry .left  .growBar");
      var valueGreyBar = $(".value .left  .growBar");
      var blackBar = $(".right .growBar");

      industGreyBar
        .addClass("industGreyBar")
        .css({ height: leftGrey })
        .css({ width: Allwidth });
      valueGreyBar
        .addClass("valueGreyBar")
        .css({ height: rightGrey })
        .css({ width: Allwidth });
      blackBar
        .addClass("blackBar")
        .css({ height: black })
        .css({ width: Allwidth });
    } else {
    }
  }

  $(function () {
    // 미디어쿼리 js 관리
    var m = matchMedia("screen and (max-width: 1500px)");
    var o = matchMedia("screen and (max-width: 1199px)");
    var p = matchMedia("screen and (max-width: 991px)");
    var q = matchMedia("screen and (max-width: 767px)");
    var r = matchMedia("screen and (max-width: 575px)");
    var s = matchMedia("screen and (max-width: 393px)");
    var t = matchMedia("screen and (max-width: 393px)");
    var u = matchMedia("screen and (max-width: 294px)");
    // if
    if (matchMedia(m.media).matches) {
      barRaise(true, "190", "120", "380", "60");
      $(".progressBar").css({ width: "60px" });
    }
    if (matchMedia(o.media).matches) {
      barRaise(true, "171", "108", "342", "54");
      $(".progressBar").css({ width: "54px" });
    }
    if (matchMedia(p.media).matches) {
      barRaise(true, "152", "96", "304", "48");
      $(".progressBar").css({ width: "48px" });
    }
    if (matchMedia(q.media).matches) {
      barRaise(true, "133", "84", "266", "42");
      $(".progressBar").css({ width: "42px" });
    }
    if (matchMedia(r.media).matches) {
      barRaise(true, "114", "72", "228", "36");
      $(".progressBar").css({ width: "36px" });
    }
    if (matchMedia(s.media).matches) {
      barRaise(true, "94", "52", "188", "30");
      $(".progressBar").css({ width: "36px" });
    }
    if (matchMedia(t.media).matches) {
      barRaise(true, "74", "32", "128", "24");
      $(".progressBar").css({ width: "36px" });
    }
    if (matchMedia(u.media).matches) {
      $(".progressBar").css({ width: "36px" });
    } else {
    }
  });

  // nav onOff
  $(function () {
    var $family = $(".family"),
      $familyClick = $(".family .click"),
      $life = $(".life"),
      $lifeClick = $(".life .click");
    var onOff = true;
    var scrollLock = false;
    $(".navOnOff").click(function () {
      // onOff가 true면 클릭시 block
      // --------------------------------------------------------------------------------------------

      if (onOff) {
        $(".MediaNavWrap").css({ display: "block" });
        $(this).addClass("exit");
        // 다른애들 끄기
        $(".playWrap")
          .css({ display: "none" })
          .css({ "background-color": "black" });
        // $(".videoSection").css({ display: "none" });
        // $(".slick-dots").css({ display: "none" });
        // $(".dropDownSection").css({ display: "none" });
        $("#header").addClass("headerFixed");
        $("body").css({ overflow: "hidden", height: "100%" });
        // 다른애들 끄기
        onOff = false;
        // =========================
        $family.click(function () {
          $lifeClick.css({ display: "none" });
          $familyClick.slideToggle();
        });
        $life.click(function () {
          $familyClick.css({ display: "none" });
          $lifeClick.slideToggle();
        });
        // =============================
      } else {
        $(".MediaNavWrap").css({ display: "none" });
        $(this).removeClass("exit");
        // 다른애들 끄기
        $(".playWrap").css({ display: "block" });
        // $(".slick-dots").css({ display: "block" });
        // $(".dropDownSection").css({ display: "block" });
        // $(".videoSection").css({ display: "block" });
        $("#header").removeClass("headerFixed");
        $("body").css({ overflow: "auto", height: "auto" });

        // 다른애들 끄기
        onOff = true;
      }
    });
  });
  // 마우스 스크롤 & 터치 막기
  // $(".MediaNavWrap").on("scroll touchmove mousewheel", function (event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   return false;
  // });
  // 마우스 스크롤 & 터치 막기

  // media에 따른 bar 크기 관리
  // ////////////////////////////////////////////////////////////////////////
  // 숫자 count
  function count(counting) {
    var one = ".one #percentage";
    var two = ".two #percentage";
    var three = ".three #percentage";
    var four = ".four #percentage";
    //
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    //
    function countNum(shot, target) {
      $({ val: 0 }).animate(
        { val: shot },
        {
          duration: 1500,
          step: function () {
            var num = numberWithCommas(Math.floor(this.val));
            $(target).text(num);
          },
          complete: function () {
            var num = numberWithCommas(Math.floor(this.val));
            $(target).text(num);
          },
        }
      );
    }
    if (counting) {
      countNum(38, one);
      countNum(39, two);
      countNum(14, three);
      countNum(34, four);
    } else {
      $(one).text(38);
      $(two).text(39);
      $(three).text(14);
      $(four).text(34);
    }
  }

  // ---------------mouse enter---------------------
  $(".headerWrap>ul li").mouseenter(function () {
    hoverFun(true);
  });
  $(".mtFam, .mtLife").mouseenter(function () {
    $(".deepMenuOn").css({
      height: "100px",
      transition: "height 0.35s ease",
      "border-top": "1px solid #d9d9d9",
    });
  });

  // ---------------mouse leave---------------------
  $("#header").mouseleave(function () {
    hoverFun(false);
  });
  $(".mtFam, .mtLife").mouseleave(function () {
    $(".deepMenuOn").css({
      height: "0px",
      transition: "height 0.35s ease",
      "border-top": 0,
    });
  });

  // ---------------scroll event---------------------

  $(window).on("scroll", function () {
    var fixedBar = $("#fixed");

    var scrollBool = $(this).scrollTop() > 0 ? true : false;

    // ==============================================================================================
    // 위치값
    var winTop = $(window).scrollTop();
    var section6 = document.querySelector(".section6");
    var section3 = document.querySelector(".section3");
    var circlePos = document.querySelector(".circle");

    // 거리계산
    var fixedDistance =
      section6.getBoundingClientRect().top + window.pageYOffset;
    var barDistance =
      section3.getBoundingClientRect().top + window.pageYOffset + 800;
    var countingDistance =
      circlePos.getBoundingClientRect().top + window.pageYOffset; //section6 top에 windowTop이 지나야 딱맞는 위치

    var countDistPlus = countingDistance + 200;
    // ==============================================================================================
    console.log("countingDistance: " + countingDistance);
    console.log("winTop: " + winTop);

    if (winTop > fixedDistance) {
      fixedUp(false);
    } else {
      fixedUp(true);
    }

    if (scrollBool > 0) {
      fixedBar.fadeIn(200);
      hoverFun(true);
    } else {
      fixedBar.hide();
      hoverFun(false);
    }
    if (winTop > barDistance) {
      barRaise(true);
    } else {
      barRaise(false);
    }
    if (winTop > countingDistance) {
      if (countDistPlus > winTop) {
        count(true);
      } else {
        count(false);
      }
    }
    function clickUpIcon() {
      $("#upicon").click(function () {
        $("html, body")
          .filter(":not(:animated)")
          .animate({ scrollTop: 0 }, 400);
        return false;
      });
    }

    clickUpIcon();
  });
});
// slick & video option
$(document).ready(function () {
  var play = $("#playPause .play");
  var pause = $("#playPause .pause");
  var $slider = $(".videoSection").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: "linear",
    prevArrow: false,
    nextArrow: false,
    autoplay: false,
    autoplaySpeed: 15000,
  });

  $(".play").on("click", function () {
    $(pause).css("opacity", "0.2");
    $(this).css("opacity", "1");
    $(".videoSection").slick("slickPlay");
    // $(this).css({ opacity: 1 });
  });
  $(".pause").on("click", function () {
    $(play).css("opacity", "0.2");
    $(this).css("opacity", "1");
    $(".videoSection").slick("slickPause");
    // $(this).css({ opacity: 1 });
  });
});
// 그 외
$(document).ready(function () {
  var chkClick = false;
  var progressBar = '<div class="progressBar"><div class="line"></div></div>';
  var a = $(".slick-dots li:nth-child(1)");
  var b = $(".slick-dots li:nth-child(2)");
  var c = $(".slick-dots li:nth-child(3)");

  // init
  $(".slick-dots li").append(progressBar);
  $(".slick-dots li:nth-child(1) .progressBar").css({ display: "block" });
  $(".slick-dots li:nth-child(2) .progressBar").css({ display: "none" });
  $(".slick-dots li:nth-child(3) .progressBar").css({ display: "none" });
  // if
  if (!chkClick) {
    clickEvt();
  } else {
    return false;
  }

  function clickEvt() {
    $(a).on("click", function () {
      $(".slick-dots li:nth-child(1) .progressBar").css({ display: "block" });
      $(".slick-dots li:nth-child(2) .progressBar").css({ display: "none" });
      $(".slick-dots li:nth-child(3) .progressBar").css({ display: "none" });
    });
    $(b).on("click", function () {
      $(".slick-dots li:nth-child(1) .progressBar").css({ display: "none" });
      $(".slick-dots li:nth-child(2) .progressBar").css({ display: "block" });
      $(".slick-dots li:nth-child(3) .progressBar").css({ display: "none" });
    });
    $(c).on("click", function () {
      $(".slick-dots li:nth-child(1) .progressBar").css({ display: "none" });
      $(".slick-dots li:nth-child(2) .progressBar").css({ display: "none" });
      $(".slick-dots li:nth-child(3) .progressBar").css({ display: "block" });
    });
  }
});
