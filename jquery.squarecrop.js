/**
 * jQuery.squareCrop - crop and resize images on browser
 * Written by Alexey Tayanchin (RedSpirit)
 * Website: http://redspirit.ru
 * EMail: redspirit@live.ru
 * Date: 2013/09/09
 *
 * @author Alexey Tayanchin
 * @version 1.0
 *
 **/
(function($) {
$.fn.imageCrop = function(options) {
	var settings = $.extend( {
      'width' : 100,
      'height' : 100,
	  'verticalOffset' : 2,
	  'circle':false,
	  'wrapClass': 'image-crop'
    }, options);
	
	function isImageLoaded(img) {
		if (!img.complete) return false;
		if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) return false;
		return true;
	}	
	
	this.each(function() {
		var loaded_flag = false;
		var img = $(this);
		var block = document.createElement('div');
		$(block).css({
			width: settings.width + 'px',
			height: settings.height + 'px',
			overflow: 'hidden',
			display: 'inline-block'
		}).addClass(settings.wrapClass);
		img.wrap(block);
		
		if(img.is('img')){
			img.on('load', function(){
				if(loaded_flag) return;
				loaded_flag = true;			
				if(img.height() >= settings.height){
					img.css('width', settings.width + 'px');
					var calc = -Math.round((img.height() - settings.height) / settings.verticalOffset );
					img.css('marginTop', calc + 'px');
				} else {
					img.css('height', settings.height + 'px');
					var calc = -Math.round((img.width() - settings.width) / 2);
					img.css('marginLeft', calc + 'px');
				}
			});
			if(isImageLoaded(this)) {
				img.trigger('load');
			}
		}

	});
};

$.fn.paddingCrop = function(options) {
	var settings = $.extend( {
		'left' : 0,
		'top' : 0,
		'right' : 0,
		'bottom' : 0,
		'wrapClass': 'padding-crop'
    }, options);
	
	
	
	function isImageLoaded(img) {
		if (!img.complete) return false;
		if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) return false;
		return true;
	}	
	
	this.each(function() {
		var img = $(this);
		var block = document.createElement('div');
		var loaded_flag = false;
		
		if(img.is('img')){
			img.on('load', function(){
				if(loaded_flag) return;
				loaded_flag = true;

				var img_w = img.width();
				var img_h = img.height();
				var asp_w = this.naturalWidth / img_w;
				var asp_h = this.naturalHeight / img_h;
				
				console.log('load');
				
				// do not work in IE < 9
				// todo use http://www.jacklmoore.com/notes/naturalwidth-and-naturalheight-in-ie/
				var cont_w = img_w - Math.round((settings.left + settings.right) / asp_w);
				var cont_h = img_h - Math.round((settings.top + settings.bottom) / asp_h);
													
				$(block).css({
					width: cont_w + 'px',
					height: cont_h + 'px',
					overflow: 'hidden',
					display: 'inline-block'
				}).addClass(settings.wrapClass);
				img.wrap(block);
			
				img.css({
					'marginLeft': -Math.round(settings.left / asp_w),
					'marginTop': -Math.round(settings.top / asp_h)
				});

			});
			if(isImageLoaded(this)) {
				img.trigger('load');
			}
		}

	});
};

})(jQuery);