import React from "react";

const CreateNote = () => {
  return (
    <>
      <div className="flex w-1/2  ">
        <div className="createNote bg-gray-100 w-full h-170 text-center px-10 py-5 m-3 rounded-2xl">
          <h1 className="text-2xl font-bold text-gray-600 mb-4 ">Create a Note</h1>
          <div className="textBox flex flex-col gap-2">
            <input
              className="bg-white p-2 border border-gray-600 outline-0"
              type="text"
              placeholder="Title"
            />
            <textarea
              className="bg-white p-2 border border-gray-600 outline-0 h-120 resize-auto"
              placeholder="What's on your mind"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNote;
