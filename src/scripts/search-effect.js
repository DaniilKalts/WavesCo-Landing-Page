// Generally, you'd better put these variables in .env file

const process = {
  env: {
    RAPID_API_KEY: "d5117fc18cmsh3f4a34c59ca923ep19d97fjsna828656a1e3b",
    RAPID_API_HOST: "spotify81.p.rapidapi.com",
  },
};

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    "X-RapidAPI-Host": process.env.RAPID_API_HOST,
  },
};

const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const audioModal = document.querySelector(".audio-modal");

function hideAudioModal() {
  audioModal.innerHTML = "";
  audioModal.innerHTML += `
    <div class="audio-modal__spinner"></div>
  `;
  audioModal.classList.add("visually-hidden");
}

const fetchSoundEffect = async (soundQuery = "") => {
  try {
    audioModal.classList.remove("visually-hidden");

    const response = await fetch(
      `https://${process.env.RAPID_API_HOST}/download_track?q=${soundQuery}`,
      options
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    hideAudioModal();
  }
};

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const soundTrack = await fetchSoundEffect(searchInput.value);
  if (soundTrack) {
    audioModal.innerHTML = "";
    audioModal.innerHTML = `
      <div class="audio-modal__body">
        <img class="audio-modal__cover" src="${soundTrack?.albumOfTrack?.coverArt?.sources[0]?.url}" width="250" height="250" alt="" loading="lazy" />
        <h3 class="audio-modal__name">${soundTrack?.name}</h3>
        <audio controls>
          <source src="${soundTrack?.youtube?.download[0]?.url}" type="audio/mp4">
          Your browser does not support the audio element.
        </audio>
      </div>
    `;
  } else {
    hideAudioModal();
  }

  searchInput.value = "";
});

audioModal.addEventListener("click", (e) => {
  e.stopPropagation();

  if (
    e.target.classList.contains("audio-modal") &&
    !document.querySelector(".audio-modal__spinner")
  ) {
    hideAudioModal();
  }
});
