import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import axios from "axios";

function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/notes", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => setNotes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = async (id, content) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/notes/${id}`,
        { content },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setNotes((prev) => prev.map((note) => (note._id === id ? res.data : note)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      
      <div className="max-w-4xl mx-auto mt-6 p-4">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Your Notes</h1>

        <div className="my-4">
          <NoteForm setNotes={setNotes} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {Array.isArray(notes) && notes.length > 0 ? (
            notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">No notes found. Create a new one!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
