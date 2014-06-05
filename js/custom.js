 
$(document).ready(function(e) {
	
	function mobile_device(){
		var current_width = $(window).width();
		if(current_width < 480){
		  	jQuery('body').addClass("probably-mobile");
		}
		else
		{
			 jQuery('body').removeClass("probably-mobile");
		}
	}
	
	mobile_device();
	
	$(window).resize(function(){
		mobile_device();
	});
	
	/*-----------------------------------------------------------------------------------*/
	/*	Flex Slider 
	/*-----------------------------------------------------------------------------------*/
		$('.flexslider').flexslider({
							animation: "fade",
							slideshowSpeed: 7000,
							animationSpeed:	1500,
							directionNav: true,
							controlNav: false,			
							keyboardNav: true				
						});
	
		$('.slider-wrapper').hover(function(){
										var mobile = $('body').hasClass('probably-mobile');
										if(!mobile)
										{
											$('.flex-direction-nav').stop(true,true).fadeIn('slow');
										}
									},function(){
										$('.flex-direction-nav').stop(true,true).fadeOut('slow');
									});
	
		
	/*-----------------------------------------------------------------------------------*/
	/*	Carousel Elastislide
	/*-----------------------------------------------------------------------------------*/
		$('#carousel').elastislide({
					imageW		: 89,				
					minItems	: 0,
					margin		: 11,
					border		: 0
				});
				
				
		
	/*-----------------------------------------------------------------------------------*/
	/*	Cross Browser CSS Fixes
	/*-----------------------------------------------------------------------------------*/	
		$('#header ul li:last-child a').css('background','none'); 
		$('#header ul > li > ul > li:last-child').css('border-bottom','none');	

		
	/*-----------------------------------------------------------------------------------*/
	/*	Responsive Nav
	/*-----------------------------------------------------------------------------------*/	
		var $mainNav    = $('.main-menu').children('ul');
		var optionsList = '<option value="" selected>MENU</option>';
	
		$mainNav.find('li').each(function() {
			var $this   = $(this),
				$anchor = $this.children('a'),
				depth   = $this.parents('ul').length - 1,
				indent  = '';		
			if( depth ) {
				while( depth > 0 ) {
					indent += ' - ';
					depth--;
				}
			}
			optionsList += '<option value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';
		}).end().last()
		  .after('<select class="responsive-nav">' + optionsList + '</select>');
	
		$('.responsive-nav').on('change', function() {
				window.location = $(this).val();
		});
		
	/*-----------------------------------------------------------------------------------*/
	/*	Responsive Nav
	/*-----------------------------------------------------------------------------------*/	
		var $mainNav    = $('#footer-menu').children('ul');
		var optionsList = '<option value="" selected>Go to...</option>';
	
		$mainNav.find('li').each(function() {
			var $this   = $(this),
				$anchor = $this.children('a'),
				depth   = $this.parents('ul').length - 1,
				indent  = '';		
			if( depth ) {
				while( depth > 0 ) {
					indent += ' - ';
					depth--;
				}
			}
			optionsList += '<option value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';
		}).end()
		  .after('<select class="responsive-nav">' + optionsList + '</select>');
	
		$('.responsive-nav').on('change', function() {
				window.location = $(this).val();
		});
		
		
	/*----------------------------------------------------------------------------------*/
	/*	Contact Form AJAX validation and submition
	/*  Validation Plugin : http://bassistance.de/jquery-plugins/jquery-plugin-validation/
	/*	Form Ajax Plugin : http://www.malsup.com/jquery/form/		
	/*---------------------------------------------------------------------------------- */	 
		var contact_options = { 
							target: '#message-sent',
							beforeSubmit: function(){
													$('#contact-loader').fadeIn('fast');
													$('#message-sent').fadeOut('fast');
											}, 
							success: function(responseText, statusText, xhr, $form){
												$('#contact-loader').fadeOut('fast');
												$('#message-sent').fadeIn('fast');
												
												if( responseText == "Wrong Code!" )
												{
													// wrong code
												}
												else if( responseText == "Message Sent Successfully!" )
												{														
													$('.contact-form').resetForm();
												}
												
											}
			}; 
	
		$('.contact-form').validate({
			errorLabelContainer: $("div.error-container"),
			submitHandler: function(form) {
				$(form).ajaxSubmit(contact_options);
		   }
		});	
		
	
	
	
	
	/*-----------------------------------------------------------------------------------*/
	/* Menu Dropdown Control
	/*-----------------------------------------------------------------------------------*/
		$('#header nav ul li').hover(function(){
				$(this).children('ul').stop(true, true).slideDown(500);
			},function(){
				$(this).children('ul').stop(true, true).slideUp(500);
		}); 
		
		$('nav ul li ul li').click(function(e){
					window.location = $(this).children('a').attr('href');
			});
	
	
	/*-----------------------------------------------------------------------------------*/
	/* Pretty Photo
	/*-----------------------------------------------------------------------------------*/
		if( jQuery().prettyPhoto ){
			$(".pretty-photo").prettyPhoto({
				deeplinking: false,
				social_tools: false
			});
		}
		
	
	/* ---------------------------------------------------- */
	/*	Accordion
	/* ---------------------------------------------------- */						
		$('.accordion dt').click(function(){
			$('.accordion dt').removeClass('current');
			$(this).addClass('current').next().slideDown(500).siblings('.accordion dd').slideUp(500);			
		});	
					
		 
	/* ---------------------------------------------------- */
	/*	Select Box
	/* ---------------------------------------------------- */	 
		$( "#date" ).datepicker();
		
		
	/* ---------------------------------------------------- */
	/*	FAQ
	/* ---------------------------------------------------- */	
		$('dl.toggle dt').click(function(){		
			
			if($(this).hasClass('current'))
			{					
				$(this).removeClass('current').next().slideUp(500);
			}				
			else
			{					
				$(this).addClass('current').next().slideDown(500);
			}
			
			
		});	 
		
		
	/* ---------------------------------------------------- */
	/*	Content Tabs
	/* ---------------------------------------------------- */
		(function(){
	
			var $tabsNav    = $('.tabs-nav'),
				$tabsNavLis = $tabsNav.children('li');
	
			$tabsNav.each(function(){
				var $this = $(this);
				$this.next().children('.tab-content').stop(true,true).hide()
													 .first().show();
				$this.children('li').first().addClass('active').stop(true,true).show();
			});
	
			$tabsNavLis.on('click', function(e) {
				var $this = $(this);
				$this.siblings().removeClass('active').end()
					 .addClass('active');
				var idx = $this.parent().children().index($this);			
				$this.parent().next().children('.tab-content').stop(true,true).hide().eq(idx).fadeIn();
				e.preventDefault();
			});
			
		})();
		
	 /*---------------------------------------------------- 
		  Responsive Tables by ZURB
		  Foundation v2.1.4 http://foundation.zurb.com  
	   ----------------------------------------------------*/			
	  var switched = false;
	  var updateTables = function() {
		if (($(window).width() < 767) && !switched ){
		  switched = true;
		  $("table.responsive").each(function(i, element) {
			splitTable($(element));
		  });
		  return true;
		}
		else if (switched && ($(window).width() > 767)) {
		  switched = false;
		  $("table.responsive").each(function(i, element) {
			unsplitTable($(element));
		  });
		}
	  };
	   
	  $(window).load(updateTables);
	  $(window).bind("resize", updateTables);
	   
		
		function splitTable(original)
		{
			original.wrap("<div class='table-wrapper' />");
			
			var copy = original.clone();
			copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
			copy.removeClass("responsive");
			
			original.closest(".table-wrapper").append(copy);
			copy.wrap("<div class='pinned' />");
			original.wrap("<div class='scrollable' />");
		}
		
		function unsplitTable(original) {
		original.closest(".table-wrapper").find(".pinned").remove();
		original.unwrap();
		original.unwrap();
		}

		
});







