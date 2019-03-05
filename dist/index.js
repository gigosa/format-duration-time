"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Duration = /** @class */ (function () {
    function Duration(duration, unit) {
        if (unit === void 0) { unit = 's'; }
        var _this = this;
        this.duration = duration;
        this.unit = unit;
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.getHour = function (duration) {
            _this.hour = Math.floor(duration / 3600000);
            return _this.hour;
        };
        this.getMinute = function (duration) {
            _this.minute = Math.floor((duration - _this.hour * 3600000) / 60000);
            return _this.minute;
        };
        this.getSecond = function (duration) {
            _this.second = Math.floor((duration - _this.hour * 3600000
                - _this.minute * 60000) / 1000);
            return _this.second;
        };
        this.formatTokenFunctions = {};
        this.formatFunctions = {};
        this.millisecond = Duration.convertToMillisecond(duration, unit);
        this.addFormatToken('s', 0, this.getSecond);
        this.addFormatToken('h', 0, this.getHour);
        this.addFormatToken('m', 0, this.getMinute);
        this.addFormatToken('mm', 2, this.getMinute);
    }
    Duration.convertToMillisecond = function (value, type) {
        var millisecondValue = Duration.INPUT_TYPES.filter(function (v) { return v.type === type; })[0].millisecondValue;
        return value * millisecondValue;
    };
    Duration.zeroPad = function (value, length) {
        var s = String(value);
        if (s.length >= length)
            return s;
        while (s.length < length)
            s = '0' + s;
        return s;
    };
    Duration.prototype.addFormatToken = function (token, pad, callback) {
        var func = callback;
        this.formatTokenFunctions[token] = function (duration) { return Duration.zeroPad(func(duration), pad); };
    };
    Duration.prototype.makeFormatFunction = function (format) {
        var matched = format.match(Duration.FORMAT_TOKENS);
        if (matched === null)
            return function () { };
        var functionArray = [];
        for (var _i = 0, matched_1 = matched; _i < matched_1.length; _i++) {
            var token = matched_1[_i];
            if (this.formatTokenFunctions[token]) {
                functionArray.push(this.formatTokenFunctions[token]);
            }
            else {
                functionArray.push(token);
            }
        }
        return function (duration) {
            var output = '';
            for (var _i = 0, functionArray_1 = functionArray; _i < functionArray_1.length; _i++) {
                var func = functionArray_1[_i];
                if (typeof func === 'function') {
                    output += func(duration);
                }
                else {
                    output += func;
                }
            }
            return output;
        };
    };
    Duration.prototype.format = function (format) {
        // TODO: 0になった桁を表示するかしないかのオプションを受け取れるようにする
        this.formatFunctions[format] = this.makeFormatFunction(format);
        return this.formatFunctions[format](this.millisecond);
    };
    Duration.FORMAT_TOKENS = /\*?[Hh]|\*?m+|\*?s+|./g;
    Duration.INPUT_TYPES = [
        {
            type: 's',
            millisecondValue: 1000
        }
    ];
    return Duration;
}());
exports.default = Duration;
