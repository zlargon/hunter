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
      { "next": "003", "value": "01:00" },
      { "next": "002", "value": "00:30" },
      { "next": "001", "value": "00:00" },
    ]
  },

  // 30 ~ 60
  "002": {
    "start_time": 30,
    "end_time": 60,
    "options": [
      { "next": "004", "value": "01:30" },
      { "next": "003", "value": "01:00" },
      { "next": "002", "value": "00:30" },
    ]
  },

  // 60 ~ 90
  "003": {
    "start_time": 60,
    "end_time": 90,
    "options": [
      { "next": "005", "value": "02:00" },
      { "next": "004", "value": "01:30" },
      { "next": "003", "value": "01:00" },
    ]
  },

  // 90 ~ 120
  "004": {
    "start_time": 90,
    "end_time": 120,
    "options": [
      { "next": "006", "value": "02:30" },
      { "next": "005", "value": "02:00" },
      { "next": "004", "value": "01:30" },
    ]
  },

  // 120 ~ 150
  "005": {
    "start_time": 120,
    "end_time": 150,
    "options": [
      { "next": "007", "value": "03:00" },
      { "next": "006", "value": "02:30" },
      { "next": "005", "value": "02:00" },
    ]
  },

  // 150 ~ 180
  "006": {
    "start_time": 150,
    "end_time": 180,
    "options": [
      { "next": "008", "value": "03:30" },
      { "next": "007", "value": "03:00" },
      { "next": "006", "value": "02:30" },
    ]
  },

  // 180 ~ 210
  "007": {
    "start_time": 180,
    "end_time": 210,
    "options": [
      { "next": "009", "value": "04:00" },
      { "next": "008", "value": "03:30" },
      { "next": "007", "value": "03:00" },
    ]
  },

  // 210 ~ 240
  "008": {
    "start_time": 210,
    "end_time": 240,
    "options": [
      { "next": "009", "value": "04:00" },
      { "next": "008", "value": "03:30" },
    ]
  },

  // 240
  "009": {
    "start_time": 240,
    "end_time": null
  },
};

export default StoryFlow;
