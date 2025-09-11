import { useUserStore } from "../store/user-store.js";
import { FaExternalLinkAlt } from "react-icons/fa";

const Profile = () => {
  const { userData } = useUserStore();
  return (
    <div className="w-full flex justify-center ">
      <div className="w-[80%] flex flex-col gap-10 ">
        {/* //profile and image sec */}
        <div className="w-full flex justify-center flex-col items-center gap-2">
          <h1 className="text-3xl font-bold text-center sm:text-4xl leading-normal bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            {userData.name}
          </h1>
          <img
            src={userData.profilePic}
            alt="profilePic"
            className="border-2 border-pink-500 rounded-full w-40 h-40 sm:h-60 sm:w-60"
          />
        </div>
        {/* //About sec */}
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl leading-normal bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            About
          </h1>
          <p className="text-l mb-6  bg-gradient-to-r from-gray-50 via-gray-400 to-gray-600 bg-clip-text text-transparent">
            {userData.bio}
          </p>
        </div>

        {/* skills sec */}
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl leading-normal bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Skills
          </h1>
          <p className="text-l mb-6  bg-gradient-to-r from-orange-50 via-orange-400 to-orange-600 bg-clip-text text-transparent">
            {userData.skills.map((skill, index) => (
              <span key={index} className="mr-2 font-mono">
                #{skill}
              </span>
            ))}
          </p>
        </div>

        {/* projects sec */}
        <div className="w-full flex flex-col gap-5">
          <h1 className="text-2xl font-bold sm:text-3xl leading-normal mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Projects
          </h1>
          <div className="flex flex-col flex-wrap gap-3 sm:flex-row sm:gap-5 w-full sm:justify-items-start">
            {userData.projects.map((project, index) => (
              <div
                className="flex flex-col  gap-1 px-2 py-1 rounded-2xl shadow-lg border-dotted border-2 bg-gradient-to-tl from-pink-50 via-red-400 to-purple-600 sm:w-100"
                key={index}
              >
                <h2 className="font-bold text-gray-100 ">{project.title}</h2>
                <p className="text-sm text-gray-900 font-semibold">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  className="hover:underline font-semibold flex gap-1 text-blue-900 items-center"
                >
                  view project
                  <span>
                    <FaExternalLinkAlt size={15} className="text-blue-900" />
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
