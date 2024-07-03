// dropdownbar
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
  document.getElementById("plus").classList.toggle("minus");
}

// function filterFunction() {
//   var input, filter, ul, li, a, i;
//   input = document.getElementById("myInput");
//   filter = input.value.toUpperCase();
//   div = document.getElementById("myDropdown");
//   a = div.getElementsByTagName("a");
//   for (i = 0; i < a.length; i++) {
//     txtValue = a[i].textContent || a[i].innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       a[i].style.display = "";
//     } else {
//       a[i].style.display = "none";
//     }
//   }
// }
//

// desslideshow
$(function () {
  $("#desSlideshow2").desSlideshow({
    autoplay: "enable", //option:enable,disable
    slideshow_width: "1920", //slideshow window width
    slideshow_height: "450", //slideshow window height
    thumbnail_width: "180", //thumbnail width
    time_Interval: "4000", //Milliseconds
    directory: "images/", // flash-on.gif and flashtext-bg.jpg directory
  });
});

// $("#plus").click(function () {
//   $(this).toggleClass("minus");
// });

// slick
$(".main_img").slick({
  dots: true,
  infinite: true /* 맨끝이미지에서 끝나지 않고 다시 맨앞으로 이동 */,
  slidesToShow: 1 /* 화면에 보여질 이미지 갯수*/,
  slidesToScroll: 1 /* 스크롤시 이동할 이미지 갯수 */,
  autoplay: true /* 자동으로 다음이미지 보여주기 */,
  arrows: true /* 화살표 */,
  dots: true /* 아래점 */,
  autoplaySpeed: 3000 /* 다음이미지로 넘어갈 시간 */,
  variableWidth: true,
  speed: 0 /* 다음이미지로 넘겨질때 걸리는 시간 */,
  pauseOnHover: true /* 마우스 호버시 슬라이드 이동 멈춤 */,
});
$(".main_img_six").slick({
  dots: true,
  slidesPerRow: 3,
  rows: 2,
  infinite: true,
  slidesToScroll: 1,
  arrows: true,
  autoplay: false,
  autoplaySpeed: 500,
  speed: 0,
  pauseOnHover: true,
});
