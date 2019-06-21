"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var formatTokens_1 = __importDefault(require("./formatTokens"));
var paddingZero_1 = __importDefault(require("./lib/paddingZero"));
var digitSeparator_1 = __importDefault(require("./lib/digitSeparator"));
var Formater = /** @class */ (function () {
    function Formater(duration, input, options) {
        if (options === void 0) { options = {}; }
        this.duration = duration;
        this.input = input;
        this.options = options;
        this._hour = 0;
        this._minute = 0;
        this._second = 0;
        this._milliSecond = 0;
        var inputTokens = input.match(Formater.FORMAT_EXPRESSION);
        if (inputTokens === null)
            throw new Error('invalid token!');
        this._inputTokens = inputTokens.map(function (inputToken) {
            var matchedToken = Object.keys(formatTokens_1.default).filter(function (token) {
                var regexp = new RegExp("^" + token + "+$");
                return regexp.exec(inputToken);
            })[0];
            return matchedToken ? { type: formatTokens_1.default[matchedToken].type, token: inputToken, value: 0 } : { type: 'text', token: inputToken, value: '' };
        });
    }
    Formater.prototype.formatFunction = function (token, milliSecond, isSmallest) {
        var firstToken = token.slice(0, 1);
        if (formatTokens_1.default[firstToken] && typeof formatTokens_1.default[firstToken].func === 'function') {
            var _a = formatTokens_1.default[firstToken].func(milliSecond, this.options, isSmallest), value = _a[0], restMilliSecond = _a[1];
            var formattedValue = String(value);
            formattedValue = paddingZero_1.default(formattedValue, token.length);
            if (this.options.digitSeparator) {
                formattedValue = digitSeparator_1.default(formattedValue, this.options.digitSeparator);
            }
            return [formattedValue, restMilliSecond];
        }
        return [token.replace(/^\[/, '').replace(/\]$/, ''), milliSecond];
    };
    Formater.prototype.format = function () {
        var _this = this;
        if (this._inputTokens === null)
            return '';
        var milliSecond = this.duration.millisecond;
        var index = 0;
        Formater.TYPE_ORDER.forEach(function (type) {
            _this._inputTokens.forEach(function (inputToken) {
                var _a;
                if (type === inputToken.type) {
                    index += 1;
                    var isSmallest = index === _this._inputTokens.length;
                    // eslint-disable-next-line no-param-reassign
                    _a = _this.formatFunction(inputToken.token, milliSecond, isSmallest), inputToken.value = _a[0], milliSecond = _a[1];
                }
            });
        });
        return this._inputTokens.map(function (inputToken) { return inputToken.value; }).join('');
    };
    Formater.FORMAT_EXPRESSION = /\[.+?\]|\*?d+|\*?[Hh]+|\*?m+|\*?s+|\*?S+|./g;
    Formater.TYPE_ORDER = ['text', 'day', 'hour', 'minute', 'second', 'millisecond'];
    return Formater;
}());
exports.default = Formater;
