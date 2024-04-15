const soundEffectsOriginal = [
  {
    name: "Fuzzy Jumpscare",
    duration: 11,
    description: "Confused excited crowd slight panic and distress",
    tags: ["horror", "jumpscare"],
    audio: {
      url: "./sounds/FuzzyJumpscare.mp3",
      isPlaying: false,
      player: new Audio("./sounds/FuzzyJumpscare.mp3"),
    },
    type: "jumpscare",
  },
  {
    name: "Scary Tension",
    duration: 14,
    description: "Confused excited crowd slight panic and distress",
    tags: ["scary", "spooky"],
    audio: {
      url: "./sounds/TensionBuildup.mp3",
      isPlaying: false,
      player: new Audio("./sounds/TensionBuildup.mp3"),
    },
    type: "jumpscare",
  },
  {
    name: "Mellow Loop",
    duration: 9,
    description: "Tranquil ambient melody for relaxation and focus",
    tags: ["ambient", "background"],
    audio: {
      url: "./sounds/MellowLoop.mp3",
      isPlaying: false,
      player: new Audio("./sounds/MellowLoop.mp3"),
    },
    type: "mellow",
  },
  {
    name: "Logo Piano",
    duration: 4,
    description: "Tranquil ambient melody for relaxation and focus",
    tags: ["piano", "into"],
    audio: {
      url: "./sounds/LogoPiano.mp3",
      isPlaying: false,
      player: new Audio("./sounds/LogoPiano.mp3"),
    },
    type: "mellow",
  },
  {
    name: "Female Laugh",
    duration: 10,
    description: "Joyful laughter to lighten the mood and start smiling",
    tags: ["laughter", "woman"],
    audio: {
      url: "./sounds/FemaleLaugh.mp3",
      isPlaying: false,
      player: new Audio("./sounds/FemaleLaugh.mp3"),
    },
    type: "happiness",
  },
  {
    name: "Full of Hope",
    duration: 44,
    description: "Relaxing music to enjoy the process and stop overthinking",
    tags: ["happiness", "building"],
    audio: {
      url: "./sounds/FullOfHope.mp3",
      isPlaying: false,
      player: new Audio("./sounds/FullOfHope.mp3"),
    },
    type: "happiness",
  },
  {
    name: "Night Ambience",
    duration: 180,
    description: "Soothing soundscape to immerse in tranquility",
    tags: ["ambience", "insects"],
    audio: {
      url: "./sounds/NightAmbience.mp3",
      isPlaying: false,
      player: new Audio("./sounds/NightAmbience.mp3"),
    },
    type: "ambience",
  },
  {
    name: "Street Ambience",
    duration: 50,
    description:
      "Vibrant urban soundscape for city vibes and bustling street life",
    tags: ["walking", "street"],
    audio: {
      url: "./sounds/StreetAmbience.mp3",
      isPlaying: false,
      player: new Audio("./sounds/StreetAmbience.mp3"),
    },
    type: "ambience",
  },
  {
    name: "Death Wolf",
    duration: 26,
    description: "Scarry sound of a death-wolf from Puss in Boots",
    tags: ["ambience", "fear"],
    audio: {
      url: "./sounds/PussInBootsDeathWhistleWolf.mp3",
      isPlaying: false,
      player: new Audio("./sounds/PussInBootsDeathWhistleWolf.mp3"),
    },
    type: "ambience",
  },
  {
    name: "Game Music",
    duration: 60,
    description: "Soundtrack to enhance gameplay",
    tags: ["theme", "play"],
    audio: {
      url: "./sounds/GameMusic.mp3",
      isPlaying: false,
      player: new Audio("./sounds/GameMusic.mp3"),
    },
    type: "gaming",
  },
  {
    name: "Game Loop",
    duration: 32,
    description: "Energetic soundtrack to elevate gaming experience",
    tags: ["game", "loop"],
    audio: {
      url: "./sounds/GameLoop.mp3",
      isPlaying: false,
      player: new Audio("./sounds/GameLoop.mp3"),
    },
    type: "gaming",
  },
];

let soundEffects = [...soundEffectsOriginal];
let currentTabName = "all";
let seeAll = false;
let currentAudioIdx = null;
const filterButton = document.querySelector(".effects__filter-button");
const filterTitle = document.querySelector(".effects__filter-title");
const filterOptions = document.querySelector(".effects__filter-options");
const filterOptionsList = document.querySelectorAll(".effects__filter-option");
const soundEffectsBody = document.querySelector(".effects__sounds");
const effectTabs = document.querySelectorAll(".effects__header-button");
const moreSoundsButton = document.querySelector(".effects__more");
const audioPlayer = document.querySelector(".audio-player");
const audioPlayerToggle = document.querySelector(".audio-player__toggle");
const audioPlayerName = document.querySelector(".audio-player__name");
const audioPlayerCurrentTime = document.querySelector(".audio-player__current");
const audioPlayerDuration = document.querySelector(".audio-player__duration");
const audioPlayerTimeline = document.querySelector(".audio-player__timeline");
const audioPlayerProgress = document.querySelector(".audio-player__progress");

// Define functions

function calculateDuration(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function filterMenuToggle() {
  filterOptions.classList.toggle("is-active");
}

function favoriteHandle() {
  alert("Glad you liked it :D");
}

function moreHandle() {
  alert("This function is disabled :(");
}

function playAudio(id) {
  currentAudioIdx = id;
  const currentAudio = soundEffects[id].audio;
  currentAudio.isPlaying = !currentAudio.isPlaying;

  const soundEffectsButtons = document.querySelectorAll(".effect-bar__button");

  const voiceButton = document.getElementById("voiceButton");
  const muteButton = document.getElementById("muteButton");

  if (currentAudio.player.currentTime < 0.5) {
    audioPlayerCurrentTime.textContent = "00:00";
    if (currentAudio.player.volume === 0) {
      currentAudio.player.volume = 1;
    }
  }

  if (currentAudio.player.volume === 0) {
    voiceButton.classList.remove("visually-hidden");
    muteButton.classList.add("visually-hidden");
  } else {
    voiceButton.classList.add("visually-hidden");
    muteButton.classList.remove("visually-hidden");
  }

  // If audio is paused, reset styles and pause it
  if (!currentAudio.isPlaying) {
    currentAudio.player.pause();
    currentAudio.player.isPlaying = false;
    audioPlayerToggle.classList.remove("pause");
    audioPlayerToggle.classList.add("play");

    const currentEffectTitles = document.querySelectorAll(".effect-bar__title");
    currentEffectTitles.forEach((title, idx) => {
      if (title.textContent === soundEffects[id].name) {
        const soundEffectsButtons = document.querySelectorAll(
          ".effect-bar__button"
        );
        soundEffectsButtons[idx].classList.remove("is-playing");
      }
    });

    return;
  }

  // Reset all play-button is playing status
  soundEffects.forEach((effect, idx) => {
    if (id !== idx) {
      effect.audio.isPlaying = false;
    }
  });

  // Reset all play-button styles
  soundEffectsButtons.forEach((button) =>
    button.classList.remove("is-playing")
  );

  soundEffects.forEach((item, itemId) => {
    item.audio.player.pause();
    if (itemId !== id) {
      item.audio.player.currentTime = 0;
    }
    item.audio.player.isPlaying = false;
  });

  // Play and style active audio player
  const currentEffectTitles = document.querySelectorAll(".effect-bar__title");
  currentEffectTitles.forEach((title, idx) => {
    if (title.textContent === soundEffects[id].name) {
      const soundEffectsButtons = document.querySelectorAll(
        ".effect-bar__button"
      );
      soundEffectsButtons[idx].classList.add("is-playing");
    }
  });

  currentAudio.player.isPlaying = true;
  audioPlayer.classList.remove("is-hidden");
  audioPlayerToggle.classList.add("pause");
  audioPlayerToggle.classList.remove("play");
  currentAudio.player.play();
  currentAudio.player.addEventListener("timeupdate", () => {
    const progress =
      (currentAudio.player.currentTime / currentAudio.player.duration) * 100;
    if (progress) {
      audioPlayerProgress.style.width = `${progress}%`;
    }
    if (Math.floor(currentAudio.player.currentTime)) {
      audioPlayerCurrentTime.textContent = calculateDuration(
        Math.floor(currentAudio.player.currentTime)
      );
    }
  });
  audioPlayerName.textContent = soundEffects[id].name;
  audioPlayerDuration.textContent = calculateDuration(
    soundEffects[id].duration
  );
}

function paintSoundEffects(soundsCount, tabType) {
  soundEffectsBody.classList.add("updated");

  soundEffectsBody.innerHTML = "";
  soundEffects
    .filter((effect) => effect.type === tabType || tabType === "all")
    .slice(0, soundsCount)
    .forEach((sound) => {
      const id = soundEffects.findIndex((effect) => effect.name === sound.name);
      soundEffectsBody.innerHTML += `
      <li class="effect-bar">
        <div class="effect-bar__info">
          <button 
            class="effect-bar__button ${
              sound.audio.isPlaying ? "is-playing" : ""
            }" 
            type="button" 
            onclick="playAudio(${id})"
          >
            <span class="visually-hidden">Play sound button</span>
          </button>
          <div>
            <h3 class="effect-bar__title">${sound.name}</h3>
            <div class="effect-bar__duration">
              <p>${calculateDuration(sound.duration)}</p>
            </div>
          </div>
        </div>
        <div class="effect-bar__description hidden-mobile">
          <p>${sound.description}</p>
        </div>
        <div class="effect-bar__tags">
          <p>${sound.tags.join(", ")}</p>
        </div>
        <div class="effect-bar__actions">
          <button type="button" onclick="favoriteHandle()">
            <img class="effect-bar__actions-image" src="./images/icons/favorite-icon.svg" width="32" height="32" alt="Favorite" loading="lazy">
          </button>
          <a href="${sound.audio.url}" download="${sound.audio.url}">
            <img class="effect-bar__actions-image" src="./images/icons/download-icon.svg" width="32" height="32" alt="Favorite" loading="lazy">
          </a>
          <button type="button" onclick="moreHandle()">
            <img class="effect-bar__actions-image" src="./images/icons/horizontal-ellipsis-icon.svg" width="32" height="32" alt="Favorite" loading="lazy">
          </button>
        </div>
      </li>
    `;
    });

  setTimeout(() => {
    soundEffectsBody.classList.remove("updated");
  }, 500);
}

function sortLongestSounds() {
  soundEffects.sort((a, b) => b.duration - a.duration);
  paintSoundEffects(seeAll ? soundEffects.length : 6, currentTabName);
}

function sortShortestSounds() {
  soundEffects.sort((a, b) => a.duration - b.duration);
  paintSoundEffects(seeAll ? soundEffects.length : 6, currentTabName);
}

function sortSoundsByName() {
  soundEffects.sort((a, b) => a.name.localeCompare(b.name));
  paintSoundEffects(seeAll ? soundEffects.length : 6, currentTabName);
}

function playMusicFromPlayer() {
  playAudio(currentAudioIdx);
}

function toggleMusicSound() {
  const voiceButton = document.getElementById("voiceButton");
  const muteButton = document.getElementById("muteButton");
  const audio = soundEffects[currentAudioIdx].audio;

  if (audio.player.volume === 0) {
    audio.player.volume = 1;
    voiceButton.classList.add("visually-hidden");
    muteButton.classList.remove("visually-hidden");
  } else {
    audio.player.volume = 0;
    voiceButton.classList.remove("visually-hidden");
    muteButton.classList.add("visually-hidden");
  }
}

// Add event listeners

filterOptionsList.forEach((option) => {
  option.addEventListener("click", () => {
    filterTitle.textContent = option.textContent;
    filterMenuToggle();
  });
});

moreSoundsButton.onclick = () => {
  paintSoundEffects(soundEffects.length, "all");
  moreSoundsButton.style.display = "none";
  seeAll = true;
  effectTabs.forEach((item) => item.classList.remove("is-active"));
  effectTabs[0].classList.add("is-active");
};

effectTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    effectTabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    currentTabName = tab.textContent.toLocaleLowerCase();
    paintSoundEffects(seeAll ? soundEffects.length : 6, currentTabName);
  });
});

audioPlayerTimeline.addEventListener("click", () => {
  const elementWidth = audioPlayerTimeline.offsetWidth;
  const clickX = event.clientX;
  let percentageFromLeft = (clickX / elementWidth) * 100;

  soundEffects[currentAudioIdx].audio.player.currentTime = Math.floor(
    (percentageFromLeft * soundEffects[currentAudioIdx].duration) / 100
  );
});

document.addEventListener("click", (e) => {
  const filterBlock = document.querySelector(".effects__filter");
  if (
    !filterBlock.contains(e.target) &&
    filterOptions.classList.contains("is-active")
  ) {
    filterMenuToggle();
  }
});

soundEffects.forEach((sound) => {
  sound.audio.player.addEventListener("ended", () => {
    document.querySelectorAll(".effect-bar__button").forEach((btn) => {
      btn.classList.remove("is-playing");
    });
    sound.audio.isPlaying = false;
    sound.audio.player.volume = 1;
    audioPlayerCurrentTime.textContent = "00:00";
    audioPlayer.classList.add("is-hidden");
  });
});

// Initialize the page

document.onload = paintSoundEffects(6, "all");
