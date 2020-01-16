import React, {useReducer} from 'react';
import axios from 'axios';
import {DbContext} from "./dbContext";
import {dbReducer} from "./dbReducer";
import {ADD_NOTE, GET_NOTES, REMOVE_NOTE, SHOW_LOADER, SHOW_LOCAL_LOADER} from "../types";

const url = process.env.REACT_APP_DB_URL;
const objectToArray = (obj) => {
    if (obj) {
        return Object.keys(obj).map(key => ({
            ...obj[key],
            id: key
        }))
    } else {
        return [];
    }
};
export const DbState = ({children}) => {
    const initialState = {
        notes: [],
        isLoading: false,
        isLocalLoading: false
    };
    const [state, dispatch] = useReducer(dbReducer, initialState);

    const showLoader = () => dispatch({type: SHOW_LOADER});
    const showLocalLoader = () => dispatch({type: SHOW_LOCAL_LOADER});

    const getNotes = async () => {
        showLoader();
        let notes = await axios.get(`${url}/notes.json`).then(res => res.data);
        notes = objectToArray(notes);
        dispatch({type: GET_NOTES, notes});
    };
    const addNote = async title => {
        const newNote = {
            title,
            date: new Date().toJSON()
        };

        showLocalLoader();
        const noteFromSrv = await axios.post(`${url}/notes.json`, newNote)
            .then(res => res.data);
        const note = {
            ...newNote,
            id: noteFromSrv.name
        };
        dispatch({type: ADD_NOTE, note});

    };
    const removeNote = async noteId => {
        showLocalLoader();
        await axios.delete(`${url}/notes.json`, noteId).then(() => {
            dispatch({type: REMOVE_NOTE, noteId});
        });

    };

    return (
        <DbContext.Provider value={{
            getNotes, addNote, removeNote,
            isLoading: state.isLoading,
            isLocalLoading: state.isLocalLoading,
            notes: state.notes
        }}>
            {children}
        </DbContext.Provider>
    )
};