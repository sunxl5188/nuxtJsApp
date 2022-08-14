(function ($) {
    'use strict'
    $.fn.overlay = function (options) {
      return this.each(function () {
        const _width = $(this).outerWidth()
        const _height = $(this).outerHeight()
        const left = (_width - $(this).outerWidth() * 0.8) / 2
        const top = (_height - $(this).outerHeight() * 0.8) / 2
        if ($(this).find('a').length > 0) {
          var _overlay = '<a href="' + $(this).find('a').attr('href') + '" class="overlay" style="position:absolute;width:' + _width * 0.8 + 'px;height:' + _height * 0.8 + 'px;z-index:10;left:' + left + 'px;top:' + top + 'px;background:#fff; filter: Alpha(Opacity=0); opacity:0;display: block;"></a>'
        } else {
          var _overlay = '<div class="overlay" style="position:absolute;width:' + _width * 0.8 + 'px;height:' + _height * 0.8 + 'px;z-index:10;left:' + left + 'px;top:' + top + 'px;background:#fff; filter: Alpha(Opacity=0); opacity:0;"></div>'
        }
        $(this).css({ position: 'relative' })
        $(this).append(_overlay)
        $(this).mouseenter(function () {
          const wValue = $(this).outerWidth()
          const hValue = $(this).outerHeight()
          $(this).find('.overlay').animate({
            width: _width,
            height: _height,
            opacity: 0.6,
            left: 0,
            top: 0
          }, { duration: 150 })
        }).mouseleave(function () {
          $(this).find('.overlay').animate({
            width: _width * 0.8 + 'px',
            height: _height * 0.8 + 'px',
            left: left + 'px',
            top: +top + 'px',
            opacity: 0
          }, { duration: 80 })
        })
      })
    }
    $.fn.animation_effect = function (options) {
      /* var defualts = {
       speed: 1000//动画速度
       };
       var opts = $.extend({}, defualts, options); */
      return this.each(function () {
        const _this = $(this)
        const effect = _this.attr('data-animation-effect')
        const delayTime = _this.attr('data-effect-delay')
        const wValue = _this.outerWidth(true);
        const hValue = _this.outerHeight(true);
        const _width = _this.width();
        const _height = _this.height();
        const inwidth = _this.innerWidth();
        const inheight = _this.innerHeight()
        /* 执行动画时，看情况是否需要包裹元素 */
        let wrapHtml = '<div style=\'width:' + wValue + 'px;height:' + hValue + 'px;position: relative;\'></div>'
        if (_this.css('float') == 'left' || _this.css('float') == 'right') {
          wrapHtml = '<div style=\'width:' + wValue + 'px;height:' + hValue + 'px;float:' + _this.css('float') + ';position: relative;\'></div>'
        }
        // 是否可视化区域?
        $(this).appear(function () {
          if (Modernizr.cssanimations && Modernizr.csstransforms) {
            delay_style(effect, delayTime);
          } else {
            delay_effect($(this), effect, delayTime);
          }
        }, {
          // one: false
        });

        /* 播放元素 */
        function delay_effect(_this, effect, delaytime) {
          switch (effect) {
            /* Attention Seekers */
            case 'bounce':
              _this.delay(delayTime).animate({ bottom: 30 }, {
                duration: 300,
                easing: 'easeOutQuad'
              }).animate({ bottom: 0 }, {
                duration: 700,
                easing: 'easeOutBounce'
              })
              break;
            case 'flash':
              _this.delay(delayTime).animate({ opacity: 0 }, 300).animate({ opacity: 1 }, 300).animate({ opacity: 0 }, 300).animate({ opacity: 1 }, 300)
              break;
            case 'pulse':
              _this.delay(delayTime).animate({
                width: _this.width() * 1.1,
                height: _this.height() * 1.1,
                left: -((_this.width() * 1.1 - _this.width()) / 2),
                top: -((_this.height() * 1.1 - _this.height()) / 2)
              }, 800).animate({ width: _this.width(), height: _this.height(), left: 0, top: 0 }, 500)
              break;
            case 'rubberBand':

              // 暂不支持文字伸拉
              _this.delay(delayTime).animate({
                width: _this.width() * 1.25,
                height: _this.height() * 0.75,
                left: -((_this.width() * 1.25 - _this.width()) / 2),
                top: ((_this.height() - _this.height() * 0.75) / 2)
              }, 800).animate({
                width: _this.width(),
                height: _this.height(),
                left: 0,
                top: 0
              }, { duration: 800, easing: 'easeOutBounce' })
              break
            case 'shake':
              _this.delay(delaytime).animate({ left: -10 }, 150).animate({ left: 10 }, 150)
                .animate({ left: -10 }, 150).animate({ left: 10 }, 150)
                .animate({ left: -10 }, 150).animate({ left: 10 }, 150)
                .animate({ left: -10 }, 150).animate({ left: 10 }, 150)
                .animate({ left: -10 }, 150).animate({ left: 0 }, 300)
              break
            case 'swing':
              // IE9时旋转角度，但效果不理想,IE7 IE8 只能旋转图片
              if (isIE()) {
                if (IEVersion() > 8) {
                  setTimeout(function () {
                    rotation(_this)
                  }, delayTime)
                }
              }
              break
            case 'tada':
            case 'wobble':
            case'jello':
              // 暂时没有实现
              break
            /* Fading Entrances */
            case 'fadeIn' :
              _this.css({ opacity: 0 })
              _this.delay(delayTime).animate({ opacity: 1 }, { duration: 1000 })
              break
            case 'fadeInDown' :
              _this.css({ opacity: 0 })
              _this.wrap(wrapHtml)
              _this.css({ 'top': -hValue + 'px', left: 0, position: 'absolute' })
              _this.delay(delayTime).animate({ 'top': 0, opacity: 1 }, { duration: 1000 })
              break
            case 'fadeInDownBig' :
              _this.css({ opacity: 0 })
              _this.wrap(wrapHtml)
              _this.css({ 'top': -2000, left: 0, position: 'absolute' })
              _this.delay(delayTime).animate({ 'top': 0, opacity: 1 }, { duration: 1000 })
              break
            case 'fadeInLeft' :
              _this.css({ opacity: 0 })
              _this.wrap(wrapHtml)
              _this.css({ 'left': -wValue, top: 0, position: 'absolute' })
              _this.delay(delayTime).animate({ 'left': 0, opacity: 1 }, { duration: 1000 })
              break
            case 'fadeInLeftBig' :
              _this.css({ opacity: 0 })
              _this.wrap(wrapHtml)
              _this.css({ 'left': -2000, top: 0, position: 'absolute' })
              _this.delay(delayTime).animate({ 'left': 0, opacity: 1 }, { duration: 1000 })
              break
            case 'fadeInRight' :
              _this.css({ opacity: 0 })
              _this.wrap(wrapHtml)
              _this.css({ 'left': wValue, top: 0, position: 'absolute' })
              _this.delay(delayTime).animate({ 'left': 0, opacity: 1 }, { duration: 1000 })
              break
            case 'fadeInRightBig' :
              _this.css({ opacity: 0 })
              _this.wrap(wrapHtml)
              _this.css({ 'left': 2000, top: 0, position: 'absolute' })
              _this.delay(delayTime).animate({ 'left': 0, opacity: 1 }, { duration: 1000 })
              break
            case 'fadeInUp' :
              _this.css({ opacity: 0 })
              _this.wrap(wrapHtml)
              _this.css({ 'top': hValue, left: 0, position: 'absolute' })
              _this.delay(delayTime).animate({ 'top': 0, opacity: 1 }, { duration: 1000 })
              break
            case 'fadeInUpBig' :
              _this.css({ opacity: 0 })
              _this.wrap(wrapHtml)
              _this.css({ 'top': 2000, left: 0, position: 'absolute' })
              _this.delay(delayTime).animate({ 'top': 0, opacity: 1 }, { duration: 1000 })
              break
            /* Bouncing Entrances */
            case 'bounceIn' :
              _this.wrap(wrapHtml)
              _this.css({
                width: _width * 0.3,
                height: _height * 0.3,
                left: (_width - _width * 0.3) / 2,
                top: (_height - _height * 0.3) / 2,
                position: 'absolute'
              })
              _this.delay(delayTime).animate({
                width: _width * 1.1,
                height: _height * 1.1,
                left: -((_width * 1.1 - _width) / 2),
                top: -((_height * 1.1 - _height) / 2),
                opacity: 1
              }, 200)
                .animate({
                  width: _width * 0.9,
                  height: _height * 0.9,
                  left: ((_width - _width * 0.9) / 2),
                  top: (_height - _height * 0.9) / 2
                }, 200)
                .animate({
                  width: _width * 1.03,
                  height: _height * 1.03,
                  left: -((_width * 1.03 - _width) / 2),
                  top: -(_height * 1.03 - _height) / 2
                }, 200)
                .animate({
                  width: _width * 0.97,
                  height: _height * 0.97,
                  left: ((_width - _width * 0.97) / 2),
                  top: (_height - _height * 0.97) / 2
                }, 200)
                .animate({ width: _width, height: _height, left: 0, top: 0 }, 200)
              break
            case 'bounceInDown' :
              _this.wrap(wrapHtml)
              _this.css({ top: -3000, position: 'absolute' })
              _this.delay(delayTime).animate({ top: 25, opacity: 1 }, 500)
                .animate({ top: -10 }, 200)
                .animate({ top: 5 }, 150)
                .animate({ top: 0 }, 100)
              break
            case 'bounceInLeft' :
              _this.wrap(wrapHtml)
              _this.css({ left: -3000, position: 'absolute' })
              _this.delay(delayTime).animate({ left: 25, opacity: 1 }, 500)
                .animate({ left: -10 }, 200)
                .animate({ left: 5 }, 150)
                .animate({ left: 0 }, 100)
              break
            case 'bounceInRight' :
              _this.wrap(wrapHtml)
              _this.css({ left: 3000, position: 'absolute' })
              _this.delay(delayTime).animate({ left: -25, opacity: 1 }, 500)
                .animate({ left: 10 }, 200)
                .animate({ left: -5 }, 150)
                .animate({ left: 0 }, 100)
              break
            case 'bounceInUp' :
              _this.wrap(wrapHtml)
              _this.css({ top: 3000, position: 'absolute' })
              _this.delay(delayTime).animate({ top: -25, opacity: 1 }, 500)
                .animate({ top: 10 }, 200)
                .animate({ top: -5 }, 150)
                .animate({ top: 0 }, 100)
              break
            /* Bouncing Exits */
            case 'bounceOut':
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute' })
              _this.delay(delayTime).animate({
                width: _width * 0.9,
                height: _height * 0.9,
                left: (_width - _width * 0.9) / 2,
                top: (_height - _height * 0.9) / 2
              }, 300)
                .animate({
                  width: _width * 1.1,
                  height: _height * 1.1,
                  left: -((_width * 1.1 - _width) / 2),
                  top: -((_height * 1.1 - _height) / 2)
                }, 200)
                .animate({
                  width: _width * 0.3,
                  height: _height * 0.3,
                  left: (_width - _width * 0.3) / 2,
                  top: (_height - _height * 0.3) / 2,
                  opacity: 0
                }, 150)
              break
            case 'bounceOutDown':
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute' })
              _this.delay(delayTime).animate({ top: 10 }, 300).animate({ top: -20 }, 200)
                .animate({ top: 2000, opacity: 0 }, 1000, function () {
                  _this.hide()
                })
              break
            case 'bounceOutLeft':
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute' })
              _this.delay(delayTime).animate({ left: 20 }, 300).animate({ left: -2000 }, 1000, function () {
                _this.hide()
              })
              break
            case 'bounceOutRight':
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute' })
              _this.delay(delayTime).animate({ left: -20 }, 200).animate({
                left: 2000,
                opacity: 0
              }, 1000, function () {
                _this.hide()
              })
              break
            case 'bounceOutUp':
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute' })
              _this.delay(delayTime).animate({ top: 10 }, 200).animate({ top: -20 }, 200).animate({
                top: -2000,
                opacity: 0
              }, 1000, function () {
                _this.hide()
              })
              break
            /* Fading Exits */
            case 'fadeOut' :
              _this.delay(delayTime).animate({ opacity: 0 }, 1000, function () {
                _this.hide()
              })
              break
            case 'fadeOutDown' :
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute' })
              _this.delay(delayTime).animate({ top: wValue, opacity: 0 }, 1000, function () {
                _this.hide()
              })
              break
            case 'fadeOutDownBig' :
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute' })
              _this.delay(delayTime).animate({ top: 2000, opacity: 0 }, 1000, function () {
                _this.hide()
              })
              break
            case 'fadeOutLeft' :
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute' })
              _this.delay(delayTime).animate({ left: -hValue, opacity: 0 }, 1000, function () {
                _this.hide()
              })
              break
            case 'fadeOutLeftBig' :
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute' })
              _this.delay(delayTime).animate({ left: -2000, opacity: 0 }, 1000, function () {
                _this.hide()
              })
              break
            case 'fadeOutRight' :
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute' })
              _this.delay(delayTime).animate({ left: wValue, opacity: 0 }, 1000, function () {
                _this.hide()
              })
              break
            case 'fadeOutRightBig' :
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute' })
              _this.delay(delayTime).animate({ left: 2000, opacity: 0 }, 1000, function () {
                _this.hide()
              })
              break
            case 'fadeOutUp' :
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute' })
              _this.delay(delayTime).animate({ top: -hValue, opacity: 0 }, 1000, function () {
                _this.hide()
              })
              break
            case 'fadeOutUpBig' :
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute' })
              _this.delay(delayTime).animate({ top: -2000, opacity: 0 }, 1000, function () {
                _this.hide()
              })
              break
            /* Flippers */
            case 'flip' :
            case 'flipInX' :
            case 'flipInY' :
            case 'flipOutX' :
            case 'flipOutY' :
              // 暂时无法实现
              break
            /* Lightspeed */
            case 'lightSpeedIn' :
            case 'lightSpeedOut' :
              // 暂时无法实现
              break
            /* Rotating Entrances */
            case 'rotateIn' :
            case 'rotateInDownLeft' :
            case 'rotateInDownRight' :
            case 'rotateInUpLeft' :
            case 'rotateInUpRight' :
              // 暂时无法实现
              break
            /* Rotating Exits */
            case 'rotateOut' :
            case 'rotateOutDownLeft' :
            case 'rotateOutDownRight' :
            case 'rotateOutUpLeft' :
            case 'rotateOutUpRight' :
              // 暂时无法实现
              break
            /* Sliding Entrances */
            case 'slideInUp':
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute', top: hValue })
              _this.delay(delayTime).animate({ top: 0 }, 1000)
              break
            case 'slideInDown':
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute', top: -hValue })
              _this.delay(delayTime).animate({ top: 0 }, 1000)
              break
            case 'slideInLeft':
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute', left: -wValue })
              _this.delay(delayTime).animate({ left: 0 }, 1000)
              break
            case 'slideInRight':
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute', left: wValue })
              _this.delay(delayTime).animate({ left: 0 }, 1000)
              break
            /* Sliding Exits */
            case 'slideOutUp':
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute', top: 0 })
              _this.delay(delayTime).animate({
                top: -hValue,
                opacity: 0
              }, 1000, function () {
                _this.hide()
              })
              break
            case 'slideOutDown':
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute', top: 0 })
              _this.delay(delayTime).animate({ top: hValue, opacity: 0 }, 1000,
                function () {
                  _this.hide()
                })
              break
            case 'slideOutLeft':
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute', left: 0 })
              _this.delay(delayTime).animate({ left: -wValue, opacity: 0 }, 1000,
                function () {
                  _this.hide()
                })
              break
            case 'slideOutRight':
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute', left: 0 })
              _this.delay(delayTime).animate({ left: wValue, opacity: 0 }, 1000,
                function () {
                  _this.hide()
                })
              break

            /* Specials */
            case 'hinge' :
              break
            case 'rollIn' :
              break
            case 'rollOut' :
              // 暂时无法实现
              break
            /* Zoom Entrances */
            case 'zoomIn' :
              _this.wrap(wrapHtml)
              _this.css({
                position: 'absolute',
                opacity: 0,
                width: _width * 0.3,
                height: _height * 0.3,
                left: (_width - _width * 0.3) / 2,
                top: (_height - _height * 0.3) / 2
              })
              _this.delay(delayTime).animate({
                opacity: 1,
                width: _width,
                height: _height,
                left: 0,
                top: 0
              }, 1000)
              break
            case 'zoomInDown' :
              _this.wrap(wrapHtml)
              _this.css({
                position: 'absolute',
                opacity: 0,
                width: _width * 0.1,
                height: _height * 0.1,
                left: (_width - _width * 0.1) / 2,
                top: -1000
              })
              _this.delay(delayTime).animate({
                opacity: 1,
                width: _width * 0.475,
                height: _height * 0.475,
                left: (_width - _width * 0.475) / 2,
                top: 60
              }, 500)
                .animate({ width: _width, height: _height, left: 0, top: 0 }, 1000)
              break
            case 'zoomInLeft' :
              _this.wrap(wrapHtml)
              _this.css({
                position: 'absolute',
                opacity: 0,
                width: _width * 0.1,
                height: _height * 0.1,
                left: -1000,
                top: (_height - _height * 0.1) / 2
              })
              _this.delay(delayTime).animate({
                opacity: 1,
                width: _width * 0.475,
                height: _height * 0.475,
                left: 10,
                top: (_height - _height * 0.1) / 2
              }, 500)
                .animate({ width: _width, height: _height, left: 0, top: 0 }, 1000)
              break
            case 'zoomInRight' :
              _this.wrap(wrapHtml)
              _this.css({
                position: 'absolute',
                opacity: 0,
                width: _width * 0.1,
                height: _height * 0.1,
                left: 1000,
                top: (_height - _height * 0.1) / 2
              })
              _this.delay(delayTime).animate({
                opacity: 1,
                width: _width * 0.475,
                height: _height * 0.475,
                left: -10,
                top: (_height - _height * 0.1) / 2
              }, 500)
                .animate({ width: _width, height: _height, left: 0, top: 0 }, 1000)
              break
            case 'zoomInUp' :
              _this.wrap(wrapHtml)
              _this.css({
                position: 'absolute',
                opacity: 0,
                width: _width * 0.1,
                height: _height * 0.1,
                left: (_width - _width * 0.1) / 2,
                top: 1000
              })
              _this.delay(delayTime).animate({
                opacity: 1,
                width: _width * 0.475,
                height: _height * 0.475,
                left: (_width - _width * 0.475) / 2,
                top: -60
              }, 500)
                .animate({ width: _width, height: _height, left: 0, top: 0 }, 1000)
              break
            /* Zoom Exits */
            case 'zoomOut' :
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute' })
              _this.delay(delayTime).animate({
                opacity: 0.5,
                width: _width * 0.3,
                height: _height * 0.3,
                left: (_width - _width * 0.3) / 2,
                top: (_height - _height * 0.3) / 2
              }, 500)
                .animate({ opacity: 0, width: 0, height: 0, left: _width / 2, top: _height / 2 }, 500)
              break
            case 'zoomOutDown' :
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute' })
              _this.delay(delayTime).animate({
                opacity: 0.5,
                width: _width * 0.475,
                height: _height * 0.475,
                left: (_width - _width * 0.475) / 2,
                top: (_height - _height * 0.475) / 2
              }, 500)
                .animate({
                  opacity: 0,
                  width: 0,
                  height: 0,
                  left: _width / 2,
                  top: 2000
                }, 1000, function () {_this.hide()})
              break
            case 'zoomOutLeft' :
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute' })
              _this.delay(delayTime).animate({
                opacity: 0.5,
                width: _width * 0.475,
                height: _height * 0.475,
                left: (_width - _width * 0.475) / 2,
                top: (_height - _height * 0.475) / 2
              }, 500)
                .animate({
                  opacity: 0,
                  width: 0,
                  height: 0,
                  left: -2000,
                  top: _height / 2
                }, 1000, function () {_this.hide()})
              break
            case 'zoomOutRight' :
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute' })
              _this.delay(delayTime).animate({
                opacity: 0.5,
                width: _width * 0.475,
                height: _height * 0.475,
                left: (_width - _width * 0.475) / 2,
                top: (_height - _height * 0.475) / 2
              }, 500)
                .animate({
                  opacity: 0,
                  width: 0,
                  height: 0,
                  left: 2000,
                  top: _height / 2
                }, 1000, function () {_this.hide()})
              break
            case 'zoomOutUp' :
              _this.wrap(wrapHtml)
              _this.css({ position: 'absolute' })
              _this.delay(delayTime).animate({
                opacity: 0.5,
                width: _width * 0.475,
                height: _height * 0.475,
                left: (_width - _width * 0.475) / 2,
                top: (_height - _height * 0.475) / 2
              }, 500)
                .animate({
                  opacity: 0,
                  width: 0,
                  height: 0,
                  left: _width / 2,
                  top: -2000
                }, 1000, function () {_this.hide()})
              break
            /**/
            case'hinge':
            case'rollIn':
            case'rollOut':
              // 暂时无法实现
              break
          }
        }

        /* 延时添加样式 */
        function delay_style (effect, delayTime) {
          setTimeout(function () {
            _this.addClass('animated ' + effect)
          }, delayTime)
        }

        /* 左右旋转 */
        let ronum = 1
        var rotation = function () {
          ronum += 1
          let roto = 15; let starro = 0
          if (ronum == 2 || ronum == 4) {
            roto = -15
            starro = 15
          } else if (ronum == 3 || ronum == 5) {
            starro = -15
          }
          _this.rotate({
            angle: starro,
            animateTo: roto,
            duration: 600,
            easing: $.easing.easeOutBounce,
            callback: rotation
          })
          if (ronum == 6) {
            _this.stopRotate()
          }
        }

        function isIE () {
          if (!!window.ActiveXObject || 'ActiveXObject' in window) {
            return true
          } else {
            return false
          }
        }

        function IEVersion () {
          let rv = -1
          if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent
            var re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})')
            if (re.exec(ua) != null)
              rv = parseFloat(RegExp.$1)
          } else if (navigator.appName == 'Netscape') {
            var ua = navigator.userAgent
            var re = new RegExp('Trident/.*rv:([0-9]{1,}[\.0-9]{0,})')
            if (re.exec(ua) != null)
              rv = parseFloat(RegExp.$1)
          }
          return rv
        }
      })
    }
  })(jQuery)


