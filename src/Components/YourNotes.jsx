import React, { useState } from "react";

const YourNotes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* MAIN SCREEN */}
      <div className="NotesContainer md:mt-3 md:ml-0 mr-3 ml-3 bg-gray-100 h-auto md:h-170 md:w-full px-10 py-3 rounded-2xl">
        <h3 className="text-2xl font-bold text-gray-600 mb-4">Your Notes</h3>

        {/* NOTE PREVIEW */}
        <div
          onClick={openModal}
          className="NoteCard bg-white w-full md:w-1/2 p-5 border border-gray-600 cursor-pointer rounded-xl  shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h3 className="font-bold text-xl text-gray-600 mb-2">Title</h3>
          <div className="w-full h-24 overflow-y-scroll thin-black-scrollbar my-2">
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
              quibusdam. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <p className="font-bold text-sm text-gray-600">03/07/2025</p>
        </div>
      </div>

      {/* POPUP MODAL CENTERED */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white w-1/2 h-1/2 rounded-xl p-5 shadow-2xl border border-gray-300 animate-fadeZoom relative">
            {/* CLOSE BUTTON */}
            <div className="absolute top-2 right-3">
              <button
                onClick={closeModal}
                className="text-gray-600 font-bold text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <h3 className="font-bold text-2xl text-gray-700 mb-4 mt-2">Title</h3>

            <div className="w-full h-[70%] overflow-y-scroll thin-black-scrollbar pr-2">
              <p className="text-sm text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum
                possimus vitae quos amet, fugiat quae repudiandae exercitationem
                officiis officia similique labore fuga rem cumque perspiciatis et
                odit magnam eius. Corporis? Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Rerum possimus vitae quos amet,
                fugiat quae repudiandae exercitationem officiis officia similique
                labore fuga rem cumque perspiciatis et odit magnam eius. Corporis?
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default YourNotes;
