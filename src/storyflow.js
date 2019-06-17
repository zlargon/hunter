const StoryFlow = {
  "default": {
    "source": "video.mp4",
    "description": ""
  },

  // 00:00
  "00:00": {
    "start_time": 0,
    "end_time": 30,
    "options": [
      "01:00",
      "00:30",
      "00:00",
    ]
  },

  // 00:30
  "00:30": {
    "start_time": 30,
    "end_time": 60,
    "options": [
      "01:30",
      "01:00",
      "00:30",
    ]
  },

  // 01:00
  "01:00": {
    "start_time": 60,
    "end_time": 90,
    "options": [
      "02:00",
      "01:30",
      "01:00",
    ]
  },

  // 01:30
  "01:30": {
    "start_time": 90,
    "end_time": 120,
    "options": [
      "02:30",
      "02:00",
      "01:30",
    ]
  },

  // 02:00
  "02:00": {
    "start_time": 120,
    "end_time": 150,
    "options": [
      "03:00",
      "02:30",
      "02:00",
    ]
  },

  // 02:30
  "02:30": {
    "start_time": 150,
    "end_time": 180,
    "options": [
      "03:30",
      "03:00",
      "02:30",
    ]
  },

  // 03:00
  "03:00": {
    "start_time": 180,
    "end_time": 210,
    "options": [
      "04:00",
      "03:30",
      "03:00",
    ]
  },

  // 03:30
  "03:30": {
    "start_time": 210,
    "end_time": 240,
    "options": [
      "04:00",
      "03:30",
    ]
  },

  // 04:00
  "04:00": {
    "start_time": 240,
    "end_time": null
  },
};

export default StoryFlow;
