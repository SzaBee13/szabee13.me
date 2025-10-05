const LASTFM_API_KEY = "01981f06015a661e31fc32a8befeb459"; // <-- safe to expose for read requests

async function fetchCoverFromLastFM(artist, track) {
  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${LASTFM_API_KEY}&artist=${encodeURIComponent(
      artist
    )}&track=${encodeURIComponent(track)}&format=json`;
    const res = await fetch(url);
    const data = await res.json();
    return (
      data?.track?.album?.image?.slice(-1)[0]["#text"] ||
      "https://via.placeholder.com/300?text=No+Cover"
    );
  } catch {
    return "https://via.placeholder.com/300?text=No+Cover";
  }
}

async function getNowPlaying() {
  const params = new URLSearchParams(window.location.search);
  const user = params.get("user") || "SzaBee13";

  try {
    const res = await fetch(
      `https://api.listenbrainz.org/1/user/${user}/playing-now`
    );
    const data = await res.json();

    const loading = document.getElementById("loading");
    const trackBox = document.getElementById("track");

    const listens = data.payload?.listens || [];
    const now = listens.length > 0 ? listens[0] : null;

    if (!now || !now.playing_now) {
      loading.textContent = `${user} is not listening right now.`;
      return;
    }

    const info = now.track_metadata;
    const track = info.track_name || "Unknown Track";
    const artist = info.artist_name || "Unknown Artist";
    const album = info.release_name || "Unknown Album";

    const coverUrl = await fetchCoverFromLastFM(artist, track);

    document.getElementById("title").textContent = track;
    document.getElementById("artist").textContent = artist;
    document.getElementById("album").textContent = album;
    document.getElementById("cover").src = coverUrl;

    loading.classList.add("hidden");
    trackBox.classList.remove("hidden");
  } catch (err) {
    document.getElementById("loading").textContent = "Error loading data.";
    console.error(err);
  }
}

getNowPlaying();
