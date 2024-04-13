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

soundEffects.forEach((sound) => {
  sound.audio.player.addEventListener("ended", () => {
    const soundEffectsButtons = document.querySelectorAll(
      ".effect-bar__button"
    );
    soundEffectsButtons.forEach((btn) => {
      btn.classList.remove("is-playing");
    });
    sound.audio.isPlaying = false;
  });
});

const calculateDuration = (duration) => {
  if (duration <= 9) {
    return "00:0" + duration;
  } else if (duration <= 59) {
    return "00:" + duration;
  } else {
    const minutes =
      Math.floor(duration / 60) <= 9
        ? "0" + Math.floor(duration / 60)
        : Math.floor(duration / 60);

    const seconds =
      Math.floor(duration % 60) <= 9
        ? "0" + Math.floor(duration % 60)
        : Math.floor(duration % 60);

    return minutes + ":" + seconds;
  }
};

const filterButton = document.querySelector(".effects__filter-button");
const filterTitle = document.querySelector(".effects__filter-title");
const filterOptions = document.querySelector(".effects__filter-options");
const filterOptionsList = document.querySelectorAll(".effects__filter-option");

function filterMenuToggle() {
  filterOptions.classList.toggle("is-active");
}

filterOptionsList.forEach((option) => {
  option.addEventListener("click", () => {
    filterTitle.textContent = option.textContent;
    filterMenuToggle();
  });
});

function favoriteHandle() {
  alert("Glad you liked it :D");
}

function moreHandle() {
  alert("This function is disabled :(");
}

function playAudio(id) {
  const currentAudio = soundEffects[id].audio;
  currentAudio.isPlaying = !currentAudio.isPlaying;

  const soundEffectsButtons = document.querySelectorAll(".effect-bar__button");

  // If audio is paused, reset styles and pause it
  if (!currentAudio.isPlaying) {
    event.target.classList.remove("is-playing");
    currentAudio.player.pause();
    currentAudio.player.isPlaying = false;
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
  currentAudio.player.play();
  event.target.classList.add("is-playing");
  currentAudio.player.isPlaying = true;
}

// Paint sound effects
const soundEffectsBody = document.querySelector(".effects__sounds");

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
            <h4 class="effect-bar__title">${sound.name}</h4>
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

document.onload = paintSoundEffects(6, "all");

const effectTabs = document.querySelectorAll(".effects__header-button");
const moreSoundsButton = document.querySelector(".effects__more");
let seeAll = false;

moreSoundsButton.onclick = () => {
  paintSoundEffects(soundEffects.length, "all");
  moreSoundsButton.style.display = "none";
  seeAll = true;
  effectTabs.forEach((item) => item.classList.remove("is-active"));
  effectTabs[0].classList.add("is-active");
};

// Switching tabs
let currentTabName = "all";

effectTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    effectTabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    currentTabName = tab.textContent.toLocaleLowerCase();
    paintSoundEffects(seeAll ? soundEffects.length : 6, currentTabName);
  });
});

function sortLongestSounds() {
  soundEffects.sort((a, b) => b.duration - a.duration);
  paintSoundEffects(seeAll ? soundEffects.length : 6, currentTabName);
}

function sortShortestSounds() {
  soundEffects.sort((a, b) => a.duration - b.duration);
  paintSoundEffects(seeAll ? soundEffects.length : 6, currentTabName);
}

function sortSoundsByName() {
  soundEffects.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  paintSoundEffects(seeAll ? soundEffects.length : 6, currentTabName);
}

document.addEventListener("click", (e) => {
  const filterBlock = document.querySelector(".effects__filter");
  if (
    !filterBlock.contains(e.target) &&
    filterOptions.classList.contains("is-active")
  ) {
    filterMenuToggle();
  }
});
