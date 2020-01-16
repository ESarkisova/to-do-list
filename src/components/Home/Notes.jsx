import React, {useContext} from 'react';
import Note from "./Note";
import {DbContext} from "../../context/database/dbContext";
import {AlertContext} from "../../context/alert/alertContext";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import './Home.sass'

const Notes = ({notes}) => {

    const alert = useContext(AlertContext);
    const db = useContext(DbContext);
    const deleteNote = (noteId) => {
        db.removeNote(noteId).then(() => {
            alert.showAlert('Запись удалена из списка', 'success');
        }).catch((err) => {
            alert.showAlert(`Произошла ошибка ${err}`, 'danger');
        });
    };
    return (
        <TransitionGroup component = "ul" className={`list-group ${db.isLocalLoading ? 'loading' : ''}`}>
            {(notes && notes.length) ?
                notes.map(note => (<CSSTransition classNames = "note-trs"
                                                  timeout = {600} key={note.id}>
                    <Note note={note} deleteNote={deleteNote} key={note.id}/>
                </CSSTransition>))
                : <div className="align-self-center text-muted">Список дел пуст</div>
            }
        </TransitionGroup>
    )
};

export default Notes;