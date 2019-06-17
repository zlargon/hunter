const StoryFlow = {
  "default": {
    "source": "video.mp4",
    "description": ""
  },

  // begin
  "begin": {
    "start_time": "00:00:00.00",
    "end_time": "00:00:30.00",
    "options": [
      "01:00",
      "00:30",
      "begin",
    ]
  },

  // 00:30
  "00:30": {
    "start_time": "00:00:30.00",
    "end_time": "00:01:00.00",
    "options": [
      "01:30",
      "01:00",
      "00:30",
    ]
  },

  // 01:00
  "01:00": {
    "start_time": "00:01:00.00",
    "end_time": "00:01:30.00",
    "options": [
      "02:00",
      "01:30",
      "01:00",
    ]
  },

  // 01:30
  "01:30": {
    "start_time": "00:01:30.00",
    "end_time": "00:02:00.00",
    "options": [
      "02:30",
      "02:00",
      "01:30",
    ]
  },

  // 02:00
  "02:00": {
    "start_time": "00:02:00.00",
    "end_time": "00:02:30.00",
    "options": [
      "03:00",
      "02:30",
      "02:00",
    ]
  },

  // 02:30
  "02:30": {
    "start_time": "00:02:30.00",
    "end_time": "00:03:00.00",
    "options": [
      "03:30",
      "03:00",
      "02:30",
    ]
  },

  // 03:00
  "03:00": {
    "start_time": "00:03:00.00",
    "end_time": "00:03:30.00",
    "options": [
      "end",
      "03:30",
      "03:00",
    ]
  },

  // 03:30
  "03:30": {
    "start_time": "00:03:30.00",
    "end_time": "00:04:00.00",
    "options": [
      "end",
      "03:30",
    ]
  },

  // end
  "end": {
    "start_time": "00:04:00.00",
    "end_time": null
  },
};

const toSecond = (timeStr) => {
  try {
    const t = timeStr.split(':').map(parseFloat);
    return t[0] * 24 + t[1] * 60 + t[2];
  } catch (e) {
    return null;
  }
}

export default (name = 'begin') => {
  const plot = StoryFlow[name];
  return {
    name,
    ...plot,
    start_time: toSecond(plot.start_time),
    end_time: toSecond(plot.end_time)
  }
};

