/**
 * jQuery.squareCrop - crop and resize images on browser
 * Written by Alexey Tayanchin (RedSpirit)
 * Website: http://redspirit.ru
 * EMail: redspirit@live.ru
 * Date: 2013/09/05
 *
 * @author Alexey Tayanchin
 * @version 1.0
 *
 **/
(function($) {
$.fn.squareCrop = function(options) {
	var settings = $.extend( {
      'size' : 100,
	  'verticalOffset' : 5,
	  'wrapClass': 'squarecrop'
    }, options);
	
	function isImageLoaded(img) {
		if (!img.complete) return false;
		if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) return false;
		return true;
	}	
	
	this.each(function() {
		var img = $(this);
		var block = document.createElement('div');
		$(block).css({
			width: settings.size + 'px',
			height: settings.size + 'px',
			overflow: 'hidden',
			display: 'inline-block'
		}).addClass(settings.wrapClass);
		img.wrap(block);
		
		if(img.is('img')){
			img.on('load', function(){
				if(img.height() >= img.width()){
					img.css('width', settings.size + 'px');
					var calc = -Math.round((img.height() - settings.size) / settings.verticalOffset );
					img.css('marginTop', calc + 'px');
				} else {
					img.css('height', settings.size + 'px');
					var calc = -Math.round((img.width() - settings.size) / 2);
					img.css('marginLeft', calc + 'px');
				}
			});
			if(isImageLoaded(this)) {
				img.trigger('load');
			}
		}

	});
};

$.fn.imageCrop = function(options) {
	var settings = $.extend( {
		'left' : 0,
		'top' : 0,
		'right' : 0,
		'bottom' : 0,
		'width' : false,
		'height' : false,
		'wrapClass': 'imagecrop'
    }, options);
	
	function isImageLoaded(img) {
		if (!img.complete) return false;
		if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) return false;
		return true;
	}	
	
	this.each(function() {
		var img = $(this);
		var block = document.createElement('div');
		
		
		if(img.is('img')){
			img.on('load', function(){

				var img_w = img.width();
				var img_h = img.height();
				var asp_w = this.naturalWidth / img_w;
				var asp_h = this.naturalHeight / img_h;
				
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