(() => {
	
	window.hyundai = window.hyundai || {};
	window.hyundai.CC = window.hyundai.CC || {};

	const constants = {
		BREAKPOINTS: {
			DESKTOP: 1920,
			MOBILE: 750,
			MOBILE_UNDER: 360,
		},
		KEY_CODE: {
			TAB: 9,
			ENTER: 13,
			SPACE: 32,
			PAGE_UP: 33,
			PAGE_DOWN: 34,
			END: 35,
			HOME: 36,
			LEFT: 37,
			UP: 38,
			RIGHT: 39,
			DOWN: 40,
			ESC: 27,
		},
	}

	// 디바이스 크기 확인
	const utils = {
		getViewPort() {
			let doc = window;
			let pre = 'inner';
		
			if (!('innerWidth' in window)) {
				pre = 'client';
				doc = document.documentElement || document.body;
			}
		
			return {
				width: doc[`${pre}Width`],
				height: doc[`${pre}Height`],
			};
		},
		getCurrentDevice() {
			const width = utils.getViewPort().width;
			return width > constants.BREAKPOINTS.MOBILE ? 'desktop' : 'mobile';
		},
	}

	// 모바일 브라우저 실제 100vh
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);

	window.addEventListener("resize", () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	});

	class Popup {
		constructor(el){
			this.el = el;
			this.element = {
				closeBtn : '.btn__layer-close',
			}

			this.selector = {

			}

			this.handler = {
				closeModal:this.closeModal.bind(this),
			}

			Popup.instances.set(el, this);
			this.init();
		}

		init(){
			this.setElement();
			this.eventBind();
		}

		reInit(){
			this.setElement();
			this.eventBind();
		}

		setElement(){
			this.selector.closeBtn = this.el.querySelector(this.element.closeBtn);
		}

		eventBind(){
			if (this.selector.closeBtn) {
				this.selector.closeBtn.removeEventListener('click', this.handler.closeModal);
				this.selector.closeBtn.addEventListener('click', this.handler.closeModal);
			}
		}
		openModal(){
			this.el.classList.add('is-active');
		}
		closeModal(){
			// #1031 : popup 닫기 event 삭제
			// this.el.classList.remove('is-active');
		}

		resize(){

		}

		open(){
		}

		close(){

		}
	}


	class Button {
		constructor(el){
			this.el = el;
			this.element = {
				optionBtn : '.btn-option .btn',
				optionLink : '.btn-option .item__link',
				optionClose : '.btn-option__close',
			}

			this.selector = {

			}

			this.handler = {
				optionList : this.optionList.bind(this),
			}

			Button.instances.set(el, this);
			this.init();
		}

		init(){
			this.setElement();
			this.eventBind();
		}

		reInit(){
			this.setElement();
			this.eventBind();
		}

		setElement(){
			this.selector.optionBtn = this.el.querySelectorAll(this.element.optionBtn);
			this.selector.optionLink = this.el.querySelectorAll(this.element.optionLink);
			this.selector.optionClose = this.el.querySelector(this.element.optionClose);
		}

		eventBind(){
			// option
			if(this.el.classList.contains('btn-option')){
				this.selector.optionBtn.forEach((optionBtn)=>{
					optionBtn.removeEventListener('click', this.handler.optionList);
					optionBtn.addEventListener('click', this.handler.optionList);
				})
				this.selector.optionClose.removeEventListener('click', this.handler.optionList);
				this.selector.optionClose.addEventListener('click', this.handler.optionList);
				this.selector.optionLink.forEach((optionLink)=>{
					optionLink.removeEventListener('click', this.handler.optionList);
					optionLink.addEventListener('click', this.handler.optionList);
				})
			}
		}

		// option
		optionList(el){
			const target = el.target
			const optionItem = 'btn-option__item'
			const optionSibling = Array.from(target.parentNode.parentNode.children);
			if(target.parentNode.classList.contains(optionItem)){
				optionSibling.forEach((el)=>{
					el.classList.remove('is-active');
				})
				target.parentNode.classList.add('is-active');
			}else{
				target.parentNode.parentNode.classList.remove('is-active');
			}   
			
			const linkSibling = Array.from(target.parentNode.children);
			linkSibling.forEach((el) => {
				// el.classList.remove('is-active');
				el.removeAttribute('title');
				el.classList.add('is-active');
				linkSibling.forEach((e)=>{
					e.classList.remove('is-active');
				})
			})
			target.classList.add('is-active');
			target.setAttribute('title','선택됨');

		}

	}


	class Select {
		constructor(el){
			this.el = el;
			this.element = {
				selectBtn : '.select-btn',
				selectList : '.select-list',
				selectItem : '.select__item',
				carName : '.car-name',
			}

			this.selector = {

			}

			this.handler = {
				selectToggle : this.selectToggle.bind(this),
				selectHide : this.selectHide.bind(this),
				selectActive: this.selectActive.bind(this),
			}

			Select.instances.set(el, this);
			this.init();
			this.eventBind();
		}

		init(){
			this.setElement();
			this.eventBind();
		}

		reInit(){
			this.setElement();
			this.eventBind();
		}

		setElement(){
			this.selector.selectWrap = this.el.querySelector(this.element.selectWrap);
			this.selector.selectBtn = this.el.querySelector(this.element.selectBtn);
			this.selector.selectList = this.el.querySelector(this.element.selectList);
			this.selector.selectItem = this.el.querySelectorAll(this.element.selectItem);
			this.selector.carName = this.el.querySelectorAll(this.element.carName);
		}

		eventBind(){
			this.selector.selectBtn.removeEventListener('click', this.handler.selectToggle);
			this.selector.selectBtn.addEventListener('click', this.handler.selectToggle);
			this.selector.selectItem.forEach((selectItem) => {
				selectItem.removeEventListener('click', this.handler.selectActive);
				selectItem.addEventListener('click', this.handler.selectActive);
			})
		}

		selectToggle(){
			this.el.classList.toggle('is-active');
		}

		selectHide(el){
			const selectActive = this.el.contains(el.target);

			if (!selectActive) {
				this.el.classList.remove('is-active');
			}
		}

		selectActive(el){
			const comparePopup = document.querySelector('.popup-container.type-half.type1.is-active');
			const winWidth = window.innerWidth;

			if(winWidth > 751) {
				this.selector.selectBtn.textContent = el.target.querySelector('.select__title').textContent;
			}
			if(winWidth < 751) {
				if(comparePopup) {
					let ppparent = el.target.parentNode.parentNode.parentNode.parentNode.nextSibling.nextSibling.querySelector('.title');
					ppparent.textContent = el.target.querySelector('.select__title').textContent;
				}
			}

			
			this.selector.selectItem.forEach((selectItem) => {
				selectItem.classList.remove('is-active');
				selectItem.removeAttribute('title');
				selectItem.parentNode.classList.remove('is-active');
			})
			el.target.classList.add('is-active');
			el.target.setAttribute('title','선택됨');
			el.target.parentNode.classList.add('is-active');
			this.el.classList.remove('is-active');
		}
	}


	class Accordion {
		constructor(el){
			this.el = el;
			this.element = {
				accobtn : '.accordion-title__btn',
				accoList : '.accordion-content',
				accoTableHeight :'.accordion-content .accorheight',
				toolIcon : '.accordion-title__tooltip__icon',
				toolBox : '.accordion-title__tooltip__box'
			}

			this.selector = {

			}

			this.handler = {
				accoToggle : this.accoToggle.bind(this),
				accoActive :  this.accoActive.bind(this),
				toolTipToggle : this.toolTipToggle.bind(this),
			}

			Accordion.instances.set(el, this);
			this.init();
		}

		init(){
			this.setElement();
			this.eventBind();
		}

		reInit(){
			this.setElement();
			this.eventBind();
		}

		setElement(){
			this.selector.accoBtn = this.el.querySelector(this.element.accobtn);
			this.selector.accoList = this.el.querySelector(this.element.accoList);
			this.selector.accoTableHeight = this.el.querySelector(this.element.accoTableHeight);
			this.selector.toolIcon = this.el.querySelectorAll(this.element.toolIcon);
			this.selector.toolBox = this.el.querySelectorAll(this.element.toolBox);
		}

		eventBind(){
			this.selector.accoBtn.removeEventListener('click', this.handler.accoToggle);
			this.selector.accoBtn.addEventListener('click', this.handler.accoToggle);
			this.selector.toolIcon.forEach((el)=>{
				el.removeEventListener('click', this.handler.toolTipToggle);
			})
			this.selector.toolIcon.forEach((el)=>{
				el.addEventListener('click', this.handler.toolTipToggle);
			})

			const detailCheckElements = this.el.querySelectorAll('input[type="checkbox"]');
			detailCheckElements.forEach((checkbox) => {
				checkbox.removeEventListener('change', this.handler.accoToggle);
				checkbox.addEventListener('change', this.handler.accoToggle);
			});

			const tooltipBtn = document.querySelectorAll(".accordion-title__tooltip__icon");
			const tooltipBox = document.querySelector(".accordion-title__tooltip__box");

			document.addEventListener('click', function(e) {
				tooltipBtn.forEach(function(tooltip) {
					if (!tooltip.contains(e.target)) {
						tooltipBox.classList.remove("is-active");
					}
				});
			});
		}

		accoToggle(accEl) {
			const accessoriesParent = this.el.closest('.accessories');
			const packagesParent = this.el.closest('.packages');
			const optionsParent = this.el.closest('.options');

			if(accessoriesParent || packagesParent || optionsParent){
				const clickedItem = accEl.target.closest('.accordion-content-inner');
				const targetTabItem = clickedItem;
				const targetTabCon = targetTabItem.querySelector('.accordion-content');
			
				if (clickedItem) {

					const allItems = document.querySelectorAll('.accordion-content-inner');
					allItems.forEach(item => {
						if (item !== clickedItem) {
							item.classList.remove('is-active');
							item.querySelector('.accordion-content').style.height = 0;
						}
					});
			
					const targetTabItem = clickedItem;
					const targetTabCon = targetTabItem.querySelector('.accordion-content');
					const targetTabConHeight = targetTabItem.querySelector('.accorheight');
					const ath = targetTabConHeight.offsetHeight;
			
					targetTabItem.classList.toggle('is-active');
					targetTabCon.style.height = targetTabItem.classList.contains('is-active') ? ath + 'px' : 0;

					if (targetTabItem.classList.contains('is-active')) {
						targetTabCon.style.height = targetTabConHeight.offsetHeight + 'px';
					} else {
						targetTabCon.style.height = 0;
					}
				}
				
				const detailCheck = clickedItem.querySelector('input[type="checkbox"]');
				if (detailCheck && detailCheck.checked && targetTabItem.classList.contains('is-active')) {
					return;
				}

				if (detailCheck && detailCheck.checked) {
					const targetTabConHeight = targetTabItem.querySelector('.accorheight');
					const ath = targetTabConHeight.offsetHeight;

					targetTabItem.classList.add('is-active');
					targetTabCon.style.height = ath + 'px';
				} else {
					if (!targetTabItem.classList.contains('is-active')) {
						targetTabItem.classList.remove('is-active');
						targetTabCon.style.height = 0;
					}
				}

				const allItems = document.querySelectorAll('.accordion-content-inner');
				allItems.forEach(item => {
					if (item !== clickedItem) {
						item.classList.remove('is-active');
						item.querySelector('.accordion-content').style.height = 0;
					}
				});
			}
			else {
				this.el.classList.toggle('is-active');
			
				if(this.el.classList.contains('is-active')){
					var ath = this.selector.accoTableHeight.offsetHeight;
					this.selector.accoList.style.height = ath + 'px';
			
				}
				else{
					this.selector.accoList.style.height = 0;
				}
			}
		}

		toolTipToggle(){
			this.selector.toolBox.forEach((el)=>{
				el.classList.toggle('is-active');
			});
		}

		accoActive(el){
			el.target.classList.add('is-active');
			el.target.parentNode.classList.add('is-active');
			this.el.classList.remove('is-active');
		}
	}
	class AccordionFooter {
		constructor(el){
			this.el = el;
			this.element = {
				accobtn : '.accordion-title__btn',
				accoList : '.accordion-title + div',
				accoTableHeight :'ul',
			}

			this.selector = {

			}

			this.handler = {
				accoToggle : this.accoToggle.bind(this),
				accoActive :  this.accoActive.bind(this),
			}

			AccordionFooter.instances.set(el, this);
			this.init();
		}

		init(){
			this.setElement();
			this.eventBind();
		}

		reInit(){
			this.setElement();
			this.eventBind();
		}

		setElement(){
			this.selector.accoBtn = this.el.querySelector(this.element.accobtn);
			this.selector.accoList = this.el.querySelector(this.element.accoList);
			this.selector.accoTableHeight = this.el.querySelector(this.element.accoTableHeight);
		}

		eventBind(){
			this.selector.accoBtn.removeEventListener('click', this.handler.accoToggle);
			this.selector.accoBtn.addEventListener('click', this.handler.accoToggle);
		}

		accoToggle(){
			this.el.classList.toggle('is-active');

			if(this.el.classList.contains('is-active')){
				var ath = this.selector.accoTableHeight.offsetHeight;
				this.selector.accoList.style.height = ath + 'px';

			}
			else{
				this.selector.accoList.style.height = 0;
			}
		}

		accoActive(el){
			el.target.classList.add('is-active');
			el.target.parentNode.classList.add('is-active');
			this.el.classList.remove('is-active');
		}

	}


	// 230818 : #1218 main-content에서 사용하는 탭 기능 추가
	class Tab {
		constructor(el){
			this.el = el;
			this.element = {
				tabWrap : '.menu-tab-wrap',
				tabList : '.menu-tab__list',
				tabItem : '.menu-tab__item',
				tabLink : '.menu-tab__link',
				tabContent : '.tab-content',
				subItem : '.sub-menu__item',
				mainModeltitle : '.models-sec__tit',
			}

			this.selector = {

			}

			this.handler = {
				tabActive : (index) => {
					this.tabActive(index)
				},
			}

			Tab.instances.set(el, this);
			this.init();
		}

		init(){
			this.setElement();
			this.eventBind();
		}

		reInit(){
			this.setElement();
			this.eventBind();
		}

		setElement(){
			this.selector.tabList = this.el.querySelector(this.element.tabList);
			this.selector.tabLink = this.el.querySelectorAll(this.element.tabLink);
			this.selector.tabItem = this.el.querySelectorAll(this.element.tabItem);
			this.selector.tabContWrap = this.el.nextElementSibling;
			this.selector.tabContent = this.el.nextElementSibling.querySelectorAll(this.element.tabContent);
			this.selector.mainModeltitle = this.el.querySelectorAll(this.element.mainModeltitle);
		}

		eventBind(){
			this.selector.tabLink.forEach((tabLink, index) => {
				tabLink.removeEventListener('click', this.handler.tabActive.bind(this, index));
				tabLink.addEventListener('click', this.handler.tabActive.bind(this, index));
			})
			const subItems = this.el.querySelectorAll(this.element.subItem);
			const crossModel = document.querySelectorAll('.show-pc .cross-image img');
			const crossModelMo = document.querySelectorAll('.show-mobile .cross-image img');
			const winWidth = window.innerWidth;

			subItems.forEach((subItem, idx) => {
				subItem.addEventListener('click', () => {
					subItems.forEach((item) => {
						item.classList.remove('is-active');
					});
					subItem.classList.add('is-active');
					if( winWidth > 750) {
						crossModel.forEach((item,index) => {
							item.classList.remove('is-active');
							if (index === idx) {
								item.classList.add('is-active');
							}
						});
					}
					else {
						crossModelMo.forEach((item,index) => {
							item.classList.remove('is-active');
							if (index === idx) {
								item.classList.add('is-active');
							}
						});
					}
				});
			});
		}

		tabActive(index){
			const tabWrap = this.selector.tabList.closest('.menu-tab-wrap');
			const tabLink = Array.from(this.selector.tabLink);
			const tabContent = Array.from(this.selector.tabContent);
			const tabActive = this.selector.tabList.querySelector('.is-active');
			const tabListEl = this.selector.tabList;
			const tabContActive = this.selector.tabContWrap.querySelector('.is-active');
			const mainModeltitle =  document.querySelector('.models-sec__tit');
			const mainCont = this.selector.tabContWrap.parentNode;
			
			if(tabWrap.classList.contains('menu-tab-wrap--horizontal')) {
				mainModeltitle.textContent = this.selector.tabLink[index].textContent;
			}
			
			const clickedTabIndex = index;
			
			let previousWidthSum = 0;
			for (let i = 0; i < clickedTabIndex; i++) {
				previousWidthSum += this.selector.tabItem[i].offsetWidth;
			}

			const leftVal = previousWidthSum + 'px';
			tabListEl.style.setProperty('--before-left', leftVal);
			this.selector.tabItem[clickedTabIndex].classList.add('is-moving');

			for (let i = 0; i < this.selector.tabItem.length; i++) {
				if (i !== clickedTabIndex) {
					this.selector.tabItem[i].classList.remove('is-moving');
				}
				// if(i === 0) {
				//     this.selector.tabItem[0].style.marginLeft = 0;
				// }
			}

			if (tabActive) {
				tabActive.classList.remove('is-active');
				tabLink.forEach((tabLink) => {
					tabLink.setAttribute('aria-selected','false');
				})
			}

			if (tabContActive) {
				tabContent.forEach((tabContent) => {
					tabContent.classList.remove('is-active');
				})
			}
			this.selector.tabLink[index].parentNode.classList.add('is-active');
			this.selector.tabLink[index].setAttribute('aria-selected','true');
			// this.selector.tabContent[index].classList.add('is-active');
			const tabContentId = this.selector.tabLink[index].getAttribute('aria-controls');
			const tabContentElement = document.getElementById(tabContentId);
			if (tabContentElement) {
				tabContentElement.classList.add('is-active');
			}
		}
	}



	Popup.instances = new WeakMap();
	Button.instances = new WeakMap();
	Select.instances = new WeakMap();
	Accordion.instances = new WeakMap();
	AccordionFooter.instances = new WeakMap();
	Tab.instances = new WeakMap();
	// IntroAni.instances = new WeakMap();




	const popup = {
		init(){
			[...document.querySelectorAll('.popup-layer-wrap')].forEach((element) => {
				if (! Popup.instances.has(element)) {
					new Popup(element);
				}
			});   
		},

		reInit(){
			[...document.querySelectorAll('.popup-layer-wrap')].forEach((element) => {
				if (! Popup.instances.has(element)) {
					new Popup(element);
				} else {
					Popup.instances.get(element).reInit();
				}
			}); 
		},
	}


	const button = {
		init(){
			[...document.querySelectorAll('.btn-wrap')].forEach((element) => {
				if (! Button.instances.has(element)) {
					new Button(element);
				}
			});   
		},

		reInit(){
			[...document.querySelectorAll('.btn-wrap')].forEach((element) => {
				if (! Button.instances.has(element)) {
					new Button(element);
				} else {
					Button.instances.get(element).reInit();
				}
			}); 
		},
	}


	const select = {
		init(){
			[...document.querySelectorAll('.select-wrap')].forEach((element) => {
				if (! Select.instances.has(element)) {
					new Select(element);
				} else {
					Select.instances.get(element).reInit();
				}
			});  
		}
	}


	const accordian = {
		init(){
			[...document.querySelectorAll('.accordion-wrap .accordion-content-wrap .accordion-content-inner')].forEach((element) => {
				if (! Accordion.instances.has(element)) {
					new Accordion(element);
				} else {
					Accordion.instances.get(element).reInit();
				}
			});  
		}
	}


	const accordianfooter = {
		init(){
			[...document.querySelectorAll('.footer-info .info__item')].forEach((element) => {
				if (! AccordionFooter.instances.has(element)) {
					new AccordionFooter(element);
				} else {
					AccordionFooter.instances.get(element).reInit();
				}
			});  
		}
}


	// 230818 : #1218 init 재정의
	const tab = {
		init(){
			[...document.querySelectorAll('.menu-tab-wrap')].forEach((element) => {
				if (! Tab.instances.has(element)) {
					new Tab(element);
				} else {
					Tab.instances.get(element).reInit();
				}
			});
		}
	}


	const commonUI = () => {
		// header - 국가선택
		if(document.querySelectorAll('.lang-wrap').length){
			const langWrap = document.querySelector('.lang-wrap');
			const langSelect = document.querySelector('.lang-select');
			const langList = document.querySelector('.lang-list');
			const langItem = document.querySelectorAll('.lang__item');
			const langLink = document.querySelectorAll('.lang__link');
			const langShow = (e) => {
				langWrap.classList.toggle('is-active');

			}
			const langHide = () => {
				langWrap.classList.remove('is-active');
			}
			
			const winwidth = window.innerWidth;
			if(winwidth < 751){
				langSelect.addEventListener('click', langShow);
			}
			else if(winwidth > 750){
				langWrap.addEventListener('mouseover', langShow);
				langWrap.addEventListener('mouseout', langHide);
			}

			langLink.forEach((el) => {
				el.addEventListener('click', () => {
					langSelect.textContent = el.textContent;
					langItem.forEach((item) => {
						item.classList.remove('is-active');
					})
					langLink.forEach((link) => {
						link.removeAttribute('title');
					})
					el.parentNode.classList.add('is-active');
					el.setAttribute('title','선택됨');
				});
				el.addEventListener('click', langHide)
			})

			if(document.querySelectorAll('.yourbuild-wrap .swiperDimensionMain').length){
				const swiperDimension = new Swiper(".swiperDimensionMain", {
					slidesPerView: 1,
					loop: true,
					draggable:true,
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					},
				});
			}
		}
	};


	const findSelector = (target) => {
		if (typeof target === 'string') {
			return document.querySelector(target);
		} else {
			return target;
		}
	}


	const openModal = (element) => {
		const el = findSelector(element);
		// console.log(Popup.instances.has(el))
		if (Popup.instances.has(el)) {
			const instances = Popup.instances.get(el).openModal();
		}
	} 


	const closeModal = (element) => {
		const el = findSelector(element);
		// console.log(Popup.instances.has(el))
		if (Popup.instances.has(el)) {
			const instances = Popup.instances.get(el).closeModal();
		} 
	} 

	// const includeType = (type)=>{
	//     const selId = document.querySelector(`${"#"+type}`);

	//     if(document.getElementById('header')){
	//         fetch('../html/'+`${type}`+'.html')
	//         .then(res => res.text())
	//         .then(data => selId.innerHTML = data);
	//     }
	//     else{
	//         return null;
	//     }
	// }

	const allModels = {
		el : {
			filterclass :`filter--panel--open`,
		//targetParent : '.filter--panel--open',
		},
		setElement : () => {
			allModels.el.content = document.querySelector('.main-content');
			allModels.el.BtnWrap = allModels.el.content.querySelector('.fixed-btn-wrap');
			allModels.el.topBtn = allModels.el.BtnWrap.querySelector('.btn__top');
			allModels.el.viewHeight = parseInt(utils.getViewPort().height);
			allModels.el.filterBtn =  document.querySelector('.btn__filter');
			allModels.el.filterBtnMo =  document.querySelector('.fixed-btn-wrap .btn__filter');
			allModels.el.contentPaddingBottom = parseInt(getComputedStyle(allModels.el.content).getPropertyValue('padding-bottom'));
			allModels.el.listItems = document.querySelectorAll('.product-grid__item');
			allModels.el.body = document.querySelector('body');
			allModels.el.tipBtn = document.querySelectorAll('.tip-btn');
			allModels.el.tipWrap = document.querySelectorAll('.product-grid__tip__wrap');
			allModels.el.filterWrap = document.querySelectorAll('.models-sec');
		},
		init : () => {
			if(document.querySelectorAll('.main-content').length){
				allModels.setElement();
				allModels.el.tipBtn.forEach(function(el) {
					el.addEventListener('click', function() {
						el.parentNode.parentNode.classList.toggle("is-open");
					});
				});
				allModels.el.tipWrap.forEach(function (el) {
					el.addEventListener('mouseleave', function () {
						allModels.el.listItems.forEach(function (item) {
							item.classList.remove("is-open");
						});
					});
				});

				if (utils.getCurrentDevice() == 'mobile') {
					document.addEventListener('touchstart', function(event) {
						var target = event.target;
			
						if (!target.closest('.product-grid__tip__wrap')) {
							allModels.el.listItems.forEach(function (item) {
								item.classList.remove("is-open");
							});
						}
					});
				}
				
				allModels.filterSec();
				allModels.tipHover();
			}
		},
		tipHover : ()=>{
			allModels.el.listItems.forEach(function(el) {
				el.addEventListener('mouseover', function() {
					el.classList.add("hover");
				});

				allModels.el.tipBtn.forEach(function(el) {
					el.addEventListener('mouseover', function(e) {
						el.parentNode.classList.remove("hover");
						e.stopPropagation(); 
					});
				});

				allModels.el.tipWrap.forEach(function(el) {
					el.addEventListener('mouseover', function(e) {
						e.stopPropagation(); 
					});
					
				});

				el.addEventListener('mouseout', function() {
					el.classList.remove("hover");
				});
			
			});
		},
		topClickEvent : () => {
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		},
		topScrollEvent : () => {
			const scrollTop = window.pageYOffset;
			if (scrollTop < 70) {
				allModels.el.BtnWrap.classList.remove('top-btn--active');
			} else if (scrollTop > 70) {
				allModels.el.BtnWrap.classList.add('top-btn--active');
			}
		},
		filterSec : () => {
			if(allModels.el.filterBtn){
				const panelShow = () => {
					allModels.el.filterWrap.forEach((el) =>{
						el.classList.toggle('filter--panel--open');
						// el.classList.add('pop-time');
					});
				}

				const closePanel =() =>{
					allModels.el.filterWrap.forEach((el) =>{
						el.classList.remove('filter--panel--open');
					});
					allModels.el.filterBtn.setAttribute('aria-expanded','false');
					
				
					if(utils.getCurrentDevice() == 'mobile'){
						allModels.el.body.style.removeProperty('overflow');
					}
				};

				//필터버튼 클릭
				allModels.el.filterBtn.addEventListener('click', () => {
					panelShow();
                    
				
					if(utils.getCurrentDevice() == 'mobile'){
						allModels.el.body.style.overflow = 'hidden';
	
						const closeBtn = document.querySelector('.filters-cont__header .popup-layer-close');
						closeBtn.addEventListener('click', closePanel);
					}
				});
				allModels.el.filterBtnMo.addEventListener('click', () => {
					panelShow();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
				
					if(utils.getCurrentDevice() == 'mobile'){
						allModels.el.body.style.overflow = 'hidden';
	
						const closeBtn = document.querySelector('.filters-cont__header .popup-layer-close');
						closeBtn.addEventListener('click', closePanel);
					}
				});
			}
		},
	}


	const configurator = {
		init : () => {
			if(document.querySelectorAll('.configurator-wrap').length){
				// drop down
				function dropdownLayer() {
					const configUtil = document.querySelector('.header-inner');
					const selectBtn = document.querySelectorAll('.options-select--dropdown a');
					const dropdownLayer =document.querySelector('.layer.layer--dropdown');
			
					const configOptionbody = document.querySelector('.configurator-options .options-body');
					const configOptionbottom = document.querySelector('.configurator-options .options-bottom');
			
					selectBtn.forEach((item)=>{
						item.addEventListener('click',function(){
							if(item.classList.contains('is-active')){
								item.classList.remove('is-active');
								dropdownLayer.classList.remove('is-active');
								// if(configUtil) {
								//     configUtil.classList.remove('is-remove');
								// }
							}
							else{
								item.classList.add('is-active');
								dropdownLayer.classList.add('is-active');
								// if(configUtil) {
								//     configUtil.classList.add('is-remove');
								// }
								
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
					const configuMain = document.querySelector('.configurator-main');

					function handleScroll() {
						if (matchMedia("screen and (max-width: 750px)").matches) {
							if (configuOpBody.scrollTop > 10) {
								configuOption.classList.add('is-scrolling');
								configuMain.style.display = "none";
							} else {
								configuOption.classList.remove('is-scrolling');
								configuMain.style.display = "block";
							}
						} else {
							configuOption.classList.remove('is-scrolling');
						}
					}
					handleScroll();
					
					window.addEventListener('resize', () => {
						handleScroll();
					});
					
					configuOpBody.addEventListener('scroll', () => {
						handleScroll();
					});
			
					// option popup
					const btnOption = document.querySelectorAll('.options-body .options-select__btn');
					const optionClose = document.querySelectorAll('.btn__layer-back');
					const test = document.querySelector('.options-select--dropdown');
			
					btnOption.forEach((el) => {
						el.addEventListener("click", () => {
							const optionLayer = el.dataset.popup;
							const popup = document.querySelector(`.layer${optionLayer}`)

							if (popup) {
								popup.classList.add('is-active');
								document.querySelector('.select-list-wrap').scrollTo(0,0);
							}
							
						})
					})
					optionClose.forEach((close) => {
						close.addEventListener("click", () => {
							const popup = close.closest('.layer')
							
							if (popup) {
								popup.classList.remove('is-active');
							}
						})
					})

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


					const layers = document.querySelectorAll('.layer');
					
					layers.forEach(layer => {
						const selectItem = layer.querySelectorAll('.select-list--list .select__item');
						const selectTxt = layer.querySelector('.select-list--list .select__item.is-active');
						const targetTxt = layer.querySelectorAll('.select-list--image .select__item');
						
						selectItem.forEach(el => {
							el.addEventListener('click', () => {
								selectedActive(el);
								selectedTxt(el);
							});
						});
					
						function selectedActive(selected) {
							selectItem.forEach(item => {
								item.classList.remove('is-active');
							});
							selected.classList.add('is-active');
						}
						
						function selectedTxt(selected) {
							targetTxt.forEach(el => {
								el.innerHTML = selected.innerHTML;
							});
						}
					});
					
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


				// option - powertrain
				function powerTrainDetail() {
					const powertrainPopup = document.querySelector('.powertrain-content');

					if(powertrainPopup) {
						window.addEventListener('scroll', function(){
							let scrollPos = window.scrollY;
							let pos = document.body.offsetTop;
							// console.log(scrollPos);
							if(scrollPos>0){
								document.querySelector('.powertrain-header').classList.add('is-active');
								document.querySelector('.powertrain-detail').classList.add('is-active');
								document.querySelector('.btn__close').classList.add('btn__close--scroll');
							}
							else{
								document.querySelector('.powertrain-header').classList.remove('is-active');
								document.querySelector('.powertrain-detail').classList.remove('is-active');
								document.querySelector('.btn__close').classList.remove('btn__close--scroll');
							}
						});
					}
				}


				// configulator popup
				function configPopup() {
					const winWidth = window.innerWidth;
					const configTabMenu = document.querySelectorAll('.additional-detail .accordion-title');
					const configTabColor = document.querySelectorAll('.additional-detail .accordion-title-wrap')
					const configTabCont = document.querySelectorAll('.additional-detail .accordion-content');
                    const configTable = document.querySelectorAll('.accordion-content .table-item');
                    
                    configTable.forEach((el)=> {
                        const configTr = el.querySelectorAll('.table tr');
                        configTr.forEach((oddTg,index) => {
                            oddTg.classList.remove('bg_gray');
                            if(index % 2 === 0) {
                                oddTg.classList.add('bg_gray');
                            }
                        })
                    })
					if(winWidth >= 751){
						configTabMenu.forEach((el)=>{
							el.addEventListener('click',()=>{
								configTabColor.forEach((oth)=>{
									oth.classList.remove('is-active');
								});
								const elChild = el.querySelector('.accordion-title-wrap');
								elChild.classList.add('is-active')
								
								const nextCont = el.nextElementSibling;
								configTabCont.forEach((el)=>{
									el.classList.remove('is-active');
								});
								nextCont.classList.add('is-active');
							})
						})
					};
				}


				function checkItemFuc(){
					const checkTitle = document.querySelectorAll('.check-item input[type="checkbox"]');
					checkTitle.forEach((el)=>{
						if(el.checked){
							el.parentNode.parentNode.parentNode.parentNode.classList.add('is-checked');
						}
						el.addEventListener('change',()=>{
							if(el.checked){
								el.parentNode.parentNode.parentNode.parentNode.classList.add('is-checked');
							}else{
								el.parentNode.parentNode.parentNode.parentNode.classList.remove('is-active');
								el.parentNode.parentNode.parentNode.parentNode.classList.remove('is-checked');
							}
						})
					});
				}

				// fn
				// mainSwiper();
				// introAni();
				dropdownLayer();
				configuOPtion();
				powerTrainDetail();
				configPopup();
				checkItemFuc();
			}
		},
	}


	const featureLayer = {
		init : () => {
			if(document.querySelectorAll('.configurator-wrap').length){
				const winWidth = window.innerWidth;
				const btnFeature = document.querySelectorAll('.use-details .feature__btn')
				const featureLayer = document.querySelectorAll('.feature__btn + .feature__layer')
				const btnClose = document.querySelectorAll('.use-details .btn-wrap')
		
				btnFeature.forEach((item)=>{
					// if(winWidth >= 751) {
					//     item.addEventListener('mouseenter',function(){
					//         item.classList.add('is-active');
					//     })
					//     item.addEventListener('mouseout',function(){
					//         item.classList.remove('is-active');
					//     })
					// }
					if(winWidth < 751) {
						item.addEventListener('click',function(){
							item.classList.add('is-active');
						})
					}
				})
		
				btnClose.forEach((item, i) => {
					item.addEventListener("click", function(){
						btnFeature[i].classList.remove('is-active');
					})
				})
			}
		}
	}


	const mobileFullImg =  {
		build : () => {
			const fullImage = new Swiper('.type-popup--fullimage .select-list--image', {
				slidesPerView: 1,
				loop: true,
				direction: 'vertical',
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				observer: true,
				observeParents: true,
			});
			mobileFullImg.swiper = fullImage;
            
		},
		reloadSwiper : () => {
			if (mobileFullImg.swiper) {
				mobileFullImg.swiper.destroy();
			}
			mobileFullImg.build();
		},
		init : () => {
			mobileFullImg.reloadSwiper();
            const selectImages = document.querySelectorAll('.layer .select-list--image__box .select__image');
            selectImages.forEach((image) => {
                const targetImg = image.parentNode.querySelectorAll('.select__image');

                targetImg.forEach((el, index) => {
                    el.addEventListener('click', () => {
                        if (mobileFullImg.swiper) {
                            mobileFullImg.swiper.slideTo(index, 0);
                        }
                    });

                })
            });
		}
	}


	const popupContainerAll = {
		init:()=>{
			if(document.querySelectorAll('.popup-container.type-half').length){
				function scrollHorizonMoving(){
					const content = document.querySelector('.contents-compare');
					const scrollLeftButton = document.querySelector('.scrollLeftButton');
					const scrollRightButton = document.querySelector('.scrollRightButton');
					const containerTitleWrap = document.querySelector('.popup-container.type-half .title-wrap');
					const contentsCompareList = document.querySelector('.contents-compare-list');
					const contentsCompareOption2 = document.querySelector('.popup-container.type-half .contents-compare-list--option:nth-child(2) .select-list');
					const contentsCompareOption3 = document.querySelector('.popup-container.type-half .contents-compare-list--option:nth-child(3) .select-list');
					var lastScrollLeft = content.scrollLeft;
                    
					
					// 스크롤 왼쪽으로 이동하는 함수
					function scrollLeft() {
						window.scrollTo({ left: 0, behavior: 'smooth' });
						scrollLeftButton.classList.add('is-active'); 
						scrollRightButton.classList.remove('is-active');
					}
					
					// 스크롤 오른쪽으로 이동하는 함수
					function scrollRight() {
						window.scrollTo({ left: document.body.scrollWidth, behavior: 'smooth' });
						scrollRightButton.classList.add('is-active');
						scrollLeftButton.classList.remove('is-active');
					}
					
					scrollLeftButton.addEventListener('click', scrollLeft);
					scrollRightButton.addEventListener('click', scrollRight);

					content.addEventListener('scroll', () => {
						var currentScrollLeft = content.scrollLeft;
						if (currentScrollLeft > lastScrollLeft) {
							containerTitleWrap.scrollLeft = content.scrollLeft;
							contentsCompareList.scrollLeft = content.scrollLeft;
							scrollRightButton.classList.add('is-active');
							scrollLeftButton.classList.remove('is-active');
							contentsCompareOption2.classList.add('is-active');
							contentsCompareOption3.classList.add('is-active');
					
						} else if (currentScrollLeft < lastScrollLeft) {
							containerTitleWrap.scrollLeft = content.scrollLeft;
							contentsCompareList.scrollLeft = content.scrollLeft;
							scrollLeftButton.classList.add('is-active');
							scrollRightButton.classList.remove('is-active');
							contentsCompareOption2.classList.remove('is-active');
							contentsCompareOption3.classList.remove('is-active');
					
						}
						lastScrollLeft = currentScrollLeft;
					});
                    if(contentsCompareList) {
                        var compareListLeft = contentsCompareList.scrollLeft;
                        contentsCompareList.addEventListener('scroll',()=> {
                            var currentScrollLeft = contentsCompareList.scrollLeft;
                            if (currentScrollLeft > compareListLeft) {
                                containerTitleWrap.scrollLeft = content.scrollLeft;
                                content.scrollLeft = contentsCompareList.scrollLeft;
                                scrollRightButton.classList.add('is-active');
							    scrollLeftButton.classList.remove('is-active');
							    contentsCompareOption2.classList.add('is-active');
							    contentsCompareOption3.classList.add('is-active');
                        
                            } else if (currentScrollLeft < compareListLeft) {
                                containerTitleWrap.scrollLeft = content.scrollLeft;
                                content.scrollLeft = contentsCompareList.scrollLeft;
                                scrollLeftButton.classList.add('is-active');
							    scrollRightButton.classList.remove('is-active');
							    contentsCompareOption2.classList.remove('is-active');
							    contentsCompareOption3.classList.remove('is-active');
                        
                            }
                            compareListLeft = currentScrollLeft;
                        })
                    }


					if (document.querySelector('.popup-container.type-half.type1')) {
						let animationId;

						function scrollContentLeft() {
							cancelAnimationFrame(animationId);
							animateScrollLeft(-500); // 원하는 천천히 이동할 값으로 조정
							content.scrollTo({
							left: 0,
							behavior: 'smooth'
							});
						}
						function scrollContentRight() {
							cancelAnimationFrame(animationId);
							animateScrollLeft(500); // 원하는 천천히 이동할 값으로 조정
							content.scrollTo({
							left: content.scrollWidth,
							behavior: 'smooth'
							});
						}
						function animateScrollLeft(amount) {
							contentsCompareList.scrollLeft += amount;

							if (amount > 0 && contentsCompareList.scrollLeft < (contentsCompareList.scrollWidth - contentsCompareList.offsetWidth)) {
								animationId = requestAnimationFrame(() => animateScrollLeft(amount));
							} else if (amount < 0 && contentsCompareList.scrollLeft > 0) {
								animationId = requestAnimationFrame(() => animateScrollLeft(amount));
							}
						
							// console.log(content.scrollLeft);
						}
						scrollLeftButton.addEventListener('click', scrollContentLeft);
						scrollRightButton.addEventListener('click', scrollContentRight);
					}
					
					const scrollxBtn = document.querySelectorAll('.scroll-btn-wrap button');
					scrollxBtn.forEach((button) => {
						button.addEventListener('click', () => {
							button.classList.add('is-active');
							scrollxBtn.forEach((otherButton) => {
								if (otherButton !== button) {
									otherButton.classList.remove('is-active');
								}
							});
						});
					});
				}

				if(document.querySelector('.contents-compare.build')){
					const toggleBtn = document.querySelectorAll('input[name=switch03]');
					const selectList = document.querySelectorAll('.contents-compare__item');
					const selectListImgFir = document.querySelectorAll('.contents-compare__item img:first-child');
					const selectListImgLast = document.querySelectorAll('.contents-compare__item img:last-child');
					
					selectListImgLast.forEach((el)=>{
						el.style.display = "none";
				})
		
				toggleBtn.forEach((el)=>{
					el.addEventListener('click',()=>{
						if(el.checked){
							selectList.forEach((el)=>{
								selectListImgFir.forEach((el)=>{
									el.style.display = 'none'
								})
								selectListImgLast.forEach((el)=>{
									el.style.display = 'block'
								})
								
							})
						}else{
							selectList.forEach((el)=>{
								selectListImgFir.forEach((el)=>{
									el.style.display = 'block'
								})
								selectListImgLast.forEach((el)=>{
									el.style.display = 'none'
								})
								
							})
						}
					})
				})
				}
				
				const popupTypeHalf = document.querySelector('.popup-container.type-half');
				const openBtns = document.querySelectorAll('.btn__compare--type02, .btn__compare--type01');
				const popupTypeHalfClose = document.querySelector('.popup-container.type-half .btn__close');
				const dimm = document.querySelector('.dimm');
				const body = document.querySelector('body');
				const contents = document.querySelector('.contents') ;
				const winW = window.innerWidth;
				const footer = document.querySelector('.footer-wrap');
				const type1 = document.querySelector('.popup-container.type-half.type1');
				const type2 = document.querySelector('.popup-container.type-half.type2');

				if (openBtns) {
					openBtns.forEach(function (openBtn) {
						if(!openBtn.classList.contains('is-unactive')){
							openBtn.addEventListener('click', function () {
								window.scrollTo(0,0);
								popupTypeHalf.classList.add('is-active');
								dimm.classList.add('is-active');
								if(footer){
									footer.style.display = 'none';
								}
								if(type1){
									body.style.overflow = 'hidden';

									const timer = setTimeout(() => {
										type1.scrollTop = 0;
									}, 600);
								}
							});
						}
					});
				}

				popupTypeHalfClose.addEventListener('click', () => {
					popupTypeHalf.classList.remove('is-active');
					dimm.classList.remove('is-active');
					popupTypeHalf.classList.remove('is-scrolling');
					popupTypeHalf.classList.remove('is-top');
					// const timer = setTimeout(() => {
					//     type1.scrollTop = 0;
					// }, 700);
					// window.scrollTo(0,0);

					body.style.removeProperty('position');
					
					if(footer){
						footer.style.removeProperty('display');
					}
					if(type1){
						body.style.removeProperty('overflow');
						// type1.style.overflowY = 'initial';
						// type1.style.height = 'auto';
						body.scrollTo(0,0);
					}
					// document.querySelector('.contents').style.position = 'initial';
				});
				
				if(type1){
					let isTopClassAdded = false;
					let isScrollingClassAdded = false;
					let topPos = 100;
					

					type1.addEventListener('scroll', function() {
						let scrollPos = type1.scrollTop || document.documentElement.scrollTop;
						// console.log(scrollPos)

						if (scrollPos >= 10 && !isTopClassAdded) {
							type1.classList.add('is-top');
							isTopClassAdded = true;
							isScrollingClassAdded = false;
						} else if (scrollPos >= 150 && !isScrollingClassAdded) {
							type1.classList.add('is-scrolling');
							isScrollingClassAdded = true;
							isTopClassAdded = false;
						} 
						if (scrollPos < 50 ) {
							type1.classList.remove('is-scrolling');
							isScrollingClassAdded = false;
						} 
						if (scrollPos <= 10) {
							type1.classList.remove('is-top');
							isTopClassAdded = false;
						}
					});

				}

				if(type2){
					let isTopClassAdded = false;
					let isScrollingClassAdded = false;
					window.addEventListener('scroll', function() {
						let scrollPos = window.scrollTop || document.documentElement.scrollTop;
						// console.log(scrollPos)

						if (scrollPos >= 100 && !isTopClassAdded) {
							type2.classList.add('is-top');
							isTopClassAdded = true;
							isScrollingClassAdded = false;
						} else if (scrollPos >= 150 && !isScrollingClassAdded) {
							type2.classList.add('is-scrolling');
							isScrollingClassAdded = true;
							isTopClassAdded = false;
						} 
						if (scrollPos <= 100 ) {
							type2.classList.remove('is-scrolling');
							isScrollingClassAdded = false;
						} 
						if (scrollPos <= 0 && isTopClassAdded) {
							type2.classList.remove('is-top');
							isTopClassAdded = false;
						}
					});

					const changeOption = type2.querySelectorAll('.additional-box .btn');
					const changeoptClose = document.querySelectorAll('.type-popup--additional .btn__layer-close');
					const changeoptConfirm = document.querySelectorAll('.type-popup--additional .btn--blue');

					changeOption.forEach(function(el) {
						el.addEventListener('click', function() {
							type2.style.overflow = 'hidden';
						});
					});
					changeoptClose.forEach(function(el) {
						el.addEventListener('click', function() {
							type2.style.removeProperty('overflow');
						});
					});
					changeoptConfirm.forEach(function(el) {
						el.addEventListener('click', function() {
							type2.style.removeProperty('overflow');
						});
					});
				}



				function scrollButtons(){
					const scrollLeftButton = document.querySelector('.scrollLeftButton');
					const scrollRightButton = document.querySelector('.scrollRightButton');

					function scrollLeft() {
						window.scrollTo({ left: 0, behavior: 'smooth' });
						scrollLeftButton.classList.add('is-active');
						scrollRightButton.classList.remove('is-active');
					}

					function scrollRight() {
						window.scrollTo({ left: document.body.scrollWidth, behavior: 'smooth' });
						scrollRightButton.classList.add('is-active');
						scrollLeftButton.classList.remove('is-active');
					}

					function handleScroll() {
						let scrollPosition = window.scrollX;
						let maxScrollLeft = document.documentElement.scrollWidth - window.innerWidth;

						if (scrollPosition === 0) {
							scrollLeftButton.classList.add('is-active');
							scrollRightButton.classList.remove('is-active');
						} 
						
						if (scrollPosition === maxScrollLeft) {
							scrollRightButton.classList.add('is-active');
							scrollLeftButton.classList.remove('is-active');
							if(scrollPosition === 0) {
								scrollLeftButton.classList.add('is-active');
								scrollRightButton.classList.remove('is-active');
							}
						}
					}

					window.addEventListener('scroll', handleScroll);

					handleScroll();

					scrollLeftButton.addEventListener('click', scrollLeft);
					scrollRightButton.addEventListener('click', scrollRight);   
				}

				scrollHorizonMoving();
				scrollButtons();
			}
		}
	}


	const yourBuild = {
		init:() => {
			const yourBuild = document.querySelector('.yourbuild-wrap')
			if(yourBuild) {
				const swiperYourBuild = new Swiper(".swiperYourBuild", {
					slidesPerView: 1,
					loop: true,
					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					},
					pagination: {
						el: '.swiper-pagination',
					},
				});
				let scrPos = 0;
				const yourBuildfixed = document.querySelector('.yourbuild__scroll-fixed.show-mobile')
				window.addEventListener('scroll',function(){
					scrPos = window.scrollY;
					if(scrPos>0){
						yourBuildfixed.classList.add('is-fixed');
					}
					else{
						yourBuildfixed.classList.remove('is-fixed');
					}
				});
				const bundleContents = document.querySelectorAll(".yourbuild-options .bundle__contents");
				bundleContents.forEach(function(bundle) {
					const choicePrice = bundle.querySelector(".choice__price");
					if (!choicePrice) {
						bundle.classList.add("no-price");
					}
				});
			}
		}
	}


	const progressbar = {
		progressbarType1: null,
		progressbarBottom: null,
		winWidth: null,
		progressbarIntv: null,
		isPaused: false,
		mobileSize : 60,
		pcSize : 100,

		init: function () {
			this.progressbarType1 = document.querySelector('.progressbar.progressbar--type01');
			this.progressbarBottom = document.querySelector('.progressbar__bottom');
			this.winWidth = window.innerWidth;
		
			if (this.progressbarType1) {
				this.progressbarIntv = setInterval(this.increaseProgress.bind(this), 100);
			}
		},

		increaseProgress: function () {
			this.progressbarBottom.style.backgroundColor = '#003778';
			if(!this.isPaused) {
				const currentWidth = parseFloat(this.progressbarBottom.style.width) || 0;
				if(this.winWidth < 751 && currentWidth >= this.mobileSize) {
					this.pause();
					return;
				}
				const newWidth = currentWidth + (this.winWidth < 751 ? (this.mobileSize / this.pcSize) : 1);
				if(newWidth <= 100) {
					this.progressbarBottom.style.width = `${newWidth}%`;
				}else{
					this.pause();
				}
			}
		},

		pause: function () {
			if(this.progressbarBottom) {
				this.isPaused = true;
			}
		},

		resume: function () {
			if(this.progressbarBottom) {
				this.isPaused = false;
			}
		},

		restart: function () {
			if(this.progressbarBottom) {
				this.progressbarBottom.style.width = '0%';
				this.progressbarBottom.style.transition = "none";
				setTimeout(()=>{
					this.progressbarBottom.style.transition = 'width 0.5s'
				},100)
				this.isPaused = false;
			}
		}
	};

	// 230823 : #1356 커서이미지 configurator, yourbuild js 추가
	const cursorFun = {
		init : () => {
			const yourbuildSw = document.querySelector('.yourbuild-wrap');
			const configuSw  = document.querySelector('.configurator-swiper');

			const cursorImage = document.querySelector('.cursor-image');
			const swiperButtonPrev = document.querySelector('.swiper-button-prev');
			const swiperButtonNext = document.querySelector('.swiper-button-next');
			const viewportWidth = window.innerWidth;
			const body = document.querySelector('body');
			const indicator = document.querySelector('.half-swiper-indicator');

			if(yourbuildSw || configuSw){
				const updateCursor = (e) => {
					
					const mouseX = e.clientX;
					const mouseY = e.clientY;
	
					cursorImage.style.left = `${mouseX}px`;
					cursorImage.style.top = `${mouseY}px`;
	
	
				};
				if(indicator){
					// cursorImage.style.display = 'block';
					swiperButtonPrev.addEventListener('mouseenter', () => {
						cursorImage.classList.add('is-leftactive');
						cursorImage.classList.remove('is-remove');

					});
		
					swiperButtonPrev.addEventListener('mouseleave', () => {
						cursorImage.classList.remove('is-leftactive')
						cursorImage.classList.add('is-remove');

					});
		
					swiperButtonNext.addEventListener('mouseenter', () => {
						cursorImage.classList.add('is-rightactive');
						cursorImage.classList.remove('is-remove');

					});
		
					swiperButtonNext.addEventListener('mouseleave', () => {
						cursorImage.classList.remove('is-rightactive')
						cursorImage.classList.add('is-remove');

					});
		
					swiperButtonPrev.addEventListener('click', () => {
						cursorImage.classList.add('is-clicked'); 
					
						setTimeout(() => {
							cursorImage.classList.remove('is-clicked');
						}, 200);
					});
					
					swiperButtonNext.addEventListener('click', () => {
						cursorImage.classList.add('is-clicked'); 
					
						setTimeout(() => {
							cursorImage.classList.remove('is-clicked');
						}, 200);
					});

					if(configuSw) {
						const confiOpt = document.querySelector('.configurator-options');
						confiOpt.addEventListener('mouseenter',()=>{
							cursorImage.classList.add('is-conremove');
						})
						confiOpt.addEventListener('mouseleave',()=>{
							cursorImage.classList.remove('is-conremove');
						})
					}
		
					if(viewportWidth > 751){
						body.addEventListener('mousemove', updateCursor);
						window.addEventListener('resize', updateCursor);
					}
				}
			}
		}
	}


	const configuratorSwiper = {
		init : () => {
			if(document.querySelectorAll('.configurator-wrap').length){
				const swiperConfiguratorOutsideThumbs = new Swiper(".swiperConfiguratorOutsideThumbs", {
					spaceBetween: 6,
					slidesPerView: 3,
					slidesPerGroup: 3,

					on: {
						activeIndexChange: function () {
							slideInx = this.realIndex;
						}
					},
				});

				const swiperConfiguratorOutside = new Swiper(".swiperConfiguratorOutside", {
					loop: true,

					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					},
					thumbs: {
						swiper: swiperConfiguratorOutsideThumbs,
					},
					pagination: {
						el: '.swiper-pagination',
						type: 'progressbar',
					},
					on: {
						activeIndexChange: function () {
							slideInx = this.realIndex;
						},
                        slideChange: function () {
                            document.querySelectorAll('.swiperConfiguratorOutside .swiper-slide img').forEach((el)=>{
                                el.classList.remove('is-active');
                            })
                        }
					},
				});

				const swiperConfiguratorOutsideHead = new Swiper(".swiperConfiguratorOutsideHead", {
					effect : 'fade',
					loop: true,
				});
				
				swiperConfiguratorOutside.controller.control = swiperConfiguratorOutsideHead;
				swiperConfiguratorOutsideHead.controller.control = swiperConfiguratorOutside;



				const interiorOption = document.querySelector('[data-popup=".interior"]');

				if(interiorOption) {
					interiorOption.addEventListener('click',(e)=>{
						// e.preventDefault();
						const slideToActivate = document.querySelector('.swiper-slide.interior');
						swiperConfiguratorOutside.slideTo(swiperConfiguratorOutside.getSlideIndex(slideToActivate));
					})
				}
			}
		}
	}


	const dimensionSwiper = {
		init : () => {
			if(document.querySelectorAll('.swiperDimensionMain').length){
				const swiperDimension = new Swiper(".swiperDimensionMain", {
					slidesPerView: 1,
					loop: true,
					draggable:true,
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					},
				});
			}
		}
	}


	const textLength = {
		init : () => {
			const carName = document.querySelectorAll('.car-info--name span');
            const yourbuildScrollText = document.querySelector('.scroll-fixed__item-name');
			if(carName){
				carName.forEach(el => {
					const text = el.textContent.trim();
					if (text.length > 11) {
						el.parentNode.classList.add('is-active');
					}
				});
			}
            if(yourbuildScrollText) {
                const winWidth = window.innerWidth;
                if(winWidth < 731) {
                    const text = yourbuildScrollText.textContent;
                    if(text.length > 11) {
                        yourbuildScrollText.classList.add('is-active');
                    }
                    else {
                        yourbuildScrollText.classList.remove('is-active');
                    }
                }
            }
		}
	}


	// 230822 : #1275 인트로 실행 함수 
	const introAni  = {
		configuratorWrap : null,
		intro : null,
		introImgFirst : null,
		// introImgsec : null,
		introTxt : null,
		configuratorMain : null,
		configuratorOpt : null,
		swiperIndicator : null,
		disclaimer : null,
		configuBtnWrap : null,
		headIntroImgFirst : null,
		conOption : null,
		headerLogo : null,
		headerLogo : null,
		headerExit : null,
		headerLang : null,
		winwidth : null,

		
		init : () => {
			if(document.querySelectorAll('.configurator-wrap').length){
				this.configuratorWrap = document.querySelector('.configurator-wrap');
				this.intro = document.querySelector('.configurator-intro');
				this.introImgFirst = document.querySelector('.configurator-intro__image.ani-first');
				this.introImgsec = document.querySelector('.configurator-intro__image.ani-sec');
				this.introTxt = document.querySelector('.configurator-intro__name');
				this.configuratorMain = document.querySelector('.configurator-wrap .configurator-main');
				this.configuratorOpt = document.querySelector('.configurator-wrap .configurator-options')
				this.swiperIndicator = document.querySelector('.configurator-swiper .swiper-indicator');
				this.disclaimer = document.querySelector('.configurator-main .configurator-disclaimer');
				this.configuBtnWrap = document.querySelector('.configurator-main .btn-option');
				this.headIntroImgFirst = document.querySelector('.options-head .configurator-intro__image.ani-first.show-mobile');
				this.conOption = document.querySelector('.configurator-options.configurator-inner');

				this.headerLogo = document.querySelector('.header--configurator .header-logo');
				this.headerExit = document.querySelector('.header--configurator .exit-wrap');
				this.headerLang = document.querySelector('.header--configurator .lang-wrap');
				this.windWidth = window.innerWidth;
				

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
				function headerAnimSet(target,sec,remove){
					if(remove){
						const time = setTimeout(()=>{
							target.classList.remove('is-expose');
						},sec);
					}
					else{
						const time = setTimeout(()=>{
							target.classList.add('is-expose');
						},sec);
					}
				}

				aniTimerSet(this.configuratorMain,0,0);
				aniTimerSet(this.configuratorOpt,0,0);
				aniTimerSet(this.disclaimer,0,0);
				aniTimerSet(this.configuBtnWrap,0,0);
				aniTimerSet(this.swiperIndicator,0,0);
				// aniTimerSet(this.conOption,0,0);
				aniTimerSet(this.intro,0,0);
				aniTimerSet(this.introTxt,0,1);

				aniTimerSet(this.headerLogo,0,0);
				headerAnimSet(this.headerExit,0,0);
				headerAnimSet(this.headerLang,0,0);

				if (this.windWidth < 751) {
					if(this.headIntroImgFirst) {
						this.headIntroImgFirst.classList.add('is-active');
					}
					aniTimerSet(this.configuratorMain,0,0);
					aniTimerSet(this.configuratorOpt,0,0);
					aniTimerSet(this.intro,0,0);
					aniTimerSet(this.configuratorMain,0,0);
					aniTimerSet(this.configuBtnWrap,0,0);
					aniTimerSet(this.configuratorWrap,0,0);
					aniTimerSet(this.introImgFirst,0,0);
					aniTimerSet(this.introTxt,0,0);
				}

				

			}
		},

		play : () =>{
			if(this.intro) {
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
				function headerAnimSet(target,sec,remove){
						if(remove){
						const time = setTimeout(()=>{
							target.classList.remove('is-expose');
						},sec);
					}
					else{
						const time = setTimeout(()=>{
							target.classList.add('is-expose');
						},sec);
					}
				}
				const firstStep = setTimeout(()=> {
					this.introImgFirst.style.opacity = 1;
					this.configuratorMain.classList.remove('is-active');
					this.configuratorOpt.classList.remove('is-active');
					this.disclaimer.classList.remove('is-active');
					this.configuBtnWrap.classList.remove('is-active');
					this.swiperIndicator.classList.remove('is-active') ;
					this.configuratorWrap.classList.remove('is-active');
					this.intro.classList.add('is-active');
					this.introTxt.classList.remove('is-active');
					this.introImgsec.classList.remove('is-active');
					this.introTxt.classList.add('is-text');

					this.headerLogo.classList.remove('is-active');
					this.headerExit.classList.remove('is-expose');
					this.headerLang.classList.remove('is-expose');

				},0);
				
				const secStop = setTimeout(()=>{
					let a = 3000;
					let b = 2000;
					let c = 1500;
					let d = 1000;
					let e = 0;
	
					aniTimerSet(this.configuratorMain,a,0);
					aniTimerSet(this.configuratorOpt,a,0);
					aniTimerSet(this.configuratorWrap,b,0);
					aniTimerSet(this.intro,b,0);
					aniTimerSet(this.swiperIndicator,a,0);
					aniTimerSet(this.disclaimer,a,0);
					aniTimerSet(this.configuBtnWrap,a,0);
					aniTimerSet(this.introTxt,d,0);
					aniTimerSet(this.introImgFirst,e,0);
					aniTimerSet(this.introImgsec,b,0);

					aniTimerSet(this.headerLogo,b,0);

					headerAnimSet(this.headerExit,a,0);
					headerAnimSet(this.headerLang,a,0);
	
					if (this.windWidth < 751) {
						const firstStep = setTimeout(()=> {
							this.headIntroImgFirst.classList.remove('is-active');
		
						},0);

						a = 3000;
						b = 2000;
						c = 1500;
						d = 1000;
						if(this.headIntroImgFirst) {
							aniTimerSet(this.headIntroImgFirst,c,0);
						}
						aniTimerSet(this.configuratorMain,a,0);
						aniTimerSet(this.configuratorOpt,a,0);
						aniTimerSet(this.intro,a,0);
						aniTimerSet(this.configuratorMain,b,0);
						aniTimerSet(this.configuBtnWrap,0,0);
						aniTimerSet(this.configuratorWrap,0,0);
						aniTimerSet(this.introImgFirst,0,0);
						aniTimerSet(this.introTxt,c,0);
					}
				},)

				const thirStep = setTimeout(()=> {
					aniTimerSet(this.intro,0,1);

				},6000);

				
			}
		},

		remove : () => {
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

			aniTimerSet(this.configuratorMain,0,0);
			aniTimerSet(this.disclaimer,0,0);
			aniTimerSet(this.configuBtnWrap,0,0);
			aniTimerSet(this.swiperIndicator,0,0);
			aniTimerSet(this.introTxt,0,1);
			aniTimerSet(this.intro,0,1);
			aniTimerSet(this.introImgFirst,0,1)
			aniTimerSet(this.introImgsec,0,1)
			aniTimerSet(this.configuratorOpt,0,0);

			let a = 3000;
			let b = 2000;
			let c = 1500;
			let d = 1000;

		}
	}


	window.addEventListener('DOMContentLoaded', () => {
		popup.init();
		button.init();
		select.init();
		accordian.init();
		accordianfooter.init();
		tab.init();
		commonUI();
		introAni.init();
		allModels.init();
	});
	
	window.addEventListener('load', () => {
		// html include 함수 넣고싶은곳에 넣으면 된다
		// <header id="header"></header>
		// <footer id="footer"></footer>
		// includeType("header");
		// includeType("footer");

		configurator.init();
		featureLayer.init();
		// configuratorSwiper.init();
		cursorFun.init();
		popupContainerAll.init();
		yourBuild.init();
		progressbar.init();
		textLength.init();
	});
	


	// [D] 전역 변수, 동적 생성시 함수 호출
	// window.hyundai.CC.popup.closeModal('.popup02');
	// window.hyundai.CC.popup.openModal(document.querySelector('.test1'));
	// onclick="window.hyundai.CC.popup.openModal(document.querySelector('.popup02'));"
	window.hyundai.CC.select = {
		init : select.init, 
	}


	// 실행함수
	// window.hyundai.CC.progressbar.pause();   일시정지
	// window.hyundai.CC.progressbar.resume();  플레이
	// window.hyundai.CC.progressbar.restart(); 다시 처음부터 시작
	// window.hyundai.CC.progressbar.speed = 1; (기본값) 
	window.hyundai.CC.progressbar = progressbar;


	window.hyundai.CC.configuratorSwiper = configuratorSwiper;
	// build : configuratorSwiper.build,
	// init : configuratorSwiper.init, 

	window.hyundai.CC.dimensionSwiper = dimensionSwiper;
	window.hyundai.CC.mobileFullImg = mobileFullImg;

	// 230823 : #1356 동적 할당 함수 추가 
	window.hyundai.CC.cursorFun = {
		init : cursorFun.init,
	}


	window.hyundai.CC.featureLayer = {
		init : featureLayer.init, 
	}


	window.hyundai.CC.textLength = {
		init : textLength.init, 
	}


	// 230822 : #1275 [D] 인트로 실행 함수 
	// window.hyundai.CC.introAni.play(); : 인트로 실행 함수
	// window.hyundai.CC.introAni.remove(); : 바로 Configurator 페이지로 이동용 
	// 처음 화면은 인트로 없이 설정해놨음
	window.hyundai.CC.introAni = introAni;


	// 230818 : #1218 [D] 전역 변수, 동적 생성시 함수 호출
	window.hyundai.CC.tab = {
		init : tab.init,
	}


	const originalInit = accordian.init;
	window.hyundai.CC.accordian = {
		init: function() {
			setTimeout(function() {
				originalInit();
			}, 100); 
		}
	};

	window.hyundai.CC.accordianfooter = {
		init: function() {
			setTimeout(function() {
				originalInit();
			}, 100); 
		}
	};
	
	window.hyundai.CC.popup = {
		openModal,
		closeModal,
	};
})();