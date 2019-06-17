const StoryFlow = {
  "default": {
    "source": "video.mp4",
    "description": ""
  },

  "begin": {
    start_time: "000:0:00.00",
    end_time: "000:0:30.00",
    "options": [
      "Let Sam Quite",
      "Let Sam Talk"
    ]
  },

  "Let Sam Quite": {
    "start_time": "00:00:30.00",
    "end_time": "00:00:50.00",
    "next": "end"
  },

  "Let Sam Talk": {
    "start_time": "00:01:00.00",
    "end_time": "00:02:00.00",
    "next": "end"
  },

  "end": {
    "start_time": "00:02:00.00",
    "end_time": null
  }
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

