"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Duration = /** @class */ (function () {
    function Duration(duration, unit) {
        if (unit === void 0) { unit = 's'; }
        this.duration = duration;
        this.unit = unit;
        this.formatTokenFunctions = {};
        this.formatFunctions = {};
        this.addFormatToken('h', 0, Duration.getHour);
        this.addFormatToken('m', 0, Duration.getMinute);
        this.addFormatToken('mm', 2, Duration.getMinute);
    }
    Duration.getHour = function (duration) {
        return Math.floor(duration / 3600);
    };
    Duration.getMinute = function (duration) {
        return Math.floor(duration % 3600 / 60);
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
        return this.formatFunctions[format](this.duration);
    };
    Duration.FORMAT_TOKENS = /\*?[Hh]|\*?m+|\*?s+|./g;
    return Duration;
}());
exports.default = Duration;
