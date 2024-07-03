// click & scroll event

//-------------------------------------------------------------------------------------------------

$(function () {
  // 변수
  var speed = 700;
  var circleBull = true;

  // click event
  function scrolling(obj) {
    if (!obj) {
      $("html,body").animate({ scrollTop: 0 }, speed);
    } else {
      var posTop = $(obj).offset().top;
      $("html,body").animate({ scrollTop: posTop }, speed);
    }
  }
  $("ul li a, .scrollDown a").click(function () {
    // 네비게이션 클릭시
    // console.log("click!");
    var direction = $(this).attr("href"); // direction = 클릭한 요소의 href 속성
    scrolling(direction); // direction 을 인자로 함수 실행
    return false; // 본래 이벤트 방지
  });

  const motherSections = document.querySelectorAll('section');

  
  motherSections.forEach((el)=>{
    const sectionWork = el.querySelector('#contents');
    const sectionExperience = el.querySelector('#experience');

    

    const pcBtn = document.querySelectorAll('.pc');
    const responsBtn = document.querySelectorAll('.responsive');

    


  })
  // const allBtn = document.querySelectorAll('.allBtn');
  // allBtn.forEach((allBtns)=>{
  //   allBtns.addEventListener('click',(e)=>{
  //     console.log(e.target.parentElement.parentElement);
  //     const targetPc = e.target.parentElement.parentElement.querySelectorAll('.pc');
  //     const targetResponsive = e.target.parentElement.parentElement.querySelectorAll('.responsive');
  //     targetPc.forEach((pcs)=>{
        
  //     })
  //     targetResponsive.forEach((pcs)=>{
        
  //     })
  //   })
  // })

  $("#contents .allBtn").click(function () {
    $("#contents .pc, .responsive").finish().fadeIn(1000);
  });
  $("#contents .pcBtn").click(function () {
    $("#contents .pc").finish().fadeIn(1000);
    $("#contents .responsive").fadeOut(1000);
  });
  $("#contents .responBtn").click(function () {
    $("#contents .responsive").finish().fadeIn(1000);
    $("#contents .pc").finish().fadeOut(1000);
  });

  $("#experience .allBtn").click(function () {
    $("#experience .pc, .app, .responsive").finish().fadeIn(1000);
  });
  $("#experience .pcBtn").click(function () {
    $("#experience .pc").finish().fadeIn(1000);
    $("#experience .app").fadeOut(1000);
    $("#experience .responsive").fadeOut(1000);
  });
  $("#experience .appBtn").click(function () {
    $("#experience .app").finish().fadeIn(1000);
    $("#experience .pc").finish().fadeOut(1000);
    $("#experience .responsive").fadeOut(1000);
  });
  $("#experience .responBtn").click(function () {
    $("#experience .responsive").finish().fadeIn(1000);
    $("#experience .pc").finish().fadeOut(1000);
    $("#experience .app").finish().fadeOut(1000);
  });

  const ham = document.querySelector('.ham');
  const bodyOver = document.querySelector('body');
  const clickThisItem = document.querySelectorAll('#clickThis');
  const mobileBtn = document.querySelector('.moBtn');
  const slidePop = document.querySelector('.mobileNav');
  mobileBtn.addEventListener('click', (e) => {
    if (mobileBtn.classList.contains('active')) {
      // active 클래스가 있을 때
      slidePop.classList.remove('active');
      mobileBtn.classList.remove('active');
      bodyOver.style.overflowY = "";
    } else {
      // active 클래스가 없을 때
      slidePop.classList.add('active');
      mobileBtn.classList.add('active');
      bodyOver.style.overflowY = "hidden";
    }
    clickThisItem.forEach((el)=>{
      el.addEventListener('click',()=>{
        slidePop.classList.remove('active');
        mobileBtn.classList.remove('active');
        bodyOver.style.overflowY = "";
      })
    })
  });
  

  // $(".moBtn").on("click", function () {
  //   $(".mobileNav").slideToggle("slow");
  //   $(".ham .line").toggleClass("active");

  //   const hamLine = document.querySelector('.ham .line');
  //   const bodyOver = document.querySelector('body');
  //   const clickThisItem = document.querySelectorAll('#clickThis');
  //   if(hamLine.classList.contains('active')){
  //     bodyOver.style.overflowY = "hidden";
  //   }
  //   else{
  //     bodyOver.style.overflow = "";
      
  //   }
  //   clickThisItem.forEach((el)=>{
  //     el.addEventListener('click',()=>{
  //       $(".ham .line").toggleClass("active");
  //       $(".mobileNav").slideToggle("slow");
  //     })
  //   })
    
  // });
  // scroll event
  $(window).scroll(function () {
    // 위치값
    var winTop = $(window).scrollTop();
    var $footer = document.querySelector("#footer");

    // 거리계산
    var footerDis =
      $footer.getBoundingClientRect().top + window.pageYOffset - 300;
    var $navbar = $(".navBar"),
      $navUI = $(".navBar .navUl");

    // console.log("현재 스크롤 값은 " + $(window).scrollTop());
    var s = window.matchMedia("screen and (max-width: 481px)");

    if (matchMedia(s.media).matches) {
    } else {
      if (winTop >= 50) {
        down($navbar, $navUI);
      } else {
        up($navbar, $navUI);
      }
    }

    function up(sel1, sel2) {
      sel1.stop().hide();
      sel2.stop().hide();
    }
    function down(sel1, sel2) {
      sel1.stop().show();
      sel2.stop().show();
    }
    if (winTop > footerDis) {
      if (circleBull) circleChart();
    } else {
      circleBull = true;
    }
  });
  function clickUpIcon() {
    $("#upicon").click(function () {
      $("html, body")
        .filter(":not(:animated)")
        .stop()
        .animate({ scrollTop: 0 }, 400);
      return false;
    });
  }

  function clickDwIcon() {
    $("#downicon").click(function () {
      $("html, body")
        .filter(":not(:animated)")
        .stop()
        .animate({ scrollTop: $(document).height() }, 400);
      return false;
    });
  }

  clickDwIcon();
  clickUpIcon();
  //-------------------------------------------------------------------------------------------------

  // circle chart
  function circleChart() {
    $(window).ready(function () {
      draw(80, ".html", "#0b593d");
      draw(80, ".css", "#0b593d");
      draw(90, ".sass", "#0b593d");
      draw(90, ".js", "#0b593d");
      draw(60, ".jquery", "#0b593d");
      draw(60, ".ps", "#0b593d");
    });

    function draw(max, classname, colorname) {
      var i = 1;
      var func1 = setInterval(function () {
        if (i < max) {
          color1(i, classname, colorname);
          i++;
        } else {
          clearInterval(func1);
        }
      }, 10);
      circleBull = false;
    }
    function color1(i, classname, colorname) {
      $(classname).css({
        background:
          "conic-gradient(" +
          colorname +
          " 0% " +
          i +
          "%, #1c1b18 " +
          i +
          "% 100%)",
      });
    }

    function replay() {
      draw(80, ".html", "#0b593d");
      draw(80, ".css", "#0b593d");
      draw(90, ".sass", "#0b593d");
      draw(90, ".js", "#0b593d");
      draw(70, ".jquery", "#0b593d");
      draw(60, ".ps", "#0b593d");
    }
  }
  //-------------------------------------------------------------------------------------------------
  // typing text 여러가지 문장
  $(function () {
    var typingText = document.querySelector(".typeText");
    var textToBeTypingArr = [
      "열정적입니다.",
      "호기심이 많습니다.",
      "새로운 것을 좋아합니다.",
    ];
    var index = 0;
    var textTobeTypingIndex = 0;
    var isAdding = true;

    function playAnim() {
      setTimeout(
        function () {
          typingText.innerText = textToBeTypingArr[textTobeTypingIndex].slice(
            0,
            index
          );
          if (isAdding) {
            if (index > textToBeTypingArr[textTobeTypingIndex].length) {
              isAdding = false;
              typingText.classList.add("showAnim");
              setTimeout(function () {
                typingText.classList.remove("showAnim");
                playAnim();
              }, 1000);
              return;
            } else {
              index++;
            }
          } else {
            // 삭제할때 textTobeTypingIndex가 +1됨
            if (index == 0) {
              isAdding = true;
              textTobeTypingIndex =
                (textTobeTypingIndex + 1) % textToBeTypingArr.length;
              // console.log(textTobeTypingIndex);
            } else {
              index--;
            }
          }
          playAnim();
        },
        isAdding ? 120 : 60
      );
    }
    playAnim();
  });
  // hover group
  // $(function () {
  //   $("a#clickThis")
  //     .mouseenter(function () {
  //       $(this).addClass("underline");
  //     })
  //     .mouseleave(function () {
  //       $(this).removeClass("underline");
  //     });
  // });
});

// work changeText
$(function () {
  // 복수의 h3 선택
  var h3List = document.querySelectorAll("#chanH3");
  // h3 태그 인덱스 확인
  var h3ListLength = h3List.length;

  function ChangeName(num, name) {
      h3List[num].innerHTML = name;
  }

  function updateNames() {
    if(window.innerWidth > 767){
      ChangeName(0, "lottecinema");
      ChangeName(1, "naver");
      ChangeName(2, "coupang");
      ChangeName(3, "neungyule");
      ChangeName(4, "skmaterials");
      ChangeName(5, "Samsung<br>PreOrder");
      ChangeName(6, "hdc<br>parkRoche");
      ChangeName(7, "hdc<br>oakvalley");
      ChangeName(8, "hdc<br>golf");
      ChangeName(9, "epostbank");
      ChangeName(10, "epostlife");
      ChangeName(11, "epostbank<br>mall");
      ChangeName(12, "epostbank<br>mobile");
      ChangeName(13, "epostlife<br>mobile");
      ChangeName(14, "arte");
      ChangeName(15, "Hyundai<br>Motor<br>Company");
      ChangeName(16, "shinhan<br>Ddangyo");
      ChangeName(17, "kccworld");
    }
    if (window.innerWidth <= 767) {
        ChangeName(0, "l");
        ChangeName(1, "n");
        ChangeName(2, "c");
        ChangeName(3, "n");
        ChangeName(4, "s");
        ChangeName(5, "s");
        ChangeName(6, "p");
        ChangeName(7, "o");
        ChangeName(8, "h");
        ChangeName(9, "e");
        ChangeName(10, "e");
        ChangeName(11, "e");
        ChangeName(12, "e");
        ChangeName(13, "e");
        ChangeName(14, "a");
        ChangeName(15, "H");
        ChangeName(16, "s");
        ChangeName(17, "k");
    } 
    if (window.innerWidth <= 393){
      ChangeName(0, "lottecinema");
      ChangeName(1, "naver");
      ChangeName(2, "coupang");
      ChangeName(3, "neungyule");
      ChangeName(4, "skmaterials");
      ChangeName(5, "Samsung<br>PreOrder");
      ChangeName(6, "hdc<br>parkRoche");
      ChangeName(7, "hdc<br>oakvalley");
      ChangeName(8, "hdc<br>golf");
      ChangeName(9, "epostbank");
      ChangeName(10, "epostlife");
      ChangeName(11, "epostbank<br>mall");
      ChangeName(12, "epostbank<br>mobile");
      ChangeName(13, "epostlife<br>mobile");
      ChangeName(14, "arte");
      ChangeName(15, "Hyundai<br>Motor<br>Company");
      ChangeName(16, "shinhan<br>Ddangyo");
      ChangeName(17, "kccworld");
    }
  }

  // 초기 로드 시 한 번 실행
  updateNames();

  // 윈도우 리사이즈 이벤트에 핸들러 추가
  window.addEventListener('resize', updateNames);
});
// hover
// $(function () {
//   $(".openPdf")
//     .mouseover(function () {
//       $(this + "#chanH3").css({
//         display: "none",
//       });
//     })
//     .mouseout(function () {
//       $(this + "#chanH3").css({
//         display: "block",
//       });
//     });
// });
