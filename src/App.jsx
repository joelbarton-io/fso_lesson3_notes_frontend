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

  const addNote = (e) => {
    e.preventDefault();

    const note = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    db.create(note).then((newNote) => {
      setNotes((prevNotes) => prevNotes.concat(newNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const toggleImportant = async (note) => {
    try {
      const updatedNote = await db.update(note.id, {
        ...note,
        important: !note.important,
      });

      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id != note.id ? n : updatedNote))
      );
      console.log(notes);
    } catch (e) {
      //   alert(`the note '${note.content}' was already deleted from server`);
      setErrorMessage(
        `Note '${note.content}' was already removed from the server`
      );

      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);

      setNotes(notes.filter((n) => n.id !== note.id));
      console.log(notes);
    }
  };

  useEffect(() => {
    async function fetchList() {
      try {
        const initialNotes = await db.getAll();
        setNotes(initialNotes);
      } catch (error) {
        console.log("oops");
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
        <List notesToShow={notesToShow} toggleImportant={toggleImportant} />
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
