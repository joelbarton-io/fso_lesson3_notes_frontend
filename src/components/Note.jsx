/* eslint-disable react/prop-types */

const Note = ({ note, toggleImportant, removeNote }) => {
  const handleRemovenote = () => removeNote(note.id);
  return (
    <>
      <li className="note">
        <input
          checked={note.important}
          type="checkbox"
          name={note.id}
          onChange={() => toggleImportant(note)}
        />
        <span>{note.content}</span>
        <button type="button" onClick={handleRemovenote}>
          Delete
        </button>
      </li>
    </>
  );
};

export default Note;
