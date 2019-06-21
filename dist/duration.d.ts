export default class Duration {
    private duration;
    private unit;
    static readonly INPUT_TYPES: {
        unit: string;
        millisecondValue: number;
    }[];
    private _millisecond;
    constructor(duration: number, unit?: string);
    millisecond: number;
    private convertToMillisecond;
    format(token: string, option?: any): string;
    add(value: number, unit?: string): Duration;
    sub(value: number, unit?: string): Duration;
}
