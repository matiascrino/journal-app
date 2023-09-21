import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        activeNote: null,
    },
    reducers: {
        savingNewNote: (state)  => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => { 
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.activeNote = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => note.id === action.payload.id ? action.payload : note);
            state.messageSaved = `${action.payload.title} saved`;
        },
        setPhotosToActiveNote: (state, action) => {
            state.activeNote.imageUrl = [...state.activeNote.imageUrl, ...action.payload];
            state.isSaving = false;
        
        },
        clearNotesLogout: (state)   => {
            state.isSaving= false,
            state.messageSaved= '',
            state.notes = [];
            state.activeNote = null;
        },
        deleteNoteById: (state, action) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = state.notes.filter(note => note.id !== action.payload);
            state.activeNote = null;
        },
    }
});


// Action creators are generated for each case reducer function
export const {
	addNewEmptyNote,
	setActiveNote,
	setNotes,
	setSaving,
	updateNote,
	deleteNoteById,
	savingNewNote,
	setPhotosToActiveNote,
	clearNotesLogout,
} = journalSlice.actions;