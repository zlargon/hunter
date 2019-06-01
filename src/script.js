const video = document.querySelector('.video');
const juice = document.querySelector('.orange-juice');
const btn = document.getElementById('play-pause');

const togglePlayPause = () => {
  if (video.paused) {
    btn.className = 'pause';
    video.play();
  } else {
    btn.className = 'play';
    video.pause();
  }
}

// btn.onclick = togglePlayPause;

video.addEventListener('timeupdate', () => {
  const juicePos = video.currentTime / video.duration;
  juice.style.width = juicePos * 100 + '%';
  if (video.ended) {
    btn.className = 'play';
  }
});

const createDecisionBox = ({
    decisionTime = 10, // default 10
    onMakeDecision = console.log,
    options = [
      { next: '001', value: 'option 1' },
      { next: '002', value: 'option 2' },
      { next: '003', value: 'option 3' },
      { next: '004', value: 'option 4' }
    ]
  }) => {

  // choiceBar
  const choiceBar = document.getElementById('choice-bar');
  choiceBar.innerHTML = `
    <div class="loading-bar">
      <div></div>
    </div>
  `;

  // <div class="option">
  //   <div>option 1</div>
  //   <div class="underline effect"></div>
  // </div>
  for (const opt of options) {
    const option = document.createElement('div');
    option.className = 'option';
    option.innerHTML = `<div class="underline effect"></div>`

    const value = document.createElement('div');
    value.innerText = opt.value;
    value.onclick = () => {
      console.log(opt);
    }

    option.prepend(value);
    choiceBar.appendChild(option);
  }

  const loadingBar = document.querySelector('#choice-bar .loading-bar > div');
  const interval = 50;
  let timeId = null;
  let progress;

  const startCountdown = () => {
    progress = 0;
    timeId = setInterval(() => {
      progress += interval;
      loadingBar.style.width = (progress / (decisionTime * 1000)) * 100 + '%';

      if (progress > decisionTime * 1000) {
        loadingBar.style.width = '100%';
        clearInterval(timeId);
      }
    }, interval);

    return timeId;
  }

  const stopCountdown = () => {
    clearInterval(timeId);
    timeId = null;
  }

  // show and hide
  let isShow = false;
  const show = () => {
    isShow = true;
    choiceBar.style.transform = 'translateY(0)';
    startCountdown();
  }
  const hide = () => {
    isShow = false;
    choiceBar.style.transform = 'translateY(100%)';
    stopCountdown();
  }

  return {
    show,
    hide,
    toggle: () => {
      if (isShow) {
        hide();
      } else {
        show();
      }
    }
  }
}

// test
const testButton = document.getElementById('test');
const decisionBox = createDecisionBox({});
testButton.onclick = () => {
  decisionBox.toggle();
}
