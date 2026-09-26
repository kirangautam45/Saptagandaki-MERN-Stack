# Notes Android (Java)

A small Android app that talks to the `day-02-mongodb` Notes API.

- Tap **+** to create a note
- Tap a note to edit it
- Long-press a note to delete it
- Pull the list down to reload notes from the API

## Run it

1. Start the API: `cd ../day-02-mongodb && npm run dev` (it listens on port 4002)
2. Open this folder in Android Studio and let Gradle sync
3. Start an emulator and press **Run**

The app calls `http://10.0.2.2:4002/api/notes`. Inside the emulator, `10.0.2.2` means
"the computer running the emulator", so it reaches your local API.

On a real phone, change `BASE_URL` in `NotesApi.java` to your computer's Wi-Fi IP
(for example `http://192.168.1.20:4002/api/notes`). The phone and computer must be on the same network.

## Files

| File | What it does |
| --- | --- |
| `NotesApi.java` | Sends HTTP requests to the API and turns JSON into `Note` objects |
| `Note.java` | One note: `id`, `title`, `body` |
| `MainActivity.java` | The screen: list, add/edit dialog, delete confirm |
