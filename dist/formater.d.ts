import Duration from './duration';
export default class Formater {
    private duration;
    private input;
    private options;
    private _hour;
    private _minute;
    private _second;
    private _milliSecond;
    private _inputTokens;
    static readonly FORMAT_EXPRESSION: RegExp;
    static readonly TYPE_ORDER: string[];
    constructor(duration: Duration, input: string, options?: any);
    private formatFunction;
    format(): string;
}
