import React from 'react';

const Note = ({note, deleteNote}) => {
    return(
        <li className="list-group-item d-flex justify-content-between align-content-center">
            <div>
                <strong>{note.title}</strong>
                <small className="pl-2 pr-2 text-muted">{note.date}</small>
            </div>
            <button type="button" onClick = {() => deleteNote(note.id)} className="btn btn-danger btn-sm">&times;</button>
        </li>
    )
};

export default Note;