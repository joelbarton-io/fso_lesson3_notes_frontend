/* eslint-disable react/prop-types */
import Note from "./Note";

export default function List({ notesToShow, toggleImportant }) {
  console.log(Array.isArray(notesToShow));
  return (
    <ul>
      {notesToShow.map((note) => (
        <Note key={note.id} note={note} toggleImportant={toggleImportant} />
      ))}
    </ul>
  );
}
