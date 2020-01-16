import {ADD_NOTE, GET_NOTES, REMOVE_NOTE, SHOW_LOADER, SHOW_LOCAL_LOADER} from "../types";


const handlers = {
    [SHOW_LOADER]: state => ({...state, isLoading: true}),
    [SHOW_LOCAL_LOADER]: state => ({...state, isLocalLoading: true}),
    [GET_NOTES]: (state, {notes}) => ({...state, notes: notes, isLoading: false}),
    [ADD_NOTE]: (state, {note}) => ({...state, notes: [...state.notes, note], isLocalLoading: false}),
    [REMOVE_NOTE]: (state, {noteId}) => (
        {...state,
            notes: state.notes.filter(note => note.id !== noteId),
            isLocalLoading: false
        }),
    DEFAULT: state => state
};

export const dbReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;

    return handle(state, action);

};