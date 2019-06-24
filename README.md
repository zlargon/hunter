# The Hunter

An Interactive Film

# Story Flow

https://www.lucidchart.com/invitations/accept/44e6f3f8-864e-4875-902b-7a9a0b526f52

```js
"part 1": {                     // plot's unique name
  "source": "video.mp4",        // video source
  "start_time": "00:01:18.17",  // the start time of the plot
  "end_time": "00:01:20.99",    // the end time of the plot
  "select_time": 15,            // the time for making decision (optional)

  "next": [                     // empty array -> ending
    "speak",                    // only one    -> goto the plot directly at end_time
    "stay quite"                // multiple    -> show all options
  ]
}
```
