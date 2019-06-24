const StoryFlow = {
  "default": {
    video: "https://github.com/zlargon/res/releases/download/hunter/hunter_0623.mp4"
  },

  "begin": {
    start_time: "00:00:00.00",
    end_time: "00:00:00.00",
    next: "part 1"
  },

  "part 1": {
    start_time: "00:00:00.00",
    end_time: "00:04:31.55",
    select_time: 10,
    options: [
      "let sam quite",
      "let sam talk"
    ]
  },

  "let sam quite": {
    start_time: "00:04:55.56",
    end_time: "00:06:30.10",
    next: "part 2"
  },

  "let sam talk": {
    start_time: "00:06:40.43",
    end_time: "00:06:56.41",
    next: "part 2"
  },

  "part 2": {
    start_time: "00:06:56.42",
    end_time: "00:09:30.37",
    select_time: 13,
    options: [
      "put towel into sam's mouth",
      "put cloth into sam's mouth"
    ]
  },

  "put towel into sam's mouth": {
    start_time: "00:09:47.53",
    end_time: "00:13:55.21",
    next: "part 3"
  },

  "put cloth into sam's mouth": {
    start_time: "00:14:16.40",
    end_time: "00:14:34.31",
    next: "part 3"
  },

  "part 3": {
    start_time: "00:14:34.32",
    end_time: "00:15:38.25",
    select_time: 16,
    options: [
      "help ashley",
      "help jake",
      "help corey",
      "help sam"
    ]
  },

  "help ashley": {
    start_time: "00:15:56.28",
    end_time: "00:22:39.14",
    next: "ending"
  },

  "help jake": {
    start_time: "00:22:49.42",
    end_time: "00:32:42.20",
    next: "ending"
  },

  "help corey": {
    start_time: "00:32:46.36",
    end_time: "00:38:08.17",
    next: "ending"
  },

  "help sam": {
    start_time: "00:38:41.33",
    end_time: "00:44:12.10",
    next: "ending"
  },

  "ending": {
    start_time: "00:44:12.10",
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
    ...StoryFlow['default'],
    name,
    ...plot,
    start_time: toSecond(plot.start_time),
    end_time: toSecond(plot.end_time)
  }
};

