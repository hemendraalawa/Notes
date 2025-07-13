import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Delete, DeleteIcon, Trash } from "lucide-react";
import axios from "axios";

const YourNotes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const { notes, fetchNotes } = useContext(AuthContext);
  const openModal = (note) => {
    setActiveNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveNote(null);
  };

  // Fetch notes when the component mounts
  // This will call the fetchNotes function from AuthContext to get the user's notes.
  useEffect(() => {
    fetchNotes();
  }, []);

  // Function to handle note deletion
  // This function will be called when the user clicks the delete button on a note.

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Note deleted successfully!");
      fetchNotes(); // 🔁 refresh updated list
      setIsModalOpen(false);
      setActiveNote(null);
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete note");
    }
  };

  return (
    <>
      {/* MAIN SCREEN */}
      <div className="NotesContainer md:mt-3 md:ml-0 mr-3 ml-3 bg-gray-100 h-auto md:h-170 md:w-full px-10 py-3 rounded-2xl">
        <h3 className="text-2xl font-bold text-gray-600 mb-4">Your Notes</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note._id}
              onClick={() => openModal(note)}
              className="NoteCard bg-white w-full p-5 border border-gray-600 cursor-pointer rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="font-bold text-xl text-gray-600 mb-2">
                {note.title}
              </h3>
              <div className="w-full h-24 overflow-y-scroll thin-black-scrollbar my-2">
                <p className="text-sm">{note.content}</p>
              </div>
              <p className="font-bold text-sm text-gray-600">
                {new Date(note.createdAt).toLocaleString()}
              </p>
              {/* 🗑️ Delete Button (top-right) */}
            </div>
          ))}
        </div>
      </div>

      {/* POPUP MODAL */}
      {isModalOpen && activeNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white w-11/12 md:w-1/2 h-1/2 rounded-xl p-5 shadow-2xl border border-gray-300 animate-fadeZoom relative">
            {/* ❌ Close Button */}
            <div className="absolute top-2 right-3">
              <button
                onClick={closeModal}
                className="text-gray-600 font-bold text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* ✅ Title */}
            <h3 className="font-bold text-2xl text-gray-700 mb-4 mt-2">
              {activeNote.title}
            </h3>

            {/* ✅ Content + Delete */}
            <div className="w-full h-[70%] overflow-y-scroll thin-black-scrollbar pr-2 relative">
              <p className="text-sm text-gray-700 leading-relaxed">
                {activeNote.content}
              </p>

              {/* ✅ Delete Button (bottom right inside modal) */}
              <button
                onClick={() => handleDelete(activeNote._id)}
                className="absolute bottom-0 right-0 m-2 text-red-500 font-bold text-lg cursor-pointer"
              >
                <Trash />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default YourNotes;
