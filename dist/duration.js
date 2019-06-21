"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var formater_1 = __importDefault(require("./formater"));
var Duration = /** @class */ (function () {
    function Duration(duration, unit) {
        if (unit === void 0) { unit = 'S'; }
        this.duration = duration;
        this.unit = unit;
        this._millisecond = this.convertToMillisecond();
    }
    Object.defineProperty(Duration.prototype, "millisecond", {
        get: function () {
            return this._millisecond;
        },
        set: function (millisecond) {
            this._millisecond = millisecond;
        },
        enumerable: true,
        configurable: true
    });
    Duration.prototype.convertToMillisecond = function () {
        var _this = this;
        var millisecondValue = Duration.INPUT_TYPES.filter(function (v) { return v.unit === _this.unit; })[0].millisecondValue;
        return this.duration * millisecondValue;
    };
    Duration.prototype.format = function (token, option) {
        if (option === void 0) { option = {}; }
        var formatter = new formater_1.default(this, token, option);
        return formatter.format();
    };
    Duration.prototype.add = function (value, unit) {
        if (unit === void 0) { unit = 'S'; }
        var addDuration = new Duration(value, unit);
        addDuration.millisecond += this._millisecond;
        return addDuration;
    };
    Duration.prototype.sub = function (value, unit) {
        if (unit === void 0) { unit = 'S'; }
        var subDuration = new Duration(value, unit);
        subDuration.millisecond = this._millisecond - subDuration.millisecond;
        return subDuration;
    };
    Duration.INPUT_TYPES = [
        {
            unit: 'S',
            millisecondValue: 1,
        },
        {
            unit: 's',
            millisecondValue: 1000,
        },
        {
            unit: 'm',
            millisecondValue: 60000,
        },
        {
            unit: 'h',
            millisecondValue: 3600000,
        },
        {
            unit: 'd',
            millisecondValue: 86400000,
        },
    ];
    return Duration;
}());
exports.default = Duration;
