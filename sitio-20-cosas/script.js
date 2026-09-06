const video = document.getElementById('video');
const playPause = document.getElementById('playPause');
const iconPlay = document.getElementById('iconPlay');
const iconPause = document.getElementById('iconPause');
const playOverlay = document.getElementById('playOverlay');
const skipBack = document.getElementById('skipBack');
const skipForward = document.getElementById('skipForward');
const muteBtn = document.getElementById('mute');
const iconSound = document.getElementById('iconSound');
const iconMute = document.getElementById('iconMute');
const fullscreenBtn = document.getElementById('fullscreen');
const progress = document.getElementById('progress');
const progressFill = document.getElementById('progressFill');
const timeLabel = document.getElementById('time');
const videoFrame = document.getElementById('videoFrame');

function formatTime(seconds) {
  if (!isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayIcon() {
  const playing = !video.paused && !video.ended;
  iconPlay.style.display = playing ? 'none' : 'block';
  iconPause.style.display = playing ? 'block' : 'none';
  playOverlay.classList.toggle('hidden', playing);
}

playPause.addEventListener('click', togglePlay);
playOverlay.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('ended', updatePlayIcon);

skipBack.addEventListener('click', (e) => {
  e.stopPropagation();
  video.currentTime = Math.max(0, video.currentTime - 10);
});

skipForward.addEventListener('click', (e) => {
  e.stopPropagation();
  video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
});

muteBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  video.muted = !video.muted;
  iconSound.style.display = video.muted ? 'none' : 'block';
  iconMute.style.display = video.muted ? 'block' : 'none';
});

fullscreenBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const requestFs = videoFrame.requestFullscreen || videoFrame.webkitRequestFullscreen;
  const exitFs = document.exitFullscreen || document.webkitExitFullscreen;
  if (!document.fullscreenElement) {
    requestFs?.call(videoFrame);
  } else {
    exitFs?.call(document);
  }
});

video.addEventListener('timeupdate', () => {
  const pct = (video.currentTime / video.duration) * 100 || 0;
  progressFill.style.width = pct + '%';
  timeLabel.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
});

video.addEventListener('loadedmetadata', () => {
  timeLabel.textContent = `${formatTime(0)} / ${formatTime(video.duration)}`;
});

progress.addEventListener('click', (e) => {
  const rect = progress.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  video.currentTime = pct * video.duration;
});

document.getElementById('controls').addEventListener('click', (e) => {
  e.stopPropagation();
});
