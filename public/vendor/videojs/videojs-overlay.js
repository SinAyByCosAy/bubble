(function(f) { if (typeof exports === "object" && typeof module !== "undefined") { module.exports = f() } else if (typeof define === "function" && define.amd) { define([], f) } else { var g; if (typeof window !== "undefined") { g = window } else if (typeof global !== "undefined") { g = global } else if (typeof self !== "undefined") { g = self } else { g = this }
        g.videojsOverlay = f() } })(function() {
    var define, module, exports;
    return (function e(t, n, r) {
        function s(o, u) { if (!n[o]) { if (!t[o]) { var a = typeof require == "function" && require; if (!u && a) return a(o, !0); if (i) return i(o, !0); var f = new Error("Cannot find module '" + o + "'"); throw f.code = "MODULE_NOT_FOUND", f } var l = n[o] = { exports: {} };
                t[o][0].call(l.exports, function(e) { var n = t[o][1][e]; return s(n ? n : e) }, l, l.exports, e, t, n, r) } return n[o].exports } var i = typeof require == "function" && require; for (var o = 0; o < r.length; o++) s(r[o]); return s })({
        1: [function(require, module, exports) {
            (function(global) {
                var win;

                if (typeof window !== "undefined") {
                    win = window;
                } else if (typeof global !== "undefined") {
                    win = global;
                } else if (typeof self !== "undefined") {
                    win = self;
                } else {
                    win = {};
                }

                module.exports = win;

            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, {}],
        2: [function(require, module, exports) {
            module.exports = function tsmlj(ts) {
                var out = '';
                var i = 0;

                // Match normal template string behavior to get the full, formatted string.
                for (; i < arguments.length; i++) {
                    out += ts[i] + (arguments[i + 1] || '');
                }

                return out.replace(/\s+/g, ' ').trim();
            };

        }, {}],
        3: [function(require, module, exports) {
            (function(global) {
                'use strict';

                Object.defineProperty(exports, '__esModule', {
                    value: true
                });

                var _createClass = (function() {
                    function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i];
                            descriptor.enumerable = descriptor.enumerable || false;
                            descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true;
                            Object.defineProperty(target, descriptor.key, descriptor); } } return function(Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

                var _get = function get(_x, _x2, _x3) { var _again = true;
                    _function: while (_again) { var object = _x,
                            property = _x2,
                            receiver = _x3;
                        _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent;
                                _x2 = property;
                                _x3 = receiver;
                                _again = true;
                                desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

                var _templateObject = _taggedTemplateLiteral(['\n      created, listening to "', '" for "start" and\n      "', '" for "end"\n    '], ['\n      created, listening to "', '" for "start" and\n      "', '" for "end"\n    ']),
                    _templateObject2 = _taggedTemplateLiteral(['\n          hiding; ', ' is an integer and overlay should not show at this time\n        '], ['\n          hiding; ', ' is an integer and overlay should not show at this time\n        ']),
                    _templateObject3 = _taggedTemplateLiteral(['\n          hiding; show point (', ') is before now (', ') and end\n          point (', ') is an event\n        '], ['\n          hiding; show point (', ') is before now (', ') and end\n          point (', ') is an event\n        ']);

                function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

                function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

                function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); }
                    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

                function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

                var _tsmlj = require('tsmlj');

                var _tsmlj2 = _interopRequireDefault(_tsmlj);

                var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

                var _videoJs2 = _interopRequireDefault(_videoJs);

                var _globalWindow = require('global/window');

                var _globalWindow2 = _interopRequireDefault(_globalWindow);

                var defaults = {
                    align: 'top-left',
                    'class': '',
                    content: 'This overlay will show up while the video is playing',
                    debug: false,
                    showBackground: true,
                    attachToControlBar: false,
                    overlays: [{
                        start: 'playing',
                        end: 'paused'
                    }]
                };

                var Component = _videoJs2['default'].getComponent('Component');

                // These are for cross-compatibility between Video.js 5 and 6.
                var dom = _videoJs2['default'].dom || _videoJs2['default'];
                var registerPlugin = _videoJs2['default'].registerPlugin || _videoJs2['default'].plugin;

                /**
                 * Whether the value is a `Number`.
                 *
                 * Both `Infinity` and `-Infinity` are accepted, but `NaN` is not.
                 *
                 * @param  {Number} n
                 * @return {Boolean}
                 */

                /* eslint-disable no-self-compare */
                var isNumber = function isNumber(n) {
                    return typeof n === 'number' && n === n;
                };
                /* eslint-enable no-self-compare */

                /**
                 * Whether a value is a string with no whitespace.
                 *
                 * @param  {String} s
                 * @return {Boolean}
                 */
                var hasNoWhitespace = function hasNoWhitespace(s) {
                    return typeof s === 'string' && /^\S+$/.test(s);
                };

                /**
                 * Overlay component.
                 *
                 * @class   Overlay
                 * @extends {videojs.Component}
                 */

                var Overlay = (function(_Component) {
                    _inherits(Overlay, _Component);

                    function Overlay(player, options) {
                        var _this = this;

                        _classCallCheck(this, Overlay);

                        _get(Object.getPrototypeOf(Overlay.prototype), 'constructor', this).call(this, player, options);

                        ['start', 'end'].forEach(function(key) {
                            var value = _this.options_[key];

                            if (isNumber(value)) {
                                _this[key + 'Event_'] = 'timeupdate';
                            } else if (hasNoWhitespace(value)) {
                                _this[key + 'Event_'] = value;

                                // An overlay MUST have a start option. Otherwise, it's pointless.
                            } else if (key === 'start') {
                                throw new Error('invalid "start" option; expected number or string');
                            }
                        });

                        // video.js does not like components with multiple instances binding
                        // events to the player because it tracks them at the player level,
                        // not at the level of the object doing the binding. This could also be
                        // solved with Function.prototype.bind (but not videojs.bind because of
                        // its GUID magic), but the anonymous function approach avoids any issues
                        // caused by crappy libraries clobbering Function.prototype.bind.
                        // - https://github.com/videojs/video.js/issues/3097
                        ['endListener_', 'rewindListener_', 'startListener_'].forEach(function(name) {
                            _this[name] = function(e) {
                                return Overlay.prototype[name].call(_this, e);
                            };
                        });

                        // If the start event is a timeupdate, we need to watch for rewinds (i.e.,
                        // when the user seeks backward).
                        if (this.startEvent_ === 'timeupdate') {
                            this.on(player, 'timeupdate', this.rewindListener_);
                        }

                        this.debug((0, _tsmlj2['default'])(_templateObject, this.startEvent_, this.endEvent_ || 'nothing'));

                        this.hide();
                    }

                    _createClass(Overlay, [{
                        key: 'createEl',
                        value: function createEl() {
                            var options = this.options_;
                            var content = options.content;

                            var background = options.showBackground ? 'vjs-overlay-background' : 'vjs-overlay-no-background';
                            var el = dom.createEl('div', {
                                className: '\n        vjs-overlay\n        vjs-overlay-' + options.align + '\n        ' + options['class'] + '\n        ' + background + '\n        vjs-hidden\n      '
                            });

                            if (typeof content === 'string') {
                                el.innerHTML = content;
                            } else if (content instanceof _globalWindow2['default'].DocumentFragment) {
                                el.appendChild(content);
                            } else {
                                dom.appendContent(el, content);
                            }

                            return el;
                        }

                        /**
                         * Logs debug errors
                         * @param  {...[type]} args [description]
                         * @return {[type]}         [description]
                         */
                    }, {
                        key: 'debug',
                        value: function debug() {
                            if (!this.options_.debug) {
                                return;
                            }

                            var log = _videoJs2['default'].log;
                            var fn = log;

                            // Support `videojs.log.foo` calls.

                            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                                args[_key] = arguments[_key];
                            }

                            if (log.hasOwnProperty(args[0]) && typeof log[args[0]] === 'function') {
                                fn = log[args.shift()];
                            }

                            fn.apply(undefined, ['overlay#' + this.id() + ': '].concat(args));
                        }

                        /**
                         * Overrides the inherited method to perform some event binding
                         *
                         * @return {Overlay}
                         */
                    }, {
                        key: 'hide',
                        value: function hide() {
                            _get(Object.getPrototypeOf(Overlay.prototype), 'hide', this).call(this);

                            this.debug('hidden');
                            this.debug('bound `startListener_` to "' + this.startEvent_ + '"');

                            // Overlays without an "end" are valid.
                            if (this.endEvent_) {
                                this.debug('unbound `endListener_` from "' + this.endEvent_ + '"');
                                this.off(this.player(), this.endEvent_, this.endListener_);
                            }

                            this.on(this.player(), this.startEvent_, this.startListener_);

                            return this;
                        }

                        /**
                         * Determine whether or not the overlay should hide.
                         *
                         * @param  {Number} time
                         *         The current time reported by the player.
                         * @param  {String} type
                         *         An event type.
                         * @return {Boolean}
                         */
                    }, {
                        key: 'shouldHide_',
                        value: function shouldHide_(time, type) {
                            var end = this.options_.end;

                            return isNumber(end) ? time >= end : end === type;
                        }

                        /**
                         * Overrides the inherited method to perform some event binding
                         *
                         * @return {Overlay}
                         */
                    }, {
                        key: 'show',
                        value: function show() {
                            _get(Object.getPrototypeOf(Overlay.prototype), 'show', this).call(this);
                            this.off(this.player(), this.startEvent_, this.startListener_);
                            this.debug('shown');
                            this.debug('unbound `startListener_` from "' + this.startEvent_ + '"');

                            // Overlays without an "end" are valid.
                            if (this.endEvent_) {
                                this.debug('bound `endListener_` to "' + this.endEvent_ + '"');
                                this.on(this.player(), this.endEvent_, this.endListener_);
                            }

                            return this;
                        }

                        /**
                         * Determine whether or not the overlay should show.
                         *
                         * @param  {Number} time
                         *         The current time reported by the player.
                         * @param  {String} type
                         *         An event type.
                         * @return {Boolean}
                         */
                    }, {
                        key: 'shouldShow_',
                        value: function shouldShow_(time, type) {
                            var start = this.options_.start;
                            var end = this.options_.end;

                            if (isNumber(start)) {

                                if (isNumber(end)) {
                                    return time >= start && time < end;

                                    // In this case, the start is a number and the end is a string. We need
                                    // to check whether or not the overlay has shown since the last seek.
                                } else if (!this.hasShownSinceSeek_) {
                                    this.hasShownSinceSeek_ = true;
                                    return time >= start;
                                }

                                // In this case, the start is a number and the end is a string, but
                                // the overlay has shown since the last seek. This means that we need
                                // to be sure we aren't re-showing it at a later time than it is
                                // scheduled to appear.
                                return Math.floor(time) === start;
                            }

                            return start === type;
                        }

                        /**
                         * Event listener that can trigger the overlay to show.
                         *
                         * @param  {Event} e
                         */
                    }, {
                        key: 'startListener_',
                        value: function startListener_(e) {
                            var time = this.player().currentTime();

                            if (this.shouldShow_(time, e.type)) {
                                this.show();
                            }
                        }

                        /**
                         * Event listener that can trigger the overlay to show.
                         *
                         * @param  {Event} e
                         */
                    }, {
                        key: 'endListener_',
                        value: function endListener_(e) {
                            var time = this.player().currentTime();

                            if (this.shouldHide_(time, e.type)) {
                                this.hide();
                            }
                        }

                        /**
                         * Event listener that can looks for rewinds - that is, backward seeks
                         * and may hide the overlay as needed.
                         *
                         * @param  {Event} e
                         */
                    }, {
                        key: 'rewindListener_',
                        value: function rewindListener_(e) {
                            var time = this.player().currentTime();
                            var previous = this.previousTime_;
                            var start = this.options_.start;
                            var end = this.options_.end;

                            // Did we seek backward?
                            if (time < previous) {
                                this.debug('rewind detected');

                                // The overlay remains visible if two conditions are met: the end value
                                // MUST be an integer and the the current time indicates that the
                                // overlay should NOT be visible.
                                if (isNumber(end) && !this.shouldShow_(time)) {
                                    this.debug((0, _tsmlj2['default'])(_templateObject2, end));
                                    this.hasShownSinceSeek_ = false;
                                    this.hide();

                                    // If the end value is an event name, we cannot reliably decide if the
                                    // overlay should still be displayed based solely on time; so, we can
                                    // only queue it up for showing if the seek took us to a point before
                                    // the start time.
                                } else if (hasNoWhitespace(end) && time < start) {
                                    this.debug((0, _tsmlj2['default'])(_templateObject3, start, time, end));
                                    this.hasShownSinceSeek_ = false;
                                    this.hide();
                                }
                            }

                            this.previousTime_ = time;
                        }
                    }]);

                    return Overlay;
                })(Component);

                _videoJs2['default'].registerComponent('Overlay', Overlay);

                /**
                 * Initialize the plugin.
                 *
                 * @function plugin
                 * @param    {Object} [options={}]
                 */
                var plugin = function plugin(options) {
                    var _this2 = this;

                    var settings = _videoJs2['default'].mergeOptions(defaults, options);

                    // De-initialize the plugin if it already has an array of overlays.
                    if (Array.isArray(this.overlays_)) {
                        this.overlays_.forEach(function(overlay) {
                            _this2.removeChild(overlay);
                            if (_this2.controlBar) {
                                _this2.controlBar.removeChild(overlay);
                            }
                            overlay.dispose();
                        });
                    }

                    var overlays = settings.overlays;

                    // We don't want to keep the original array of overlay options around
                    // because it doesn't make sense to pass it to each Overlay component.
                    delete settings.overlays;

                    this.overlays_ = overlays.map(function(o) {
                        var mergeOptions = _videoJs2['default'].mergeOptions(settings, o);

                        // Attach bottom aligned overlays to the control bar so
                        // they will adjust positioning when the control bar minimizes
                        if (mergeOptions.attachToControlBar && _this2.controlBar && mergeOptions.align.indexOf('bottom') !== -1) {
                            return _this2.controlBar.addChild('overlay', mergeOptions);
                        }

                        return _this2.addChild('overlay', mergeOptions);
                    });
                };

                plugin.VERSION = '1.1.4';

                registerPlugin('overlay', plugin);

                exports['default'] = plugin;
                module.exports = exports['default'];

            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

        }, { "global/window": 1, "tsmlj": 2 }]
    }, {}, [3])(3)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyIsIm5vZGVfbW9kdWxlcy90c21sai9pbmRleC5qcyIsIi9Vc2Vycy9wcmFzdHV0a3VtYXIvRGV2L2J1YmJsZS9idWJibGUtdmlkZW8tb3ZlcmxheS92aWRlb2pzLW92ZXJsYXkvc3JjL3BsdWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ1hrQixPQUFPOzs7O3VCQUNMLFVBQVU7Ozs7NEJBQ1gsZUFBZTs7OztBQUVsQyxJQUFNLFFBQVEsR0FBRztBQUNmLE9BQUssRUFBRSxVQUFVO0FBQ2pCLFdBQU8sRUFBRTtBQUNULFNBQU8sRUFBRSxzREFBc0Q7QUFDL0QsT0FBSyxFQUFFLEtBQUs7QUFDWixnQkFBYyxFQUFFLElBQUk7QUFDcEIsb0JBQWtCLEVBQUUsS0FBSztBQUN6QixVQUFRLEVBQUUsQ0FBQztBQUNULFNBQUssRUFBRSxTQUFTO0FBQ2hCLE9BQUcsRUFBRSxRQUFRO0dBQ2QsQ0FBQztDQUNILENBQUM7O0FBRUYsSUFBTSxTQUFTLEdBQUcscUJBQVEsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7QUFHcEQsSUFBTSxHQUFHLEdBQUcscUJBQVEsR0FBRyx3QkFBVyxDQUFDO0FBQ25DLElBQU0sY0FBYyxHQUFHLHFCQUFRLGNBQWMsSUFBSSxxQkFBUSxNQUFNLENBQUM7Ozs7Ozs7Ozs7OztBQVloRSxJQUFNLFFBQVEsR0FBRyxTQUFYLFFBQVEsQ0FBRyxDQUFDO1NBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxJQUFJLENB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UUFBSSxZQUFZLEdBQUcscUJBQVEsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7OztBQUlyRCxRQUFJLFlBQVksQ0FBQyxrQkFBa0IsSUFDL0IsT0FBSyxVQUFVLElBQ2YsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDL0MsYUFBTyxPQUFLLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0tBQzFEOztBQUVELFdBQU8sT0FBSyxRQUFRLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0dBQy9DLENBQUMsQ0FBQztDQUNKLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7O0FBRS9CLGNBQWMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7O3FCQUVuQixNQUFNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciB3aW47XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgd2luID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgd2luID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgd2luID0gc2VsZjtcbn0gZWxzZSB7XG4gICAgd2luID0ge307XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2luO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0c21saih0cykge1xuICB2YXIgb3V0ID0gJyc7XG4gIHZhciBpID0gMDtcblxuICAvLyBNYXRjaCBub3JtYWwgdGVtcGxhdGUgc3RyaW5nIGJlaGF2aW9yIHRvIGdldCB0aGUgZnVsbCwgZm9ybWF0dGVkIHN0cmluZy5cbiAgZm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBvdXQgKz0gdHNbaV0gKyAoYXJndW1lbnRzW2kgKyAxXSB8fCAnJyk7XG4gIH1cblxuICByZXR1cm4gb3V0LnJlcGxhY2UoL1xccysvZywgJyAnKS50cmltKCk7XG59O1xuIiwiaW1wb3J0IHRzbWxqIGZyb20gJ3RzbWxqJztcbmltcG9ydCB2aWRlb2pzIGZyb20gJ3ZpZGVvLmpzJztcbmltcG9ydCB3aW5kb3cgZnJvbSAnZ2xvYmFsL3dpbmRvdyc7XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBhbGlnbjogJ3RvcC1sZWZ0JyxcbiAgY2xhc3M6ICcnLFxuICBjb250ZW50OiAnVGhpcyBvdmVybGF5IHdpbGwgc2hvdyB1cCB3aGlsZSB0aGUgdmlkZW8gaXMgcGxheWluZycsXG4gIGRlYnVnOiBmYWxzZSxcbiAgc2hvd0JhY2tncm91bmQ6IHRydWUsXG4gIGF0dGFjaFRvQ29udHJvbEJhcjogZmFsc2UsXG4gIG92ZXJsYXlzOiBbe1xuICAgIHN0YXJ0OiAncGxheWluZycsXG4gICAgZW5kOiAncGF1c2VkJ1xuICB9XVxufTtcblxuY29uc3QgQ29tcG9uZW50ID0gdmlkZW9qcy5nZXRDb21wb25lbnQoJ0NvbXBvbmVudCcpO1xuXG4vLyBUaGVzZSBhcmUgZm9yIGNyb3NzLWNvbXBhdGliaWxpdHkgYmV0d2VlbiBWaWRlby5qcyA1IGFuZCA2LlxuY29uc3QgZG9tID0gdmlkZW9qcy5kb20gfHwgdmlkZW9qcztcbmNvbnN0IHJlZ2lzdGVyUGx1Z2luID0gdmlkZW9qcy5yZWdpc3RlclBsdWdpbiB8fCB2aWRlb2pzLnBsdWdpbjtcblxuLyoqXG4gKiBXaGV0aGVyIHRoZSB2YWx1ZSBpcyBhIGBOdW1iZXJgLlxuICpcbiAqIEJvdGggYEluZmluaXR5YCBhbmQgYC1JbmZpbml0eWAgYXJlIGFjY2VwdGVkLCBidXQgYE5hTmAgaXMgbm90LlxuICpcbiAqIEBwYXJhbSAge051bWJlcn0gblxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUgKi9cbmNvbnN0IGlzTnVtYmVyID0gbiA9PiB0eXBlb2YgbiA9PT0gJ251bWJlcicgJiYgbiA9PT0gbjtcbi8qIGVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlICovXG5cbi8qKlxuICogV2hldGhlciBhIHZhbHVlIGlzIGEgc3RyaW5nIHdpdGggbm8gd2hpdGVzcGFjZS5cbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHNcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmNvbnN0IGhhc05vV2hpdGVzcGFjZSA9IHMgPT4gdHlwZW9mIHMgPT09ICdzdHJpbmcnICYmICgvXlxcUyskLykudGVzdChzKTtcblxuLyoqXG4gKiBPdmVybGF5IGNvbXBvbmVudC5cbiAqXG4gKiBAY2xhc3MgICBPdmVybGF5XG4gKiBAZXh0ZW5kcyB7dmlkZW9qcy5Db21wb25lbnR9XG4gKi9cbmNsYXNzIE92ZXJsYXkgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHBsYXllciwgb3B0aW9ucykge1xuICAgIHN1cGVyKHBsYXllciwgb3B0aW9ucyk7XG5cbiAgICBbJ3N0YXJ0JywgJ2VuZCddLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IHRoaXMub3B0aW9uc19ba2V5XTtcblxuICAgICAgaWYgKGlzTnVtYmVyKHZhbHVlKSkge1xuICAgICAgICB0aGlzW2tleSArICdFdmVudF8nXSA9ICd0aW1ldXBkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAoaGFzTm9XaGl0ZXNwYWNlKHZhbHVlKSkge1xuICAgICAgICB0aGlzW2tleSArICdFdmVudF8nXSA9IHZhbHVlO1xuXG4gICAgICAvLyBBbiBvdmVybGF5IE1VU1QgaGF2ZSBhIHN0YXJ0IG9wdGlvbi4gT3RoZXJ3aXNlLCBpdCdzIHBvaW50bGVzcy5cbiAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnc3RhcnQnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBcInN0YXJ0XCIgb3B0aW9uOyBleHBlY3RlZCBudW1iZXIgb3Igc3RyaW5nJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyB2aWRlby5qcyBkb2VzIG5vdCBsaWtlIGNvbXBvbmVudHMgd2l0aCBtdWx0aXBsZSBpbnN0YW5jZXMgYmluZGluZ1xuICAgIC8vIGV2ZW50cyB0byB0aGUgcGxheWVyIGJlY2F1c2UgaXQgdHJhY2tzIHRoZW0gYXQgdGhlIHBsYXllciBsZXZlbCxcbiAgICAvLyBub3QgYXQgdGhlIGxldmVsIG9mIHRoZSBvYmplY3QgZG9pbmcgdGhlIGJpbmRpbmcuIFRoaXMgY291bGQgYWxzbyBiZVxuICAgIC8vIHNvbHZlZCB3aXRoIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIChidXQgbm90IHZpZGVvanMuYmluZCBiZWNhdXNlIG9mXG4gICAgLy8gaXRzIEdVSUQgbWFnaWMpLCBidXQgdGhlIGFub255bW91cyBmdW5jdGlvbiBhcHByb2FjaCBhdm9pZHMgYW55IGlzc3Vlc1xuICAgIC8vIGNhdXNlZCBieSBjcmFwcHkgbGlicmFyaWVzIGNsb2JiZXJpbmcgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuXG4gICAgLy8gLSBodHRwczovL2dpdGh1Yi5jb20vdmlkZW9qcy92aWRlby5qcy9pc3N1ZXMvMzA5N1xuICAgIFsnZW5kTGlzdGVuZXJfJywgJ3Jld2luZExpc3RlbmVyXycsICdzdGFydExpc3RlbmVyXyddLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICB0aGlzW25hbWVdID0gKGUpID0+IE92ZXJsYXkucHJvdG90eXBlW25hbWVdLmNhbGwodGhpcywgZSk7XG4gICAgfSk7XG5cbiAgICAvLyBJZiB0aGUgc3RhcnQgZXZlbnQgaXMgYSB0aW1ldXBkYXRlLCB3ZSBuZWVkIHRvIHdhdGNoIGZvciByZXdpbmRzIChpLmUuLFxuICAgIC8vIHdoZW4gdGhlIHVzZXIgc2Vla3MgYmFja3dhcmQpLlxuICAgIGlmICh0aGlzLnN0YXJ0RXZlbnRfID09PSAndGltZXVwZGF0ZScpIHtcbiAgICAgIHRoaXMub24ocGxheWVyLCAndGltZXVwZGF0ZScsIHRoaXMucmV3aW5kTGlzdGVuZXJfKTtcbiAgICB9XG5cbiAgICB0aGlzLmRlYnVnKHRzbWxqYFxuICAgICAgY3JlYXRlZCwgbGlzdGVuaW5nIHRvIFwiJHt0aGlzLnN0YXJ0RXZlbnRffVwiIGZvciBcInN0YXJ0XCIgYW5kXG4gICAgICBcIiR7dGhpcy5lbmRFdmVudF8gfHwgJ25vdGhpbmcnfVwiIGZvciBcImVuZFwiXG4gICAgYCk7XG5cbiAgICB0aGlzLmhpZGUoKTtcbiAgfVxuXG4gIGNyZWF0ZUVsKCkge1xuICAgIGxldCBvcHRpb25zID0gdGhpcy5vcHRpb25zXztcbiAgICBsZXQgY29udGVudCA9IG9wdGlvbnMuY29udGVudDtcblxuICAgIGxldCBiYWNrZ3JvdW5kID0gb3B0aW9ucy5zaG93QmFja2dyb3VuZCA/ICd2anMtb3ZlcmxheS1iYWNrZ3JvdW5kJyA6ICd2anMtb3ZlcmxheS1uby1iYWNrZ3JvdW5kJztcbiAgICBsZXQgZWwgPSBkb20uY3JlYXRlRWwoJ2RpdicsIHtcbiAgICAgIGNsYXNzTmFtZTogYFxuICAgICAgICB2anMtb3ZlcmxheVxuICAgICAgICB2anMtb3ZlcmxheS0ke29wdGlvbnMuYWxpZ259XG4gICAgICAgICR7b3B0aW9ucy5jbGFzc31cbiAgICAgICAgJHtiYWNrZ3JvdW5kfVxuICAgICAgICB2anMtaGlkZGVuXG4gICAgICBgXG4gICAgfSk7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbC5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIH0gZWxzZSBpZiAoY29udGVudCBpbnN0YW5jZW9mIHdpbmRvdy5Eb2N1bWVudEZyYWdtZW50KSB7XG4gICAgICBlbC5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9tLmFwcGVuZENvbnRlbnQoZWwsIGNvbnRlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dzIGRlYnVnIGVycm9yc1xuICAgKiBAcGFyYW0gIHsuLi5bdHlwZV19IGFyZ3MgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgKi9cbiAgZGVidWcoLi4uYXJncykge1xuICAgIGlmICghdGhpcy5vcHRpb25zXy5kZWJ1Zykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBsb2cgPSB2aWRlb2pzLmxvZztcbiAgICBsZXQgZm4gPSBsb2c7XG5cbiAgICAvLyBTdXBwb3J0IGB2aWRlb2pzLmxvZy5mb29gIGNhbGxzLlxuICAgIGlmIChsb2cuaGFzT3duUHJvcGVydHkoYXJnc1swXSkgJiYgdHlwZW9mIGxvZ1thcmdzWzBdXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZm4gPSBsb2dbYXJncy5zaGlmdCgpXTtcbiAgICB9XG5cbiAgICBmbiguLi5bYG92ZXJsYXkjJHt0aGlzLmlkKCl9OiBgLCAuLi5hcmdzXSk7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGVzIHRoZSBpbmhlcml0ZWQgbWV0aG9kIHRvIHBlcmZvcm0gc29tZSBldmVudCBiaW5kaW5nXG4gICAqXG4gICAqIEByZXR1cm4ge092ZXJsYXl9XG4gICAqL1xuICBoaWRlKCkge1xuICAgIHN1cGVyLmhpZGUoKTtcblxuICAgIHRoaXMuZGVidWcoJ2hpZGRlbicpO1xuICAgIHRoaXMuZGVidWcoYGJvdW5kIFxcYHN0YXJ0TGlzdGVuZXJfXFxgIHRvIFwiJHt0aGlzLnN0YXJ0RXZlbnRffVwiYCk7XG5cbiAgICAvLyBPdmVybGF5cyB3aXRob3V0IGFuIFwiZW5kXCIgYXJlIHZhbGlkLlxuICAgIGlmICh0aGlzLmVuZEV2ZW50Xykge1xuICAgICAgdGhpcy5kZWJ1ZyhgdW5ib3VuZCBcXGBlbmRMaXN0ZW5lcl9cXGAgZnJvbSBcIiR7dGhpcy5lbmRFdmVudF99XCJgKTtcbiAgICAgIHRoaXMub2ZmKHRoaXMucGxheWVyKCksIHRoaXMuZW5kRXZlbnRfLCB0aGlzLmVuZExpc3RlbmVyXyk7XG4gICAgfVxuXG4gICAgdGhpcy5vbih0aGlzLnBsYXllcigpLCB0aGlzLnN0YXJ0RXZlbnRfLCB0aGlzLnN0YXJ0TGlzdGVuZXJfKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB3aGV0aGVyIG9yIG5vdCB0aGUgb3ZlcmxheSBzaG91bGQgaGlkZS5cbiAgICpcbiAgICogQHBhcmFtICB7TnVtYmVyfSB0aW1lXG4gICAqICAgICAgICAgVGhlIGN1cnJlbnQgdGltZSByZXBvcnRlZCBieSB0aGUgcGxheWVyLlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHR5cGVcbiAgICogICAgICAgICBBbiBldmVudCB0eXBlLlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgc2hvdWxkSGlkZV8odGltZSwgdHlwZSkge1xuICAgIGxldCBlbmQgPSB0aGlzLm9wdGlvbnNfLmVuZDtcblxuICAgIHJldHVybiBpc051bWJlcihlbmQpID8gKHRpbWUgPj0gZW5kKSA6IGVuZCA9PT0gdHlwZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZXMgdGhlIGluaGVyaXRlZCBtZXRob2QgdG8gcGVyZm9ybSBzb21lIGV2ZW50IGJpbmRpbmdcbiAgICpcbiAgICogQHJldHVybiB7T3ZlcmxheX1cbiAgICovXG4gIHNob3coKSB7XG4gICAgc3VwZXIuc2hvdygpO1xuICAgIHRoaXMub2ZmKHRoaXMucGxheWVyKCksIHRoaXMuc3RhcnRFdmVudF8sIHRoaXMuc3RhcnRMaXN0ZW5lcl8pO1xuICAgIHRoaXMuZGVidWcoJ3Nob3duJyk7XG4gICAgdGhpcy5kZWJ1ZyhgdW5ib3VuZCBcXGBzdGFydExpc3RlbmVyX1xcYCBmcm9tIFwiJHt0aGlzLnN0YXJ0RXZlbnRffVwiYCk7XG5cbiAgICAvLyBPdmVybGF5cyB3aXRob3V0IGFuIFwiZW5kXCIgYXJlIHZhbGlkLlxuICAgIGlmICh0aGlzLmVuZEV2ZW50Xykge1xuICAgICAgdGhpcy5kZWJ1ZyhgYm91bmQgXFxgZW5kTGlzdGVuZXJfXFxgIHRvIFwiJHt0aGlzLmVuZEV2ZW50X31cImApO1xuICAgICAgdGhpcy5vbih0aGlzLnBsYXllcigpLCB0aGlzLmVuZEV2ZW50XywgdGhpcy5lbmRMaXN0ZW5lcl8pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB3aGV0aGVyIG9yIG5vdCB0aGUgb3ZlcmxheSBzaG91bGQgc2hvdy5cbiAgICpcbiAgICogQHBhcmFtICB7TnVtYmVyfSB0aW1lXG4gICAqICAgICAgICAgVGhlIGN1cnJlbnQgdGltZSByZXBvcnRlZCBieSB0aGUgcGxheWVyLlxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHR5cGVcbiAgICogICAgICAgICBBbiBldmVudCB0eXBlLlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgc2hvdWxkU2hvd18odGltZSwgdHlwZSkge1xuICAgIGxldCBzdGFydCA9IHRoaXMub3B0aW9uc18uc3RhcnQ7XG4gICAgbGV0IGVuZCA9IHRoaXMub3B0aW9uc18uZW5kO1xuXG4gICAgaWYgKGlzTnVtYmVyKHN0YXJ0KSkge1xuXG4gICAgICBpZiAoaXNOdW1iZXIoZW5kKSkge1xuICAgICAgICByZXR1cm4gdGltZSA+PSBzdGFydCAmJiB0aW1lIDwgZW5kO1xuXG4gICAgICAvLyBJbiB0aGlzIGNhc2UsIHRoZSBzdGFydCBpcyBhIG51bWJlciBhbmQgdGhlIGVuZCBpcyBhIHN0cmluZy4gV2UgbmVlZFxuICAgICAgLy8gdG8gY2hlY2sgd2hldGhlciBvciBub3QgdGhlIG92ZXJsYXkgaGFzIHNob3duIHNpbmNlIHRoZSBsYXN0IHNlZWsuXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLmhhc1Nob3duU2luY2VTZWVrXykge1xuICAgICAgICB0aGlzLmhhc1Nob3duU2luY2VTZWVrXyA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aW1lID49IHN0YXJ0O1xuICAgICAgfVxuXG4gICAgICAvLyBJbiB0aGlzIGNhc2UsIHRoZSBzdGFydCBpcyBhIG51bWJlciBhbmQgdGhlIGVuZCBpcyBhIHN0cmluZywgYnV0XG4gICAgICAvLyB0aGUgb3ZlcmxheSBoYXMgc2hvd24gc2luY2UgdGhlIGxhc3Qgc2Vlay4gVGhpcyBtZWFucyB0aGF0IHdlIG5lZWRcbiAgICAgIC8vIHRvIGJlIHN1cmUgd2UgYXJlbid0IHJlLXNob3dpbmcgaXQgYXQgYSBsYXRlciB0aW1lIHRoYW4gaXQgaXNcbiAgICAgIC8vIHNjaGVkdWxlZCB0byBhcHBlYXIuXG4gICAgICByZXR1cm4gTWF0aC5mbG9vcih0aW1lKSA9PT0gc3RhcnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0ID09PSB0eXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGxpc3RlbmVyIHRoYXQgY2FuIHRyaWdnZXIgdGhlIG92ZXJsYXkgdG8gc2hvdy5cbiAgICpcbiAgICogQHBhcmFtICB7RXZlbnR9IGVcbiAgICovXG4gIHN0YXJ0TGlzdGVuZXJfKGUpIHtcbiAgICBsZXQgdGltZSA9IHRoaXMucGxheWVyKCkuY3VycmVudFRpbWUoKTtcblxuICAgIGlmICh0aGlzLnNob3VsZFNob3dfKHRpbWUsIGUudHlwZSkpIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBsaXN0ZW5lciB0aGF0IGNhbiB0cmlnZ2VyIHRoZSBvdmVybGF5IHRvIHNob3cuXG4gICAqXG4gICAqIEBwYXJhbSAge0V2ZW50fSBlXG4gICAqL1xuICBlbmRMaXN0ZW5lcl8oZSkge1xuICAgIGxldCB0aW1lID0gdGhpcy5wbGF5ZXIoKS5jdXJyZW50VGltZSgpO1xuXG4gICAgaWYgKHRoaXMuc2hvdWxkSGlkZV8odGltZSwgZS50eXBlKSkge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEV2ZW50IGxpc3RlbmVyIHRoYXQgY2FuIGxvb2tzIGZvciByZXdpbmRzIC0gdGhhdCBpcywgYmFja3dhcmQgc2Vla3NcbiAgICogYW5kIG1heSBoaWRlIHRoZSBvdmVybGF5IGFzIG5lZWRlZC5cbiAgICpcbiAgICogQHBhcmFtICB7RXZlbnR9IGVcbiAgICovXG4gIHJld2luZExpc3RlbmVyXyhlKSB7XG4gICAgbGV0IHRpbWUgPSB0aGlzLnBsYXllcigpLmN1cnJlbnRUaW1lKCk7XG4gICAgbGV0IHByZXZpb3VzID0gdGhpcy5wcmV2aW91c1RpbWVfO1xuICAgIGxldCBzdGFydCA9IHRoaXMub3B0aW9uc18uc3RhcnQ7XG4gICAgbGV0IGVuZCA9IHRoaXMub3B0aW9uc18uZW5kO1xuXG4gICAgLy8gRGlkIHdlIHNlZWsgYmFja3dhcmQ/XG4gICAgaWYgKHRpbWUgPCBwcmV2aW91cykge1xuICAgICAgdGhpcy5kZWJ1ZygncmV3aW5kIGRldGVjdGVkJyk7XG5cbiAgICAgIC8vIFRoZSBvdmVybGF5IHJlbWFpbnMgdmlzaWJsZSBpZiB0d28gY29uZGl0aW9ucyBhcmUgbWV0OiB0aGUgZW5kIHZhbHVlXG4gICAgICAvLyBNVVNUIGJlIGFuIGludGVnZXIgYW5kIHRoZSB0aGUgY3VycmVudCB0aW1lIGluZGljYXRlcyB0aGF0IHRoZVxuICAgICAgLy8gb3ZlcmxheSBzaG91bGQgTk9UIGJlIHZpc2libGUuXG4gICAgICBpZiAoaXNOdW1iZXIoZW5kKSAmJiAhdGhpcy5zaG91bGRTaG93Xyh0aW1lKSkge1xuICAgICAgICB0aGlzLmRlYnVnKHRzbWxqYFxuICAgICAgICAgIGhpZGluZzsgJHtlbmR9IGlzIGFuIGludGVnZXIgYW5kIG92ZXJsYXkgc2hvdWxkIG5vdCBzaG93IGF0IHRoaXMgdGltZVxuICAgICAgICBgKTtcbiAgICAgICAgdGhpcy5oYXNTaG93blNpbmNlU2Vla18gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG5cbiAgICAgIC8vIElmIHRoZSBlbmQgdmFsdWUgaXMgYW4gZXZlbnQgbmFtZSwgd2UgY2Fubm90IHJlbGlhYmx5IGRlY2lkZSBpZiB0aGVcbiAgICAgIC8vIG92ZXJsYXkgc2hvdWxkIHN0aWxsIGJlIGRpc3BsYXllZCBiYXNlZCBzb2xlbHkgb24gdGltZTsgc28sIHdlIGNhblxuICAgICAgLy8gb25seSBxdWV1ZSBpdCB1cCBmb3Igc2hvd2luZyBpZiB0aGUgc2VlayB0b29rIHVzIHRvIGEgcG9pbnQgYmVmb3JlXG4gICAgICAvLyB0aGUgc3RhcnQgdGltZS5cbiAgICAgIH0gZWxzZSBpZiAoaGFzTm9XaGl0ZXNwYWNlKGVuZCkgJiYgdGltZSA8IHN0YXJ0KSB7XG4gICAgICAgIHRoaXMuZGVidWcodHNtbGpgXG4gICAgICAgICAgaGlkaW5nOyBzaG93IHBvaW50ICgke3N0YXJ0fSkgaXMgYmVmb3JlIG5vdyAoJHt0aW1lfSkgYW5kIGVuZFxuICAgICAgICAgIHBvaW50ICgke2VuZH0pIGlzIGFuIGV2ZW50XG4gICAgICAgIGApO1xuICAgICAgICB0aGlzLmhhc1Nob3duU2luY2VTZWVrXyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnByZXZpb3VzVGltZV8gPSB0aW1lO1xuICB9XG59XG5cbnZpZGVvanMucmVnaXN0ZXJDb21wb25lbnQoJ092ZXJsYXknLCBPdmVybGF5KTtcblxuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBwbHVnaW4uXG4gKlxuICogQGZ1bmN0aW9uIHBsdWdpblxuICogQHBhcmFtICAgIHtPYmplY3R9IFtvcHRpb25zPXt9XVxuICovXG5jb25zdCBwbHVnaW4gPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIGNvbnN0IHNldHRpbmdzID0gdmlkZW9qcy5tZXJnZU9wdGlvbnMoZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gIC8vIERlLWluaXRpYWxpemUgdGhlIHBsdWdpbiBpZiBpdCBhbHJlYWR5IGhhcyBhbiBhcnJheSBvZiBvdmVybGF5cy5cbiAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5vdmVybGF5c18pKSB7XG4gICAgdGhpcy5vdmVybGF5c18uZm9yRWFjaChvdmVybGF5ID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGQob3ZlcmxheSk7XG4gICAgICBpZiAodGhpcy5jb250cm9sQmFyKSB7XG4gICAgICAgIHRoaXMuY29udHJvbEJhci5yZW1vdmVDaGlsZChvdmVybGF5KTtcbiAgICAgIH1cbiAgICAgIG92ZXJsYXkuZGlzcG9zZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3Qgb3ZlcmxheXMgPSBzZXR0aW5ncy5vdmVybGF5cztcblxuICAvLyBXZSBkb24ndCB3YW50IHRvIGtlZXAgdGhlIG9yaWdpbmFsIGFycmF5IG9mIG92ZXJsYXkgb3B0aW9ucyBhcm91bmRcbiAgLy8gYmVjYXVzZSBpdCBkb2Vzbid0IG1ha2Ugc2Vuc2UgdG8gcGFzcyBpdCB0byBlYWNoIE92ZXJsYXkgY29tcG9uZW50LlxuICBkZWxldGUgc2V0dGluZ3Mub3ZlcmxheXM7XG5cbiAgdGhpcy5vdmVybGF5c18gPSBvdmVybGF5cy5tYXAobyA9PiB7XG4gICAgbGV0IG1lcmdlT3B0aW9ucyA9IHZpZGVvanMubWVyZ2VPcHRpb25zKHNldHRpbmdzLCBvKTtcblxuICAgIC8vIEF0dGFjaCBib3R0b20gYWxpZ25lZCBvdmVybGF5cyB0byB0aGUgY29udHJvbCBiYXIgc29cbiAgICAvLyB0aGV5IHdpbGwgYWRqdXN0IHBvc2l0aW9uaW5nIHdoZW4gdGhlIGNvbnRyb2wgYmFyIG1pbmltaXplc1xuICAgIGlmIChtZXJnZU9wdGlvbnMuYXR0YWNoVG9Db250cm9sQmFyICYmXG4gICAgICAgIHRoaXMuY29udHJvbEJhciAmJlxuICAgICAgICBtZXJnZU9wdGlvbnMuYWxpZ24uaW5kZXhPZignYm90dG9tJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb250cm9sQmFyLmFkZENoaWxkKCdvdmVybGF5JywgbWVyZ2VPcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5hZGRDaGlsZCgnb3ZlcmxheScsIG1lcmdlT3B0aW9ucyk7XG4gIH0pO1xufTtcblxucGx1Z2luLlZFUlNJT04gPSAnX19WRVJTSU9OX18nO1xuXG5yZWdpc3RlclBsdWdpbignb3ZlcmxheScsIHBsdWdpbik7XG5cbmV4cG9ydCBkZWZhdWx0IHBsdWdpbjtcbiJdfQ==