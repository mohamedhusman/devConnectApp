import { useParams } from "react-router";
import { useUserStore } from "../store/user-store.js";
import { useEffect } from "react";
import Loader from "../components/Loader.jsx";
import { FaExternalLinkAlt } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { useState } from "react";

const PDevProfile = () => {
  const { id } = useParams();
  const {
    fetchDeveloperData,
    selectedDevData,
    isLoading,
    fetchFeedback,
    feedback,
    postFeedback,
  } = useUserStore();

  const [formOpen, setFromOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    fetchDeveloperData(id);
    fetchFeedback(id);
  }, [id]);

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    postFeedback(id, formData);
    setFromOpen(false);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    setTimeout(() => {
      fetchFeedback(id);
    }, 1000);
  };

  if (isLoading && selectedDevData === null) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (selectedDevData) {
    return (
      <div className="w-full flex justify-center ">
        <div className="w-[80%] flex flex-col gap-10 ">
          {/* //profile and image sec */}
          <div className="w-full flex justify-center flex-col items-center gap-2">
            <h1 className="text-3xl font-bold text-center sm:text-4xl leading-normal bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              {selectedDevData.name}
            </h1>
            <img
              src={selectedDevData.profilePic}
              alt="profilePic"
              className="border-2 border-pink-500 rounded-full w-40 h-40 sm:h-60 sm:w-60 object-cover"
            />
          </div>
          {/* //About sec */}
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl leading-normal bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              About
            </h1>
            <p className="text-l mb-6  bg-gradient-to-r from-gray-50 via-gray-400 to-gray-600 bg-clip-text text-transparent">
              {selectedDevData.bio ? (
                selectedDevData.bio
              ) : (
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-50 ">
                  Empty!
                </p>
              )}
            </p>
          </div>

          {/* skills sec */}
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl leading-normal bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Skills
            </h1>
            <div className="text-l mb-6 bg-gradient-to-r from-orange-50 via-orange-400 to-orange-600 bg-clip-text text-transparent">
              {selectedDevData.skills && selectedDevData.skills.length > 0 ? (
                selectedDevData.skills.map((skill, index) => (
                  <span key={index} className="mr-2 font-mono">
                    #{skill}
                  </span>
                ))
              ) : (
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-50">
                  Empty!
                </p>
              )}
            </div>
          </div>

          {/* projects sec */}
          <div className="w-full flex flex-col gap-5">
            <h1 className="text-2xl font-bold sm:text-3xl leading-normal mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Projects
            </h1>
            <div className="flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-5 w-full sm:justify-items-start">
              {selectedDevData.projects &&
              selectedDevData.projects.length > 0 ? (
                selectedDevData.projects.map((project, index) => (
                  <div
                    className="flex flex-col  gap-1 px-2 py-1 rounded-2xl shadow-lg border-dotted border-2 bg-gradient-to-tl from-pink-50 via-red-400 to-purple-600 sm:w-100"
                    key={index}
                  >
                    <h2 className="font-bold text-gray-100 ">
                      {project.title}
                    </h2>
                    <p className="text-sm text-gray-900 font-semibold">
                      {project.description}
                    </p>
                    <a
                      href={project.link}
                      className="hover:underline font-semibold flex gap-1 text-blue-900 items-center"
                    >
                      view project
                      <span>
                        <FaExternalLinkAlt
                          size={15}
                          className="text-blue-900"
                        />
                      </span>
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-50">
                  Empty!
                </p>
              )}
            </div>
          </div>

          {/* feedback section */}
          <div className="w-full flex flex-col gap-5">
            <h1 className="text-2xl font-bold sm:text-3xl leading-normal bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Feedbacks ( {feedback.length} )
            </h1>

            {feedback && feedback.length > 0 ? (
              feedback.map((feedback) => (
                <div key={feedback._id}>
                  <div className="mb-2">
                    <h3 className="text-xs bg-gradient-to-r from-pink-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                      @{feedback.name}
                    </h3>
                    <p className="text-sm text-gray-50">{feedback.message}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-50">
                No feedbacks!
              </p>
            )}

            {/* feedback button */}
            <button
              className="flex items-center justify-center py-2 px-3  hover:bg-gradient-to-r bg-gradient-to-l from-pink-400 via-orange-400 to-purple-500 text-xs w-fit gap-1 rounded-full font-semibold hover:text-white mb-20 transition-colors duration-500"
              onClick={() => setFromOpen(true)}
            >
              <p>Write a feedback</p>
              <TfiWrite />
            </button>
          </div>

          {/* feedback form */}
          {formOpen && (
            <div className="fixed inset-0  flex justify-center items-center">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xs z-0"></div>

              <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-[400px] relative z-10 text-gray-50">
                <h2 className="text-2xl font-semibold mb-4 ">feedback</h2>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={handleSubmitFeedback}
                >
                  <input
                    type="text"
                    placeholder="name"
                    className="p-2 border border-gray-300 rounded focus:outline-purple-500 placeholder:text-gray"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="email"
                    className="p-2 border border-gray-300 rounded focus:outline-purple-500 placeholder:text-gray"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />

                  <textarea
                    placeholder="feedback"
                    className="p-2 border border-gray-300 rounded h-[100px] focus:outline-purple-500 placeholder:text-gray"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition duration-300"
                  >
                    Submit
                  </button>
                </form>
                <button
                  className="mt-4 text-red-500 hover:text-red-700"
                  onClick={() => setFromOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default PDevProfile;
