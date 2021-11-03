import { combineReducers } from "redux";

// Reducers
const songsReducer = () => {
    return [
        { title: "Song 1", duration: "4:05" },
        { title: "Song 2", duration: "3:05" },
        { title: "Song 3", duration: "2:15" },
        { title: "Song 4", duration: "3:45" },
    ];
};

const selectedSongReducer = (selectedSong = null, action) => {
    if (action.type === "SONG_SELECTED") return action.payload;

    return selectedSong;
};

// keys to this object are keys of the react state object
export default combineReducers({
    songs: songsReducer,
    selectedSong: selectedSongReducer,
});
