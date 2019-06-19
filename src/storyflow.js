const StoryFlow = {
  "default": {
    "source": "video.mp4",
    "description": ""
  },

  "begin": {
    start_time: "00:00:00.00",
    end_time: "00:00:00.00",
    next: "part 1"
  },

  "part 1": {
    start_time: "00:00:00.00",
    end_time: "00:04:18.44",
    options: [
      "let sam quite",
      "let sam talk"
    ]
  },

  "let sam quite": {
    start_time: "00:04:45.42",
    end_time: "00:06:11.41",
    next: "part 2"
  },

  "let sam talk": {
    start_time: "00:06:27.10",
    end_time: "00:06:41.36",
    next: "part 2"
  },

  "part 2": {
    start_time: "00:06:41.36",
    end_time: "00:09:20.54",
    options: [
      "put left cloth into sam's mouth",
      "put right cloth into sam's mouth"
    ]
  },

  "put left cloth into sam's mouth": {
    start_time: "00:09:41.06",
    end_time: "00:14:01.58",
    next: "part 3"
  },

  "put right cloth into sam's mouth": {
    start_time: "00:14:23.54",
    end_time: "00:14:41.46",
    next: "part 3"
  },

  "part 3": {
    start_time: "00:14:41.46",
    end_time: "00:15:40.41",
    options: [
      "help ashley",
      "help jake",
      "help corey",
      "help sam"
    ]
  },

  "help ashley": {
    start_time: "00:16:09.53",
    end_time: "00:21:56.17",
    next: "ending"
  },

  "help jake": {
    start_time: "00:22:20.00",
    end_time: "00:31:54.47",
    next: "ending"
  },

  "help corey": {
    start_time: "00:32:04.31",
    end_time: "00:36:32.07",
    next: "ending"
  },

  "help sam": {
    start_time: "00:36:35.59",
    end_time: "00:41:02.05",
    next: "ending"
  },

  "ending": {
    start_time: "00:41:02.05",
    end_time: null
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

