$(document).ready(function () {
  $(".single-item").slick({
    autoplay: true,
    dots: true,
    arrows: true,
  });
});
$(function () {
  var copyObj = $(".slick-dots").clone();
  $(".dotscustom").append(copyObj);
});
// $(function () {
//   var copyObj = $(".slick-dots").addClass("dotscustom").clone();
//   // $(".slick-dots").remove();
//   $(".sliderWrap").append(copyObj);
//   //slick의 dot를 옮겨서 body의 중앙으로 오게 만든다 요소들은 복사해서 추가시켜준다.
// });
$(".dropbtn").click(function () {
  if ($(".dropdown-content").css("display") == "none") {
    $(".dropdown-content").css("display", "block");
    $(".familySite img").attr(
      "src",
      "/assets/images/neungyule/bg_family_close.png"
    );
  } else {
    $(".dropdown-content").css("display", "none");
    $(".familySite img").attr(
      "src",
      "/assets/images/neungyule/bg_family.png"
    );
  }
});
$(".slideBtn").click(function () {
  if ($(".hideBar").css("display") == "none") {
    $(".neInfo").css({
      "background-image":
        "url(/assets/images/neungyule/bg_ticker3.png)",
    });
    $(".hideBar").slideDown("fast");
  } else {
    $(".neInfo").css({
      "background-image":
        "url(/assets/images/neungyule/bg_ticker3_on.png)",
    });
    $(".hideBar").slideUp("fast");
  }
});
