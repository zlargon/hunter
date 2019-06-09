const StoryFlow = {
  "default": {
    "source": "video.mp4",
    "description": ""
  },

  // 0 ~ 20
  "001": {
    "start_time": 0,
    "end_time": 20,
    "options": [
      { "next": "001", "value": "goto 0" },
      { "next": "002", "value": "goto 30" },
    ]
  },

  // 30 ~ 60
  "002": {
    "start_time": 30,
    "end_time": 60,
    "options": [
      { "next": "001", "value": "goto 0" },
      { "next": "003", "value": "goto 60" },
    ]
  },

  // 60 ~ 80
  "003": {
    "start_time": 60,
    "end_time": 80,
    "options": [
      { "next": "001", "value": "goto 0" },
      { "next": "004", "value": "goto 100" },
    ]
  },

  // 100 ~
  "004": {
    "start_time": 100,
    "end_time": null
  }
};

export default StoryFlow;
