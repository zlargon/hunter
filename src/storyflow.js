const StoryFlow = {
  "default": {
    "source": "video.mp4",
    "description": ""
  },

  "begin": {
    start_time: "00:00:00.00",
    end_time: "00:00:00.00",
    next: "Part 1"
  },

  "Part 1": {
    start_time: "00:03:45.00",
    end_time: "00:04:07.55",
    "options": [
      "Let Sam Quite",
      "Let Sam Talk"
    ]
  },

  "Let Sam Quite": {
    "start_time": "00:04:07.56",
    "end_time": "00:05:26.18",
    "next": "continue"
  },

  "Let Sam Talk": {
    "start_time": "00:05:26.19",
    "end_time": null
  },

  "continue": {
    "start_time": "00:05:34.51",
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

