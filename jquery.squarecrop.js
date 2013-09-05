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
})(jQuery);