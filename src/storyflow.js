const StoryFlow = {
  "default": {
    "source": "video.mp4",
    "description": ""
  },

  // 0 ~ 30
  "001": {
    "start_time": 0,
    "end_time": 30,
    "options": [
      { "next": "002", "value": "goto 30" },
      { "next": "001", "value": "goto 0" },
    ]
  },

  // 30 ~ 60
  "002": {
    "start_time": 30,
    "end_time": 60,
    "options": [
      { "next": "003", "value": "goto 60" },
      { "next": "002", "value": "goto 30" },
      { "next": "001", "value": "goto 0" },
    ]
  },

  // 60 ~ 90
  "003": {
    "start_time": 60,
    "end_time": 90,
    "options": [
      { "next": "004", "value": "goto 90" },
      { "next": "003", "value": "goto 60" },
      { "next": "002", "value": "goto 30" },
      { "next": "001", "value": "goto 0" },
    ]
  },

  // 90 ~
  "004": {
    "start_time": 90,
    "end_time": null
  }
};

export default StoryFlow;
