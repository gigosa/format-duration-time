"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValueFormatter = /** @class */ (function () {
    function ValueFormatter(value) {
        this.value = value;
    }
    ValueFormatter.prototype.zeroPad = function (length) {
        var s = this.value;
        if (s.length >= length)
            return s;
        while (s.length < length)
            s = "0" + s;
        return s;
    };
    ValueFormatter.prototype.addDigitSeparator = function (digitSeparator) {
        var parts = String(this.value).split('.');
        parts[0] = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + digitSeparator);
        return parts.join('.');
    };
    return ValueFormatter;
}());
exports.default = ValueFormatter;
