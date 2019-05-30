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

btn.onclick = togglePlayPause;

video.addEventListener('timeupdate', () => {
  const juicePos = video.currentTime / video.duration;
  juice.style.width = juicePos * 100 + '%';
  if (video.ended) {
    btn.className = 'play';
  }
});
