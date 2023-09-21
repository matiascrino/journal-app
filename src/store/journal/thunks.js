import {doc, setDoc, collection, deleteDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from './journalSlice';
import { loadNotes } from '../../helpers/loadNotes';
import { fileUpload } from '../../helpers/fileUpload';

export const startNewNote = () => {

    return async (dispatch, getState) => {

        dispatch(savingNewNote())

        const {uid} = getState().auth;

        const newNote= {
            title:'',
            body: '',
            date: new Date().getTime(),
            imageUrl: [],
        }

        const newDoc = doc( collection(FirebaseDB, `${uid}/journal/notes`  ))
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

    }


}


export const startLoadingNotes =() => {

    return async(dispatch, getState) => {
    
        const {uid} = getState().auth;

        if(!uid) throw new Error('No hay uid')

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));

        
    
    
    
    }    

}


export const startSavingNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());
    
        const {uid} = getState().auth;

        const {activeNote} = getState().journal;

        const noteToSave = {...activeNote};

        delete noteToSave.id;
        
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`); // preparo
        await setDoc(docRef, noteToSave, {merge: true}); // ejecuto en firebase

        dispatch(updateNote(activeNote))
    
    }
}


export const startUploadingFiles = (files = []) => {

    return async (dispatch) => {
        
        dispatch(setSaving());
        
        const fileUploadPromises = [];

        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        const photosUrls = await Promise.all(fileUploadPromises);


        dispatch(setPhotosToActiveNote (photosUrls));

    
    
    
    }


}

export const startDeletingNote = (id) => {
    
        return async (dispatch, getState) => {
        
            const {uid} = getState().auth;
    
            await deleteDoc(doc(FirebaseDB, `${uid}/journal/notes/${id}`));
    
            dispatch(deleteNoteById(id));
        
        }
    }
