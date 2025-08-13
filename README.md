# Mood Flow

A web application that generates a personalized card with the current date, weather, a mood-based song and a short message based on your selected mood.


![Main screen](https://github.com/user-attachments/assets/53f44e68-ca0b-4f7d-9d38-9a5f76f05eb0)
Main screen — select your mood

![Result card](https://github.com/user-attachments/assets/33cfc4ee-9f48-4144-a0f4-f2f922444f93)
Example of the generated card

## Live Demo
🔗 [Open App](https://we1r9.github.io/mood-flow/)

## Features
- Displays the **current date**
- Shows your **current location** (if permission is granted)
- Fetches **live weather** based on your geolocation
- Recommends a **mood-based song** with cover art, title and artist
- Displays a **personalized message** matching your mood
- Includes a **direct link** to listen on Spotify

## Built With
- [Nominatim](https://nominatim.org/) (OpenStreetMap) — reverse geocoding for location names
- [Open-Meteo API](https://open-meteo.com/) — live weather data
- [SpinKit](https://github.com/tobiasahlin/SpinKit) — CSS loading animations
- [UIverse Button by Cksunandh](https://uiverse.io/Cksunandh/stale-dog-84) — base style for “Open card” button
- [SF Pro Rounded](https://developer.apple.com/fonts/) — UI font

## Roadmap

- **Playlist-based recommendations** — after learning backend development, generate cards using the user's own Spotify playlists (via Spotify API).
- **Save & Share** — allow users to save the generated card as an image and share it on social media.
- **Dark mode & UI improvements** — add a dark theme and refine the user interface for better aesthetics.
- **Daily card history** — keep a history of generated cards so users can look back at their moods.
