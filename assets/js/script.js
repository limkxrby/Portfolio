


/********** Sticky Navbar ***********/
class StickyNavigation {
	
	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.tabContainerHeight = 70;
		let self = this;
		$('.et-hero-tab').click(function() { 
			self.onTabClick(event, $(this)); 
		});
		$(window).scroll(() => { this.onScroll(); });
		$(window).resize(() => { this.onResize(); });
	}
	
	onTabClick(event, element) {
		event.preventDefault();
		let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}
	
	onScroll() {
		this.checkTabContainerPosition();
    this.findCurrentTabSelector();
	}
	
	onResize() {
		if(this.currentId) {
			this.setSliderCss();
		}
	}
	
	checkTabContainerPosition() {
		let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
		if($(window).scrollTop() > offset) {
			$('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
		} 
		else {
			$('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
		}
	}
	
	findCurrentTabSelector(element) {
		let newCurrentId;
		let newCurrentTab;
		let self = this;
		$('.et-hero-tab').each(function() {
			let id = $(this).attr('href');
			let offsetTop = $(id).offset().top - self.tabContainerHeight;
			let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
			if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(this);
			}
		});
		if(this.currentId != newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}
	
	setSliderCss() {
		let width = 0;
		let left = 0;
		if(this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		$('.et-hero-tab-slider').css('width', width);
		$('.et-hero-tab-slider').css('left', left);
	}
	
}

new StickyNavigation();

/************ TYPING ANIMATION ************/

$(document).ready(() => {
	let typingElement = $('.typing');
  
	typingElement.on('click', (e) => {
	  typingElement.removeClass('animate');
	  setTimeout(() => typingElement.addClass('animate'), 1);
	})
  });


/************ DROP DOWN ************/

$(document).ready(function(){
  
  $('.drop-down').on('click', function(e){
    $(this).find('.hidden').slideToggle();
    $('.drop-down').not(this).find('.hidden').slideUp();
  });
});

/******** Frame ********/

$(".hover").mouseleave(
	function() {
	  $(this).removeClass("hover");
	}
  );


  /***********CONTACT ****** */

  // Initialize Firebase
var config = {
	apiKey: "AIzaSyD5bCyvYm5adElW2tllyfYH-CXnyQdUxVY",
	authDomain: "contactform-2086d.firebaseapp.com",
	databaseURL: "https://contactform-2086d.firebaseio.com",
	projectId: "contactform-2086d",
	storageBucket: "contactform-2086d.appspot.com",
	messagingSenderId: "35839015044"
  };
  firebase.initializeApp(config);
  
  // Reference messages collection
  var messagesRef = firebase.database().ref('messages');
  
  // Listen for form submit
  document.getElementById('contactForm').addEventListener('submit', submitForm);
  
  // Submit form
  function submitForm(e){
	e.preventDefault();
  
	//Get value
	var name = getInputVal('name');
	var email = getInputVal('email');
	var message = getInputVal('message');
  
	// Save message
	saveMessage(name, email, message);
  
	// Show alert
	document.querySelector('.alert').style.display = 'block';
  
	// Hide alert after 3 seconds
	setTimeout(function(){
	  document.querySelector('.alert').style.display = 'none';
	},3000);
  
	// Clear form
	document.getElementById('contactForm').reset();
  }
  
  // Function to get form value
  function getInputVal(id){
	return document.getElementById(id).value;
  }
  
  // Save message to firebase
  function saveMessage(name, email, message){
	var newMessageRef = messagesRef.push();
	newMessageRef.set({
	  name: name,
	  email: email,
	  message: message
	});
  }