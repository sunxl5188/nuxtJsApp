/**
 * 它实现一个自定义的“出现”/“消失”事件时触发浏览器视图中的一个元素成为有形/无形的端口
 * jQuery.appear
 * https://github.com/bas2k/jquery.appear/
 * http://code.google.com/p/jquery-appear/
 * http://bas2k.ru/
 * Copyright (c) 2009 Michael Hixson
 * Copyright (c) 2012-2014 Alexander Brovikov
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * 使用
 * 模仿一个自定义的“出现”事件，当元素滚动到视图中或以其他方式向用户可见时发生火灾。
 * $('#foo').appear(function() {
 * $(this).text('Hello world');
 * });
 * 这个插件可以用来防止内容隐藏或可视区域之外不必要的要求。
 * 使用附加选项
 * $('#foo').appear(function() {
 * $(this).text('Hello world');
 * },{accX: 50, accY: 100});
 * 将火'出现'事件与Y在X和准确性50px 100px
 */
(function($) {
        $.fn.appear = function(fn, options) {
            const settings = $.extend({
                // 任意的数据通过FN
                data: undefined,
                // 叫FN仅在第一次出现？
                one: true,
                // X & Y 精确
                accX: 0,
                accY: 0
            }, options);
            return this.each(function() {
                const t = $(this);
                // 是否当前可见元素
                t.appeared = false;
                if (!fn) {
                    // 触发自定义事件
                    t.trigger('appear', settings.data);
                    return;
                }
                const w = $(window);
                // 适当的时候将出现的事件触发
                const check = function() {
                    // is the element hidden?
                    if (!t.is(':visible')) {
                        // it became hidden
                        t.appeared = false;
                        return;
                    }

                    // 是在可见窗口内的元素吗？
                    const a = w.scrollLeft();
                    const b = w.scrollTop();
                    const o = t.offset();
                    const x = o.left;
                    const y = o.top;

                    const ax = settings.accX;
                    const ay = settings.accY;
                    const th = t.height();
                    const wh = w.height();
                    const tw = t.width();
                    const ww = w.width();

                    if (y + th + ay >= b &&  y <= b + wh + ay && x + tw + ax >= a && x <= a + ww + ax) {
                        // 触发自定义事件
                        if (!t.appeared) {
                            t.trigger('appear', settings.data);
                        }
                    } else {
                        // 它滚动的视图
                        t.appeared = false;
                    }
                };

                // 创建一个改进的FN与一些额外的逻辑
                const modifiedFn = function() {

                    // mark the element as visible
                    t.appeared = true;
                    // is this supposed to happen only once?
                    // 标记元素As the visible
                    if (settings.one) {
                        // 拆下检查
                        w.unbind('scroll', check);
                        const i = $.inArray(check, $.fn.appear.checks);
                        if (i >= 0) $.fn.appear.checks.splice(i, 1);
                    }

                    // 触发原始FN
                    fn.apply(this, arguments);
                };

                // 结合改进的FN的元素
                if (settings.one) t.one('appear', settings.data, modifiedFn);
                else t.bind('appear', settings.data, modifiedFn);

                // 每当窗口滚动时检查
                w.scroll(check);
                // 检查时，DOM的变化
                $.fn.appear.checks.push(check);
                // 现在检查
                (check)();
            });
        };

        // 保持外观检查队列
        $.extend($.fn.appear, {checks: [],timeout: null,
            // 进程队列
            checkAll() {
                let length = $.fn.appear.checks.length;
                if (length > 0) while (length--) ($.fn.appear.checks[length])();
            },

            // 异步检查队列
            run() {
                if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);
                $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20);
            }
        });

        // 当这些方法被调用时运行检查
        $.each(['append', 'prepend', 'after', 'before', 'attr','removeAttr', 'addClass', 'removeClass', 'toggleClass','remove', 'css', 'show', 'hide'], function(i, n) {
            const old = $.fn[n];
            if (old) {
                $.fn[n] = function() {
                    const r = old.apply(this, arguments);
                    $.fn.appear.run();
                    return r;
                }
            }
        });

    })(jQuery);
