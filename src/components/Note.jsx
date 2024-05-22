/* eslint-disable react/prop-types */

const Note = ({ note, toggleImportant }) => {
  return (
    <>
      <li className="note">
        <input
          checked={note.important}
          type="checkbox"
          name={note.id}
          id={note.id}
          onChange={() => toggleImportant(note)}
        />
        <span>{note.content}</span>
      </li>
    </>
  );
};

export default Note;
