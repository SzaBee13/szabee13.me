const apiUrl =
  "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=SzaBee13&api_key=01981f06015a661e31fc32a8befeb459&format=json&limit=1";

async function updateNowPlaying() {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const track = data.recenttracks.track[0];

    if (track["@attr"].nowplaying) {
      trackTitle.textContent = track.name;
      trackTitle.href = track.url;

      trackArtist.textContent = track.artist["#text"];
      trackArtist.href = `https://www.last.fm/music/${encodeURIComponent(
        track.artist["#text"]
      )}`;

      const art =
        track.image.find((img) => img.size === "extralarge") || track.image[0];
      trackArt.src = art["#text"] || "";
    } else {
      trackTitle.textContent = "Nothin' playin'";
      trackTitle.href = "#"; // or leave it empty if you prefer

      trackArtist.textContent = "";
      trackArtist.href = "#"; // no link

      trackArt.src = ""; // fallback image
    }
  } catch (err) {
    console.error("Failed to fetch Last.fm now playing:", err);
  }
}

// Initial load and refresh every 30s
updateNowPlaying();
setInterval(updateNowPlaying, 30000);
