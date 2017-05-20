;+function($){
	$.event.special.open = {
		delegateType : 'click',
		bindType : 'click',
		handle : function(e){
			var data = $(this).data('ag.navigation');
			if(data.opened)
				return false;
			return e.handleObj.handler.apply(this, arguments);
		}
	};

	$.event.special.defaultLink = {
		delegateType : 'click',
		bindType : 'click',
		handle : function(e){
			return e.handleObj.handler.apply(this, arguments);
		}
	};

	$.event.special.resizeMenu = {
		delegateType : 'resize',
		bindType : 'resize',
		handle : function(e){
			return e.handleObj.handler.apply(this, arguments);
		}
	};
}(jQuery);

+function($){
	var Navigate = function(element, options){
		this.$elem = $(element);
		this.options = options;
		this.screen = 0;
		this.open = false;
		this.close = false;
		this.opened = false;
		this.closed = false;
	};

	Navigate.VERSION = '1.0.0';
	Navigate.DEFAULTS = {
		container : '.wrap-navigation',
		width : 0,
		height : 0,
		step : 10,
		onResize : function(){}
	};

	Navigate.prototype.init = function(){
		this.fullWidth();
		this.wrapper();
		this.setSizeHeader();
		this.setBodyWidth();
		this.transition();
	};

	Navigate.prototype.fullWidth = function(){
		this.screen = document.body.clientWidth;
	};

	Navigate.prototype.wrapper = function(){
		if(!$(this.options.container).is(':has(".wrap")')){
			$(this.options.container).children().not('.top-shadow').wrapAll('<div class="wrap">');	
		}

		$(this.options.container)
			.find('.wrap')
			.width(this.screen);
	};

	Navigate.prototype.setSizeHeader = function(){
		if(this.options.width)
			this.$elem.width(this.options.width);
		if(this.options.height)
			this.$elem.height(this.options.height);
	};

	Navigate.prototype.getHeaderWidth = function(){
		return this.$elem.parent().width();
	};

	Navigate.prototype.calculateWidth = function(){
		return this.screen - this.getHeaderWidth() - this.options.step;
	};

	Navigate.prototype.setBodyWidth = function(){
		var width = this.calculateWidth(),
			body = this.$elem.parent().next();
		body.width(width);
	};

	Navigate.prototype.openContent = function(){
		this.opened = true;
		$(this.options.container).width(this.screen);
		$(this.options.container).addClass('open-x');
		this.active();
		this.showContent();
	};

	Navigate.prototype.active = function(){
		var childs = this.$elem.children('li');
		childs.removeClass('active');
		(this.target.is('a') ? this.target.parent().addClass('active') : this.target.addClass('active'));
	};

	Navigate.prototype.changeContent = function(){
		this.active();
		this.showContent();
	};

	Navigate.prototype.showContent = function(){
		var href = this.target.is('a') ? this.target.attr('href') : this.target.children().attr('href');
		var content = $(href);
		content.parent().children().removeClass('show');
		content.parent().children().addClass('hide');
		content.removeClass('hide').addClass('show');
	};

	Navigate.prototype.transition = function(){
		var that = this;
		$(this.options.container).on('transitionend oTransitionEnd webkitTransitionEnd', function(){
			var elem = $(that.options.container),
				curHeight = elem.height(),
				maxHeight = elem.find('.nav-body').height() + 10;
			if(curHeight < maxHeight){
				elem.removeClass('open-x')
					.height(maxHeight)
					.addClass('open-y');
			}else{
				elem.removeClass('open-y');
				that.opened = false;
				that.open = true;
			}
		});
	};

	Navigate.prototype.resize = function(){
		this.init();
		if(this.open)
			$(this.options.container).width(this.screen);
		this.options.onResize();
	};

	var Plugin = function(options){
		return this.each(function(){
			$this = $(this),
				data = $this.data('ag.navigation'),
				options = $.extend({}, Navigate.DEFAULTS, $this.data(), (options || {}));
			if(!data){
				$this.data('ag.navigation', (data = new Navigate(this, options)));
			}

			if(!data.action){
				data.init();
				return;
			}

			var action = data.action;
			data[action]();
		});
	};

	$.fn.navigate = Plugin;
	$.fn.navigate.Constructor = Navigate;

	var clickHandler = function(e){
		var data = $(this).data('ag.navigation');
		data.target = $(e.target);
		if(!data.open){
			data.action = 'openContent';
		}else{
			data.action = 'changeContent';
		}

		Plugin.call($(this));
	};

	var handler = function(e){
		e.preventDefault();
	};

	var resizeHandler = function(e){
		var data = $('ul.navigation').data('ag.navigation');
		data.action = 'resize';
		Plugin.call($('ul.navigation'));
	};

	$(document).on('open', '.navigation', clickHandler);
	$(document).on('defaultLink', 'a.default', handler);
	$(window).on('resizeMenu', resizeHandler);
}(jQuery);