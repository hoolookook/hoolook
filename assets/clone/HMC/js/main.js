window.onload = function(){
    const swiperConfiguratorOutsideThumbs = new Swiper(".swiperConfiguratorOutsideThumbs", {
        spaceBetween: 8,
        slidesPerView: 3,
        
        loop: true,
        loopAdditionalSlides : 3,
        loopedSlides: 1,
        observer : true,
        observeParents : true       
        
    });

    const swiperConfiguratorOutside = new Swiper(".swiperConfiguratorOutside", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiperConfiguratorOutsideThumbs,
        },

        loop: true,
        loopedSlides: 1,
    });

    function mainSwiper() {
        // outside/studio btn swiper img change
        const studioSwiperBtn = document.querySelector('.item__link.btn--studio');
        const outsideSwiperBtn = document.querySelector('.item__link.btn--outside');
        // <!-- s: 230619 swiper slide beforeImg 추가됨 -->
       const mainStudioSwiperImg = document.querySelectorAll('.swiperConfiguratorOutside .swiper--outside .swiper-slide > img');
       const mainOutsideSwiperImg = document.querySelectorAll('.swiperConfiguratorOutside .swiper--outside .swiper-slide > img');
       const studioSwiperThumb = document.querySelectorAll('.swiperConfiguratorOutsideThumbs .swiper-slide > img');
       const swiperBeforeImg = document.querySelectorAll('.swiperConfiguratorOutside .swiper-slide .before-img img');
               
       function changeSwiperImg(btnName, swiperImg, thumbImg, beforeImg, imgName){
           btnName.addEventListener('click',()=>{
                   swiperImg.forEach((item,index)=>{
                       index += 1
                       item.src = `../images/dummy/img_dummy_configurator_${imgName}_0${index}.png`;
                       item.alt = `KONA Hybrid in ${imgName} ${index}`;
                   });
                   thumbImg.forEach((item,index)=>{
                       index += 1
                       item.src = `../images/dummy/img_dummy_configurator_pagination_${imgName}_0${index}.png`;
                       item.alt = `KONA Hybrid in ${imgName} ${index} thumbnail`;
                   })
                   beforeImg.forEach((item,index)=>{
                       index += 1
                       item.src =  `../images/dummy/img_dummy_configurator_${imgName}_0${index}.png`;
                       item.alt = `KONA Hybrid in ${imgName} ${index}`;
                   })
           });

       }

       changeSwiperImg(studioSwiperBtn,mainStudioSwiperImg,studioSwiperThumb,swiperBeforeImg,"studio");
       changeSwiperImg(outsideSwiperBtn,mainOutsideSwiperImg,studioSwiperThumb,swiperBeforeImg,"outside");
       // <!-- e: 230619 swiper slide beforeImg 추가됨 -->

    }

    // animation setting
    function introAni() {
        const configuratorWrap = document.querySelector('.configurator-wrap');
        const intro = document.querySelector('.configurator-intro');
        const introImgFirst = document.querySelector('.configurator-intro__image.ani-first');
        const introImgsec = document.querySelector('.configurator-intro__image.ani-sec');
        const introTxt = document.querySelector('.configurator-intro__name');
        const configuratorMain = document.querySelector('.configurator-wrap .configurator-main');
        const configuratorOpt = document.querySelector('.configurator-wrap .configurator-options')

        function aniTimerSet(target,sec,remove){
            if(remove){
                const time = setTimeout(()=>{
                    target.classList.remove('is-active');
                },sec);
            }
            else{
                const time = setTimeout(()=>{
                    target.classList.add('is-active');
                },sec);
            }
        }

            aniTimerSet(configuratorWrap,2500,0);
            aniTimerSet(introImgFirst,0,0);
            aniTimerSet(introTxt,0,0);
            aniTimerSet(configuratorMain,2500,0);
            aniTimerSet(intro,2000,1);
            aniTimerSet(configuratorOpt,2500,0);
            aniTimerSet(introImgsec,1500,0);

        if (matchMedia("screen and (max-width: 750px)").matches) {

            aniTimerSet(configuratorWrap,0,0);
            aniTimerSet(introImgFirst,0,0);
            aniTimerSet(introTxt,500,0);
            aniTimerSet(intro,2500,0);
            
        }
    }

    // swiper
    function swiperSet() {
        // dimension detail popup
        const swiperDimension = new Swiper(".swiperDimensionMain", {
            slidesPerView: 1,
            loop: true,
            draggable:true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true, // 페이지네이션 버튼 클릭시 스와이프 작동
            },
        });
        
        // trim - detail
        const swiperTrimDetail = new Swiper(".swiperTrimDetail", {
            slidesPerView: "auto",
            loop: false,
            draggable:true,
        });
    }

    // drop down
    function dropdownLayer() {
        const selectBtn = document.querySelectorAll('.options-select--dropdown a');
        const dropdownLayer =document.querySelector('.layer.layer--dropdown');

        const configOptionbody = document.querySelector('.configurator-options .options-body');
        const configOptionbottom = document.querySelector('.configurator-options .options-bottom');

        selectBtn.forEach((item)=>{
            item.addEventListener('click',function(){
                if(item.classList.contains('is-active')){
                    item.classList.remove('is-active');
                    dropdownLayer.classList.remove('is-active');
                }
                else{
                    item.classList.add('is-active');
                    dropdownLayer.classList.add('is-active');
                    
                }
                if(dropdownLayer.classList.contains('is-active')){
                        configOptionbody.classList.remove('is-active');
                        configOptionbottom.classList.remove('is-active')
                    }
                else{
                    configOptionbody.classList.add('is-active');
                    configOptionbottom.classList.add('is-active')
                }
            })
        })

        // dropdown item is-active 
        function selectOpiton () {
            const selectItem = document.querySelectorAll('.layer--dropdown .select-list.select-list--list .select__item');
            const optionSelectBtn = document.querySelectorAll('.options-select.options-select--layer .options-select__btn');

            function selectOne(selector){
                selector.forEach((item)=>{
                    item.addEventListener('click',()=>{
                        selector.forEach((e)=>{
                            e.classList.remove('is-active');
                        })
                        item.classList.add('is-active');
                    })
                })
            }
            selectOne(optionSelectBtn);
            selectOne(selectItem);
        }
    }

    // option
    function configuOPtion() {
        // option scroll
        const configuOption = document.querySelector('.configurator-options');
        const configuOpBody = document.querySelector('.options-body');

        if (matchMedia("screen and (max-width: 750px)").matches) {
            configuOpBody.addEventListener('scroll',()=>{
                if(configuOpBody.scrollTop > 10){
                    configuOption.classList.add('is-scrolling');
                }else{
                    configuOption.classList.remove('is-scrolling');
                }
            })

        }
        else{
            configuOpBody.addEventListener('scroll',()=>{
                configuOption.classList.remove('is-scrolling');
            })
        }

        // option popup
        const btnOption = document.querySelectorAll('.options-select:not(.options-select--dropdown) .options-select__btn');
        const optionLayer = document.querySelectorAll('.layer:not(.layer--dropdown)');
        const optionClose = document.querySelectorAll('.btn__layer-back');

        btnOption.forEach((el, i) => {
            el.addEventListener("click", function(){
                optionLayer[i].classList.add('is-active');
                // console.log('click!!!!!!')
            })
        })
        optionClose.forEach((el, i) => {
            el.addEventListener("click", function(){
                optionLayer[i].classList.remove('is-active')
            })
        })
        // console.log(btnOption)
        // console.log(optionClose)


        // mobile list/image toggle active
        const toggleBtn = document.querySelectorAll('input[name=switch02]');
        const selectList = document.querySelectorAll('.select-list--list');
        const selectImg = document.querySelectorAll('.select-list--image');
        toggleBtn.forEach((el)=>{
            el.addEventListener('click',()=>{
                if(el.checked){
                    selectList.forEach((el)=>{
                        el.classList.remove('is-active');
                    })
                    selectImg.forEach((el)=>{
                        el.classList.add('is-active');
                    })
                }else{
                    selectList.forEach((el)=>{
                        el.classList.add('is-active');
                    })
                    selectImg.forEach((el)=>{
                        el.classList.remove('is-active');
                    })
                }
            })
        })
        // select-item 선택
        const selectItem = document.querySelectorAll('.select-list--list .select__item');
        const selectTxt = document.querySelector('.select-list--list .select__item.is-active');
        const targetTxt = document.querySelectorAll('.select-list--image .select__item');
        selectItem.forEach((el)=>{
            el.addEventListener('click',()=>{
                selectedActive(el);
                selectedTxt(el);
            })
        })
        function selectedActive(selected){
            selectItem.forEach((el)=>{
                if(el.classList.contains('is-active')){
                    el.classList.remove('is-active')
                }
            })
            selected.classList.add('is-active');
        }
        function selectedTxt(selected){
            selectItem.forEach((el)=>{
                targetTxt.forEach((el)=>{
                    el.innerHTML = selected.innerHTML;
                })
            })
        }
        // back버튼 클릭시 list화면으로 
        const btnLayerBack = document.querySelectorAll('.btn__layer-back');
        btnLayerBack.forEach((el)=>{
            el.addEventListener('click',()=>{
                toggleBtn.forEach((el)=>{
                    el.checked = false;
                })
                selectList.forEach((el)=>{
                    el.classList.add('is-active');
                })
                selectImg.forEach((el)=>{
                    el.classList.remove('is-active');
                })
            })
        })
    }

    // option - trim
    function trim() {
        const winWidth = window.innerWidth;
        const btnFeature = document.querySelectorAll('.use-details .feature__btn')
        const featureLayer = document.querySelectorAll('.feature__btn + .feature__layer')
        const btnClose = document.querySelectorAll('.use-details .btn-wrap')
        const dimm = document.querySelector('.dimm')

        btnFeature.forEach((item)=>{
            if(winWidth >= 751) {
                item.addEventListener('mouseenter',function(){
                    item.classList.add('is-active');
                })
                item.addEventListener('mouseout',function(){
                    item.classList.remove('is-active');
                })
            }
            if(winWidth < 1920) {
                item.addEventListener('click',function(){
                    item.classList.add('is-active');
                    dimm.classList.add('is-active');
                })
            }
        })

        btnClose.forEach((item, i) => {
            item.addEventListener("click", function(){
                btnFeature[i].classList.remove('is-active');
                dimm.classList.remove('is-active');
            })
        })
    }


    // fn
    mainSwiper();
    introAni();
    swiperSet();
    dropdownLayer();
    configuOPtion();
    trim();
};
