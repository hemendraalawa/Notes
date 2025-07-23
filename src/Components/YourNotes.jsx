import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Trash } from "lucide-react";
import axios from "axios";

const YourNotes = ({ searchQuery }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const { notes, fetchNotes } = useContext(AuthContext);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [searchNote, setSearchNote] = useState([]);

  const openModal = (note) => {
    setActiveNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveNote(null);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`https://notes-backend-e62d.onrender.com/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Note deleted successfully!");
      fetchNotes();
      setIsModalOpen(false);
      setActiveNote(null);
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete note");
    }
  };

  const handleEditClick = (note) => {
    setNoteToEdit(note);
    setEditModalOpen(true);
    setIsModalOpen(false);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://notes-backend-e62d.onrender.com/api/posts/${noteToEdit._id}`,
        {
          title: noteToEdit.title,
          content: noteToEdit.content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Note updated successfully!");
      setEditModalOpen(false);
      fetchNotes();
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update note");
    }
  };

  const fetchSearchNotes = async () => {
    try {
      const res = await axios.get(
        `https://notes-backend-e62d.onrender.com/api/posts/search?q=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSearchNote(res.data);
    } catch (err) {
      console.error("Error fetching searched notes:", err);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchSearchNotes();
    }
  }, [searchQuery]);

  // Notes to display: search results if query exists, otherwise all notes
  const notesToDisplay = searchQuery ? searchNote : notes;

  return (
    <>
      {/* MAIN SCREEN */}
      <div className="NotesContainer md:mt-3 md:ml-0 mr-3 ml-3 bg-gray-100 h-auto md:h-170 md:w-full px-10 py-3 rounded-2xl">
        <h3 className="text-2xl font-bold text-gray-600 mb-4">Your Notes</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notesToDisplay.length > 0 ? (
            notesToDisplay.map((note) => (
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
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 font-semibold text-lg py-10">
              No Data Found.😒🤣
            </div>
          )}
        </div>
      </div>

      {/* VIEW MODAL */}
      {isModalOpen && activeNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white w-11/12 md:w-1/2 h-1/2 rounded-xl p-5 shadow-2xl border border-gray-300 animate-fadeZoom relative">
            <div className="absolute top-2 right-3">
              <button
                onClick={closeModal}
                className="text-gray-600 font-bold text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <h3 className="font-bold text-2xl text-gray-700 mb-4 mt-2">
              {activeNote.title}
            </h3>

            <div className="w-full h-[70%] overflow-y-scroll thin-black-scrollbar pr-2 relative">
              <p className="text-sm text-gray-700 leading-relaxed">
                {activeNote.content}
              </p>

              <button
                onClick={() => handleDelete(activeNote._id)}
                className="absolute bottom-0 right-0 m-2 text-red-500 font-bold text-lg cursor-pointer"
              >
                <Trash />
              </button>

              <button
                onClick={() => handleEditClick(activeNote)}
                className="absolute bottom-0 left-0 m-2 text-red-500 font-bold text-lg cursor-pointer"
              >
                ✏️ Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModalOpen && noteToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white w-11/12 md:w-1/2 h-1/2 rounded-xl p-5 shadow-2xl border border-gray-300 animate-fadeZoom relative">
            <h2 className="text-lg font-bold mb-4">Edit Note</h2>
            <input
              type="text"
              className="w-full mb-3 px-4 py-2 border rounded"
              value={noteToEdit.title || ""}
              onChange={(e) =>
                setNoteToEdit({ ...noteToEdit, title: e.target.value })
              }
            />
            <textarea
              className="w-full mb-3 px-4 py-2 border rounded"
              value={noteToEdit.content || ""}
              rows={5}
              onChange={(e) =>
                setNoteToEdit({ ...noteToEdit, content: e.target.value })
              }
            ></textarea>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default YourNotes;
