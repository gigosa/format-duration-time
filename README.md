# format-duration-time
Format duration to time

## Usage

```
const Duration = require('path/to/format-duration-time').default;

const minute = new Duration(360);
minute.format('m'); // 6

const hourMinute = new Duration(3660);
hourMinute.format('h:mm'); //1:01
```

### format tokens

||token|examples|
|-|-|-|
|Hour|h|1, 2, 3, ...|
|Minute|m <br> mm|1, 2, 3, ..., 60 <br> 01, 02, 03, ..., 60|
