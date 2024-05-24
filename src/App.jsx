/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import db from "./services/notes";
import List from "./components/List";
import Notification from "./components/Notification";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("...");

  const notesToShow = showAll
    ? notes
    : notes.filter(({ important }) => important);

  const removeNote = async (id) => {
    try {
      await db.remove(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.log(`something broke: ${error.message}`);
    }
  };

  const toggleImportant = async (note) => {
    console.log("toggled importantness of note: ", note.id);
    try {
      const updatedNote = await db.update(note.id, {
        ...note,
        important: !note.important,
      });

      // this wasn't on the object any more so must preserve it

      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id != note.id ? n : updatedNote))
      );
      console.log(notes);
      //   console.log(notes);
    } catch (e) {
      //   alert(`the note '${note.content}' was already deleted from server`);
      setErrorMessage(
        `Note '${note.content}' was already removed from the server`
      );

      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);

      setNotes(notes.filter((n) => n.id !== note.id));
      //   console.log(notes);
    }
  };

  const addNote = async (e) => {
    e.preventDefault();

    console.log("called addNote...");
    try {
      const note = {
        content: newNote,
        important: Math.random() > 0.5,
      };

      console.log("note: ", note);
      const createdNote = await db.create(note);
      console.log("from AddNote: ", createdNote);
      setNotes((prevNotes) => prevNotes.concat(createdNote));
      setNewNote("");
    } catch (e) {
      console.log(e.message, e.status, e);
    }
  };

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  useEffect(() => {
    async function fetchList() {
      try {
        const initialNotes = await db.getAll();
        setNotes(initialNotes);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchList();
  }, []);

  return (
    <>
      <header>
        <h1>Notes</h1>
        <Notification message={errorMessage} />
      </header>
      <main>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show important" : "Show all"}
        </button>
        <List
          notesToShow={notesToShow}
          toggleImportant={toggleImportant}
          removeNote={removeNote}
        />
        <form onSubmit={addNote}>
          <input value={newNote} type="text" onChange={handleNoteChange} />
          <button type="submit">Submit</button>
        </form>
      </main>

      <footer
        style={{
          fontSize: 30,
          backgroundColor: "red",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Footer
      </footer>
    </>
  );
};

export default App;

// import Course from "./components/Course";

// const App = () => {
//   const courses = [
//     {
//       name: "Half Stack application development",
//       id: 1,
//       parts: [
//         {
//           name: "Fundamentals of React",
//           exercises: 10,
//           id: 1,
//         },
//         {
//           name: "Using props to pass data",
//           exercises: 7,
//           id: 2,
//         },
//         {
//           name: "State of a component",
//           exercises: 14,
//           id: 3,
//         },
//         {
//           name: "Redux",
//           exercises: 11,
//           id: 4,
//         },
//       ],
//     },
//     {
//       name: "Node.js",
//       id: 2,
//       parts: [
//         {
//           name: "Routing",
//           exercises: 3,
//           id: 1,
//         },
//         {
//           name: "Middlewares",
//           exercises: 7,
//           id: 2,
//         },
//       ],
//     },
//   ];

//   return courses.map((course) => <Course key={course.id} course={course} />);
// };

// export default App;
