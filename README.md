# format-duration-time
Format duration to time

## Usage

```
const Duration = require('path/to/format-duration-time').default;

const second = new Duration(100);
second.format('s'); // 100

const minute = new Duration(6000);
minute.format('m'); // 100

const hourMinute = new Duration(3660);
hourMinute.format('h:mm'); //1:01
```

### format tokens

||token|examples|
|-|-|-|
|Hour|h|1, 2, 3, ...|
|Minute|m <br> mm|1, 2, 3, ...,  <br> 01, 02, 03, ..., |
