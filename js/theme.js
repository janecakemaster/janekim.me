(function (a, b, c) {
  var d = b.event, e;
  d.special.smartresize = {
    setup: function () {
      b(this).bind("resize", d.special.smartresize.handler)
    },
    teardown: function () {
      b(this).unbind("resize", d.special.smartresize.handler)
    },
    handler: function (a, b) {
      var c = this, 
      d = arguments;
      a.type = "smartresize", e && clearTimeout(e), e = setTimeout(function () {
        jQuery.event.handle.apply(c, d)
      }, b === "execAsap" ? 0 : 100)
    }
  }, b.fn.smartresize = function (a) {
    return a ? this.bind("smartresize", a) : this.trigger("smartresize", ["execAsap"])
  }, b.Mason = function (a, c) {
    this.element = b(c), this._create(a), this._init()
  };
  var f = ["position", "height"];
  b.Mason.settings = {
    isResizable: !0,
    isAnimated: !1,
    animationOptions: {
      queue: !1,
      duration: 500
    },
    gutterWidth: 0,
    isRTL: !1,
    isFitWidth: !1
  }, b.Mason.prototype = {
    _filterFindBricks: function (a) {
      var b = this.options.itemSelector;
      return b ? a.filter(b).add(a.find(b)) : a
    },
    _getBricks: function (a) {
      var b = this._filterFindBricks(a).css({
        position: "absolute"
      }).addClass("masonry-brick");
      return b
    },
    _create: function (c) {
      this.options = b.extend(!0, {}, b.Mason.settings, c), this.styleQueue = [], this.reloadItems();
      var d = this.element[0].style;
      this.originalStyle = {};
      for (var e = 0, g = f.length; e < g; e++) {
        var h = f[e];
        this.originalStyle[h] = d[h] || ""
      }
      this.element.css({
        position: "relative"}), 
      this.horizontalDirection = this.options.isRTL ? "right" : "left", 
      this.offset = {};
      var i = b(document.createElement("div"));
      this.element.prepend(i), this.offset.y = Math.round(i.position().top), this.options.isRTL ? (i.css({
                "float": "right",
                display: "inline-block"
            }), this.offset.x = Math.round(this.element.outerWidth() - i.position().left)) : this.offset.x = Math.round(i.position().left), i.remove();
            var j = this;
            setTimeout(function () {
                j.element.addClass("masonry")
            }, 0), this.options.isResizable && b(a).bind("smartresize.masonry", function () {
                j.resize()
            })
        },
        _init: function (a) {
            this._getColumns("masonry"), this._reLayout(a)
        },
        option: function (a, c) {
            b.isPlainObject(a) && (this.options = b.extend(!0, this.options, a))
        },
        layout: function (a, c) {
            var d, e, f, g, h, i;
            for (var j = 0, k = a.length; j < k; j++) {
                d = b(a[j]), e = Math.ceil(d.outerWidth(!0) / this.columnWidth), e = Math.min(e, this.cols);
                if (e === 1) this._placeBrick(d, this.colYs);
                else {
                    f = this.cols + 1 - e, g = [];
                    for (i = 0; i < f; i++) h = this.colYs.slice(i, i + e), g[i] = Math.max.apply(Math, h);
                    this._placeBrick(d, g)
                }
            }
            var l = {};
            l.height = Math.max.apply(Math, this.colYs) - this.offset.y, this.options.isFitWidth && (l.width = this.cols * this.columnWidth - this.options.gutterWidth), this.styleQueue.push({
                $el: this.element,
                style: l
            });
            var m = this.isLaidOut ? this.options.isAnimated ? "animate" : "css" : "css",
                n = this.options.animationOptions,
                o;
            for (j = 0, k = this.styleQueue.length; j < k; j++) o = this.styleQueue[j], o.$el[m](o.style, n);
            this.styleQueue = [], c && c.call(a), this.isLaidOut = !0
        },
        _getColumns: function () {
            var a = this.options.isFitWidth ? this.element.parent() : this.element,
                b = a.width();
            this.columnWidth = this.options.columnWidth || this.$bricks.outerWidth(!0) || b, this.columnWidth += this.options.gutterWidth, this.cols = Math.floor((b + this.options.gutterWidth) / this.columnWidth), this.cols = Math.max(this.cols, 1)
        },
        _placeBrick: function (a, b) {
            var c = Math.min.apply(Math, b),
                d = 0;
            for (var e = 0, f = b.length; e < f; e++) if (b[e] === c) {
                d = e;
                break
            }
            var g = {
                top: c
            };
            g[this.horizontalDirection] = this.columnWidth * d + this.offset.x, this.styleQueue.push({
                $el: a,
                style: g
            });
            var h = c + a.outerHeight(!0),
                i = this.cols + 1 - f;
            for (e = 0; e < i; e++) this.colYs[d + e] = h
        },
        resize: function () {
            var a = this.cols;
            this._getColumns("masonry"), this.cols !== a && this._reLayout()
        },
        _reLayout: function (a) {
            var b = this.cols;
            this.colYs = [];
            while (b--) this.colYs.push(this.offset.y);
            this.layout(this.$bricks, a)
        },
        reloadItems: function () {
            this.$bricks = this._getBricks(this.element.children())
        },
        reload: function (a) {
            this.reloadItems(), this._init(a)
        },
        appended: function (a, b, c) {
            if (b) {
                this._filterFindBricks(a).css({
                    top: this.element.height()
                });
                var d = this;
                setTimeout(function () {
                    d._appended(a, c)
                }, 1)
            } else this._appended(a, c)
        },
        _appended: function (a, b) {
            var c = this._getBricks(a);
            this.$bricks = this.$bricks.add(c), this.layout(c, b)
        },
        remove: function (a) {
            this.$bricks = this.$bricks.not(a), a.remove()
        },
        destroy: function () {
            this.$bricks.removeClass("masonry-brick").each(function () {
                this.style.position = "", this.style.top = "", this.style.left = ""
            });
            var c = this.element[0].style;
            for (var d = 0, e = f.length; d < e; d++) {
                var g = f[d];
                c[g] = this.originalStyle[g]
            }
            this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"), b(a).unbind(".masonry")
        }
    }, b.fn.imagesLoaded = function (a) {
        function h() {
            --d <= 0 && this.src !== f && (setTimeout(g), b.unbind("load error", h))
        }
        function g() {
            a.call(e, b)
        }
        var b = this.find("img"),
            d = b.length,
            e = this,
            f = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        d || g(), b.bind("load error", h).each(function () {
            if (this.complete || this.complete === c) {
                var a = this.src;
                this.src = f, this.src = a
            }
        });
        return this
    };
    var g = function (a) {
        this.console && console.error(a)
    };
    b.fn.masonry = function (a) {
        if (typeof a == "string") {
            var c = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                var d = b.data(this, "masonry");
                if (!d) g("cannot call methods on masonry prior to initialization; attempted to call method '" + a + "'");
                else {
                    if (!b.isFunction(d[a]) || a.charAt(0) === "_") {
                        g("no such method '" + a + "' for masonry instance");
                        return
                    }
                    d[a].apply(d, c)
                }
            })
        } else this.each(function () {
            var c = b.data(this, "masonry");
            c ? (c.option(a || {}), c._init()) : b.data(this, "masonry", new b.Mason(a, this))
        });
        return this
    }
})(window, jQuery);
(function (window, $, undefined) {
    $.infinitescroll = function infscr(options, callback, element) {
        this.element = $(element);
        this._create(options, callback);
    };
    $.infinitescroll.defaults = {
        loading: {
            finished: undefined,
            finishedMsg: "",
            img: "",
            msg: null,
            msgText: "",
            selector: null,
            speed: 'fast',
            start: undefined
        },
        state: {
            isDuringAjax: false,
            isInvalidPage: false,
            isDestroyed: false,
            isDone: false,
            isPaused: false,
            currPage: 1
        },
        callback: undefined,
        debug: false,
        behavior: undefined,
        binder: $(window),
        nextSelector: "div.navigation a:first",
        navSelector: "div.navigation",
        contentSelector: null,
        extraScrollPx: 150,
        itemSelector: "div.post",
        animate: false,
        pathParse: undefined,
        dataType: 'html',
        appendCallback: true,
        bufferPx: 40,
        errorCallback: function () {},
        infid: 0,
        pixelsFromNavToBottom: undefined,
        path: undefined
    };
    $.infinitescroll.prototype = {
        _binding: function infscr_binding(binding) {
            var instance = this,
                opts = instance.options;
            if ( !! opts.behavior && this['_binding_' + opts.behavior] !== undefined) {
                this['_binding_' + opts.behavior].call(this);
                return;
            }
            if (binding !== 'bind' && binding !== 'unbind') {
                this._debug('Binding value  ' + binding + ' not valid')
                return false;
            }
            if (binding == 'unbind') {
                (this.options.binder).unbind('smartscroll.infscr.' + instance.options.infid);
            } else {
                (this.options.binder)[binding]('smartscroll.infscr.' + instance.options.infid, function () {
                    instance.scroll();
                });
            };
            this._debug('Binding', binding);
        },
        _create: function infscr_create(options, callback) {
            if (!this._validate(options)) {
                return false;
            }
            var opts = this.options = $.extend(true, {}, $.infinitescroll.defaults, options),
                relurl = /(.*?\/\/).*?(\/.*)/,
                path = $(opts.nextSelector).attr('href');
            opts.contentSelector = opts.contentSelector || this.element;
            opts.loading.selector = opts.loading.selector || opts.contentSelector;
            if (!path) {
                this._debug('Navigation selector not found');
                return;
            }
            opts.path = this._determinepath(path);
            opts.loading.msg = $('<div id="infscr-loading"><img alt="Loading..." src="' + opts.loading.img + '" /><div>' + opts.loading.msgText + '</div></div>');
            (new Image()).src = opts.loading.img;
            opts.pixelsFromNavToBottom = $(document).height() - $(opts.navSelector).offset().top;
            opts.loading.start = opts.loading.start || function () {
                $(opts.navSelector).hide();
                opts.loading.msg.appendTo(opts.loading.selector).show(opts.loading.speed, function () {
                    beginAjax(opts);
                });
            };
            opts.loading.finished = opts.loading.finished || function () {
                opts.loading.msg.fadeOut('normal');
            };
            opts.callback = function (instance, data) {
                if ( !! opts.behavior && instance['_callback_' + opts.behavior] !== undefined) {
                    instance['_callback_' + opts.behavior].call($(opts.contentSelector)[0], data);
                }
                if (callback) {
                    callback.call($(opts.contentSelector)[0], data);
                }
            };
            this._setup();
        },
        _debug: function infscr_debug() {
            if (this.options.debug) {
                return window.console && console.log.call(console, arguments);
            }
        },
        _determinepath: function infscr_determinepath(path) {
            var opts = this.options;
            if ( !! opts.behavior && this['_determinepath_' + opts.behavior] !== undefined) {
                this['_determinepath_' + opts.behavior].call(this, path);
                return;
            }
            if ( !! opts.pathParse) {
                this._debug('pathParse manual');
                return opts.pathParse;
            } else if (path.match(/^(.*?)\b2\b(.*?$)/)) {
                path = path.match(/^(.*?)\b2\b(.*?$)/).slice(1);
            } else if (path.match(/^(.*?)2(.*?$)/)) {
                if (path.match(/^(.*?page=)2(\/.*|$)/)) {
                    path = path.match(/^(.*?page=)2(\/.*|$)/).slice(1);
                    return path;
                }
                path = path.match(/^(.*?)2(.*?$)/).slice(1);
            } else {
                if (path.match(/^(.*?page=)1(\/.*|$)/)) {
                    path = path.match(/^(.*?page=)1(\/.*|$)/).slice(1);
                    return path;
                } else {
                    this._debug('Sorry, we couldn\'t parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.');
                    opts.state.isInvalidPage = true;
                }
            }
            this._debug('determinePath', path);
            return path;
        },
        _error: function infscr_error(xhr) {
            var opts = this.options;
            if ( !! opts.behavior && this['_error_' + opts.behavior] !== undefined) {
                this['_error_' + opts.behavior].call(this, xhr);
                return;
            }
            if (xhr !== 'destroy' && xhr !== 'end') {
                xhr = 'unknown';
            }
            this._debug('Error', xhr);
            if (xhr == 'end') {
                this._showdonemsg();
            }
            opts.state.isDone = true;
            opts.state.currPage = 1;
            opts.state.isPaused = false;
            this._binding('unbind');
        },
        _loadcallback: function infscr_loadcallback(box, data) {
            var opts = this.options,
                callback = this.options.callback,
                result = (opts.state.isDone) ? 'done' : (!opts.appendCallback) ? 'no-append' : 'append',
                frag;
            if ( !! opts.behavior && this['_loadcallback_' + opts.behavior] !== undefined) {
                this['_loadcallback_' + opts.behavior].call(this, box, data);
                return;
            }
            switch (result) {
                case 'done':
                    this._showdonemsg();
                    return false;
                    break;
                case 'no-append':
                    if (opts.dataType == 'html') {
                        data = '<div>' + data + '</div>';
                        data = $(data).find(opts.itemSelector);
                    };
                    break;
                case 'append':
                    var children = box.children();
                    if (children.length == 0) {
                        return this._error('end');
                    }
                    frag = document.createDocumentFragment();
                    while (box[0].firstChild) {
                        frag.appendChild(box[0].firstChild);
                    }
                    this._debug('contentSelector', $(opts.contentSelector)[0])
                    $(opts.contentSelector)[0].appendChild(frag);
                    data = children.get();
                    break;
            }
            opts.loading.finished.call($(opts.contentSelector)[0], opts)
            if (opts.animate) {
                var scrollTo = $(window).scrollTop() + $('#infscr-loading').height() + opts.extraScrollPx + 'px';
                $('html,body').animate({
                    scrollTop: scrollTo
                }, 800, function () {
                    opts.state.isDuringAjax = false;
                });
            }
            if (!opts.animate) opts.state.isDuringAjax = false;
            callback(this, data);
        },
        _nearbottom: function infscr_nearbottom() {
            var opts = this.options,
                pixelsFromWindowBottomToBottom = 0 + $(document).height() - (opts.binder.scrollTop()) - $(window).height();
            if ( !! opts.behavior && this['_nearbottom_' + opts.behavior] !== undefined) {
                this['_nearbottom_' + opts.behavior].call(this);
                return;
            }
            this._debug('math:', pixelsFromWindowBottomToBottom, opts.pixelsFromNavToBottom);
            return (pixelsFromWindowBottomToBottom - opts.bufferPx < opts.pixelsFromNavToBottom);
        },
        _pausing: function infscr_pausing(pause) {
            var opts = this.options;
            if ( !! opts.behavior && this['_pausing_' + opts.behavior] !== undefined) {
                this['_pausing_' + opts.behavior].call(this, pause);
                return;
            }
            if (pause !== 'pause' && pause !== 'resume' && pause !== null) {
                this._debug('Invalid argument. Toggling pause value instead');
            };
            pause = (pause && (pause == 'pause' || pause == 'resume')) ? pause : 'toggle';
            switch (pause) {
                case 'pause':
                    opts.state.isPaused = true;
                    break;
                case 'resume':
                    opts.state.isPaused = false;
                    break;
                case 'toggle':
                    opts.state.isPaused = !opts.state.isPaused;
                    break;
            }
            this._debug('Paused', opts.state.isPaused);
            return false;
        },
        _setup: function infscr_setup() {
            var opts = this.options;
            if ( !! opts.behavior && this['_setup_' + opts.behavior] !== undefined) {
                this['_setup_' + opts.behavior].call(this);
                return;
            }
            this._binding('bind');
            return false;
        },
        _showdonemsg: function infscr_showdonemsg() {
            var opts = this.options;
            if ( !! opts.behavior && this['_showdonemsg_' + opts.behavior] !== undefined) {
                this['_showdonemsg_' + opts.behavior].call(this);
                return;
            }
            opts.loading.msg.find('img').hide().parent().find('div').html(opts.loading.finishedMsg).animate({
                opacity: 1
            }, 2000, function () {
                $(this).parent().fadeOut('normal');
            });
            opts.errorCallback.call($(opts.contentSelector)[0], 'done');
        },
        _validate: function infscr_validate(opts) {
            for (var key in opts) {
                if (key.indexOf && key.indexOf('Selector') > -1 && $(opts[key]).length === 0) {
                    this._debug('Your ' + key + ' found no elements.');
                    return false;
                }
                return true;
            }
        },
        bind: function infscr_bind() {
            this._binding('bind');
        },
        destroy: function infscr_destroy() {
            this.options.state.isDestroyed = true;
            return this._error('destroy');
        },
        pause: function infscr_pause() {
            this._pausing('pause');
        },
        resume: function infscr_resume() {
            this._pausing('resume');
        },
        retrieve: function infscr_retrieve(pageNum) {
            var instance = this,
                opts = instance.options,
                path = opts.path,
                box, frag, desturl, method, condition, pageNum = pageNum || null,
                getPage = ( !! pageNum) ? pageNum : opts.state.currPage;
            beginAjax = function infscr_ajax(opts) {
                opts.state.currPage++;
                instance._debug('heading into ajax', path);
                box = $(opts.contentSelector).is('table') ? $('<tbody/>') : $('<div/>');
                desturl = path.join(opts.state.currPage);
                method = (opts.dataType == 'html' || opts.dataType == 'json') ? opts.dataType : 'html+callback';
                if (opts.appendCallback && opts.dataType == 'html') method += '+callback'
                switch (method) {
                    case 'html+callback':
                        instance._debug('Using HTML via .load() method');
                        box.load(desturl + ' ' + opts.itemSelector, null, function infscr_ajax_callback(responseText) {
                            instance._loadcallback(box, responseText);
                        });
                        break;
                    case 'html':
                    case 'json':
                        instance._debug('Using ' + (method.toUpperCase()) + ' via $.ajax() method');
                        $.ajax({
                            url: desturl,
                            dataType: opts.dataType,
                            complete: function infscr_ajax_callback(jqXHR, textStatus) {
                                condition = (typeof (jqXHR.isResolved) !== 'undefined') ? (jqXHR.isResolved()) : (textStatus === "success" || textStatus === "notmodified");
                                (condition) ? instance._loadcallback(box, jqXHR.responseText) : instance._error('end');
                            }
                        });
                        break;
                }
            };
            if ( !! opts.behavior && this['retrieve_' + opts.behavior] !== undefined) {
                this['retrieve_' + opts.behavior].call(this, pageNum);
                return;
            }
            if (opts.state.isDestroyed) {
                this._debug('Instance is destroyed');
                return false;
            };
            opts.state.isDuringAjax = true;
            opts.loading.start.call($(opts.contentSelector)[0], opts);
        },
        scroll: function infscr_scroll() {
            var opts = this.options,
                state = opts.state;
            if ( !! opts.behavior && this['scroll_' + opts.behavior] !== undefined) {
                this['scroll_' + opts.behavior].call(this);
                return;
            }
            if (state.isDuringAjax || state.isInvalidPage || state.isDone || state.isDestroyed || state.isPaused) return;
            if (!this._nearbottom()) return;
            this.retrieve();
        },
        toggle: function infscr_toggle() {
            this._pausing();
        },
        unbind: function infscr_unbind() {
            this._binding('unbind');
        },
        update: function infscr_options(key) {
            if ($.isPlainObject(key)) {
                this.options = $.extend(true, this.options, key);
            }
        }
    }
    $.fn.infinitescroll = function infscr_init(options, callback) {
        var thisCall = typeof options;
        switch (thisCall) {
            case 'string':
                var args = Array.prototype.slice.call(arguments, 1);
                this.each(function () {
                    var instance = $.data(this, 'infinitescroll');
                    if (!instance) {
                        return false;
                    }
                    if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                        return false;
                    }
                    instance[options].apply(instance, args);
                });
                break;
            case 'object':
                this.each(function () {
                    var instance = $.data(this, 'infinitescroll');
                    if (instance) {
                        instance.update(options);
                    } else {
                        $.data(this, 'infinitescroll', new $.infinitescroll(options, callback, this));
                    }
                });
                break;
        }
        return this;
    };
    var event = $.event,
        scrollTimeout;
    event.special.smartscroll = {
        setup: function () {
            $(this).bind("scroll", event.special.smartscroll.handler);
        },
        teardown: function () {
            $(this).unbind("scroll", event.special.smartscroll.handler);
        },
        handler: function (event, execAsap) {
            var context = this,
                args = arguments;
            event.type = "smartscroll";
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(function () {
                $.event.handle.apply(context, args);
            }, execAsap === "execAsap" ? 0 : 100);
        }
    };
    $.fn.smartscroll = function (fn) {
        return fn ? this.bind("smartscroll", fn) : this.trigger("smartscroll", ["execAsap"]);
    };
})(window, jQuery);

$(document).ready(function install_theme() {
    setTimeout(function () {
        $('#theme_controls').contents().find('head').append('<style>body { margin: 3px 0; padding: 0; font: 600 12px/20px "Helvetica Neue","HelveticaNeue",Helvetica,Arial,sans-serif; background: transparent; visibility: visible; -webkit-font-smoothing: antialiased; -webkit-transition-property: opacity,top; -moz-transition-property: opacity,top; -ms-transition-property: opacity,top; -o-transition-property: opacity,top; transition-property: opacity,top; -webkit-transition-duration: 1s; -moz-transition-duration: 1s; -ms-transition-duration: 1s; -o-transition-duration: 1s; transition-duration: 1s; -webkit-transition-delay: .25s; -moz-transition-delay: .25s; -ms-transition-delay: .25s; -o-transition-delay: .25s; transition-delay: .25s; -webkit-transition-timing-function: ease; -moz-transition-timing-function: ease; -ms-transition-timing-function: ease; -o-transition-timing-function: ease; transition-timing-function: ease; } .btn { position: relative; white-space: nowrap; outline: 0; text-decoration: none; cursor: pointer; font: 600 12px/18px "Helvetica Neue","HelveticaNeue",Helvetica,Arial,sans-serif; height: 20px; padding: 0 5px; -webkit-font-smoothing: antialiased; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; -ms-box-sizing: border-box; -o-box-sizing: border-box; box-sizing: border-box; -webkit-transition-property: padding; -moz-transition-property: padding; -ms-transition-property: padding; -o-transition-property: padding; transition-property: padding; -webkit-transition-duration: .1s; -moz-transition-duration: .1s; -ms-transition-duration: .1s; -o-transition-duration: .1s; transition-duration: .1s; -webkit-transition-timing-function: ease; -moz-transition-timing-function: ease; -ms-transition-timing-function: ease; -o-transition-timing-function: ease; transition-timing-function: ease; color: white; border: 1px solid rgba(0, 0, 0, 0.18); background: rgba(0, 0, 0, 0.38); text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.08); -webkit-border-radius: 2px; -moz-border-radius: 2px; border-radius: 2px; margin: 0 3px 0 0; } .btn.icon { padding-left: 20px; } a { float: left; display: block; color: #1C1C1C; cursor: pointer; text-decoration: none; } .btn.icon::before { display: block; content: ""; position: absolute; top: 0; left: 0; bottom: 0; width: 20px; border-radius: inherit; background: url("http://www.untitledthemes.com/common_resources/images/iframe_sprite.png") 0 0 no-repeat; } .btn.install_theme::before { background-position: 0 0; } .btn::after { position: absolute; top: 0; right: 0; bottom: 0; left: 0; content: ""; -webkit-border-radius: inherit; -moz-border-radius: inherit; border-radius: inherit; } .btn:hover::after, .btn:focus::after{ background:rgba(255,255,255,0.09) } </style>');
    }, 1000);
});