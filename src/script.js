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

  // show and hide
  let isShow = false;
  const show = () => {
    isShow = true;
    choiceBar.style.transform = 'translateY(0)';
  }
  const hide = () => {
    isShow = false;
    choiceBar.style.transform = 'translateY(100%)';
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
