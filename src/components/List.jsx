/* eslint-disable react/prop-types */
import Note from "./Note";

export default function List({ notesToShow, toggleImportant, removeNote }) {
  return (
    <ul>
      {notesToShow.map((note) => (
        <Note
          key={note.id}
          note={note}
          toggleImportant={toggleImportant}
          removeNote={removeNote}
        />
      ))}
    </ul>
  );
}
