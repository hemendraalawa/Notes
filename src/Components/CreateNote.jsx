import React, { useState } from "react";
import axios from "axios";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreateNote = async () => {
    if (!title || !content) {
      alert("Please fill in both title and content");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/posts", // 🔁 Replace with your backend URL if deployed
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Note created successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Failed to create note");
    }
  };

  return (
    <div className="flex w-full md:w-1/2">
      <div className="createNote bg-gray-100 w-full h-70 md:h-170 text-center px-10 py-3 m-3 rounded-2xl">
        <h1 className="text-2xl font-bold text-gray-600 mb-4">Create a Note</h1>
        <div className="textBox flex flex-col gap-2">
          <input
            className="bg-white p-2 w-full border border-gray-600 outline-0"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="bg-white p-2 border border-gray-600 outline-0 w-full resize-auto h-[100px] md:h-[450px]"
            placeholder="What's on your mind"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button
          onClick={handleCreateNote}
          className="p-2 bg-yellow-300 text-gray-600 w-full mt-3 border-0 cursor-pointer"
        >
          Create Note
        </button>
      </div>
    </div>
  );
};

export default CreateNote;
