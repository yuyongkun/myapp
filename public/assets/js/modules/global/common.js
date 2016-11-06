define(['jquery', 'spin.min'], function ($, Spinner) {
    var common = {
        /**
         * 事件绑定函数
         */
        bindEvent: function (obj, contain) {
            var $contain = $('body') || $(contain);
            for (var ev in obj) {
                (function (ev) {
                    for (var wrap in obj[ev]) {
                        $contain.on(ev, wrap, obj[ev][wrap]);
                    }
                })(ev);
            }
        },

        menuTitlePrimary: function (e) {
            $('.menu_title_primary').on('click', function (e) {
                var $next = $(e.currentTarget).next();
                $next.toggle();
                if ($next.is(':hidden')) {
                    $(e.currentTarget).removeClass('menu_title_cur');
                    $(e.currentTarget).find('i')[0].className = 'triangle_border_down';
                } else {
                    $(e.currentTarget).addClass('menu_title_cur');
                    $(e.currentTarget).find('i')[0].className = 'triangle_border_up';
                }
            });
        }(),
        ajax: function (options) {
            if (typeof options.data === 'string')return;
            var _options = options || {},
                _success = _options.success,
                _hideDefaultLoading = _options.hideDefaultLoading,
                _error = _options.error;
            var globalParam = {
                type: 'post',
                cache: false,
                timeout: 20000
            };

            for (var param in globalParam) {
                if (!_options[param]) {
                    _options[param] = globalParam[param];
                }
            }
            _options.beforeSend = function () {
                if (!_hideDefaultLoading) {
                    var upDialog = document.getElementById('loading-default');
                    if (!upDialog) {
                        var el = document.createElement('div');
                        el.innerHTML = '<div id="loading-default" style="position: fixed;top: 35%;left: 50%;margin-left:-33px;z-index:9999;"><div class="mask2"></div><div id="preview"></div></div>';
                        document.body.appendChild(el);
                        var target = document.getElementById('preview');
                        var spinner = new Spinner({
                            lines: 12, // The number of lines to draw
                            length: 5, // The length of each line
                            width: 5, // The line thickness
                            radius: 14, // The radius of the inner circle
                            corners: 1, // Corner roundness (0..1)
                            rotate: 0, // The rotation offset
                            color: '#000', // #rgb or #rrggbb
                            speed: 0.8, // Rounds per second
                            trail: 60, // Afterglow percentage
                            shadow: false, // Whether to render a shadow
                            hwaccel: false, // Whether to use hardware acceleration
                            className: 'spinner', // The CSS class to assign to the spinner
                            zIndex: 2e9, // The z-index (defaults to 2000000000)
                            top: 'auto', // Top position relative to parent in px
                            opacity: 0.25,
                            left: 'auto' // Left position relative to parent in px
                        }).spin(target);
                    } else {
                        $('#loading-default').show();
                    }
                }

            };
            _options.success = function (result) {
                $('#loading-default').hide();

                if (result.status == '301') {
                    location.href = result.url;
                } else {
                    _success && _success(result);
                }

            };
            _options.error = function () {
                _error && _error();
            };
            $.ajax(_options);
        }
    };
    return common;
});