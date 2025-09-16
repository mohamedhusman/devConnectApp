import { FaCamera } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { useUserStore } from "../store/user-store.js";
import { useState } from "react";

const UpdateProfile = () => {
  const { userData } = useUserStore();
  const [updateSkillInput, setUpdateSkillInput] = useState("");
  const [userCrentials, setUserCrentials] = useState({
    name: userData.name,
    bio: userData.bio,
    skills: userData.skills,
    profilePic: userData.profilePic,
    projects: userData.projects,
    email: userData.email,
  });

  const handleImageOnChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUserCrentials((prev) => ({
        ...prev,
        profilePic: reader.result,
      }));
    };
  };
  const handleUpdateSkill = (e) => {
    e.preventDefault();
    setUserCrentials((prev) => ({
      ...prev,
      skills: [...prev.skills, updateSkillInput],
    }));
    setUpdateSkillInput("");
  };
  const handleRemoveSkill = (skill) => {
    // setUserCrentials((prev) => ({
    //   ...prev,
    //   skills: prev.skills.filter((s) => s !== skill),
    // }));
  };

  return (
    <div className="w-full flex justify-center pb-20">
      <div className="w-[80%] flex flex-col gap-10 ">
        <h1 className="text-3xl font-bold text-center sm:text-4xl leading-normal bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Update Profile
        </h1>

        {/* image sec */}
        <div className="w-full flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={userCrentials.profilePic}
              alt="profile"
              className="border-2 border-pink-500 rounded-full h-40 w-40 sm:h-60 sm:w-60"
            />
            <div className="absolute right-[24%] top-[90%]">
              <div className="relative">
                <FaCamera className="text-2xl sm:text-3xl text-white " />
                <input
                  type="file"
                  className="absolute h-[30px] w-[30px] top-0 left-0 right-0 bottom-0 z-1 text-transparent"
                  onChange={handleImageOnChange}
                />
              </div>
            </div>
          </div>
          <p className="text-sm text-center bg-gradient-to-r from-gray-50 via-gray-400 to-gray-50 bg-clip-text text-transparent">
            Click the camera icon to change your profile picture
          </p>
        </div>

        {/* inputs */}
        <div className="flex flex-col w-full sm:items-center gap-3">
          {/* name */}
          <div className="w-full sm:w-160">
            <p className="font-semibold text-sm leading-normal text-pink-500">
              Name
            </p>
            <input
              type="text"
              name="name"
              className="w-full h-10 border-2  outline-fuchsia-500 rounded-md outline-none text-pink-400 px-2"
              value={userCrentials.name}
              onChange={(e) =>
                setUserCrentials({ ...userCrentials, name: e.target.value })
              }
            />
          </div>

          {/* email */}
          <div className="w-full sm:w-160">
            <p className="font-semibold text-sm leading-normal text-pink-500">
              Email
            </p>
            <input
              type="email"
              name="name"
              className="w-full h-10 border-2  outline-fuchsia-500 rounded-md outline-none text-pink-400 px-2"
              value={userCrentials.email}
              onChange={(e) =>
                setUserCrentials({ ...userCrentials, email: e.target.value })
              }
            />
          </div>

          {/* bio */}
          <div className="w-full sm:w-160">
            <p className="font-semibold text-sm leading-normal text-pink-500">
              Bio
            </p>
            <textarea
              type="text"
              name="name"
              maxLength={100}
              className="w-full h-10 border-2  outline-fuchsia-500 rounded-md outline-none text-pink-400 px-2 py-2 min-h-20"
              value={userCrentials.bio}
              onChange={(e) =>
                setUserCrentials({ ...userCrentials, bio: e.target.value })
              }
            />
          </div>

          {/* skills */}
          <div className="sm:w-160 flex flex-col gap-2">
            <h2 className="font-semibold text-sm leading-normal text-pink-500">
              Skills ({userCrentials.skills.length})
            </h2>
            <div className="w-full flex gap-5 flex-wrap ">
              {userCrentials.skills.map((skill, index) => (
                <div
                  className="w-fit px-2 pt-2 pb-1 bg-pink-600 rounded-md font-mono drop-shadow-md relative drop-shadow-fuchsia-300"
                  key={index}
                >
                  <span className="text-xs sm:text-sm text-black">{skill}</span>
                  <IoIosClose
                    className="absolute right-0 top-0 text-lg text-white font-black"
                    onClick={handleRemoveSkill(skill)}
                  />
                </div>
              ))}
            </div>

            {/* Add skill */}
            <div className="w-40 sm:w-50 border-1 sm:border-2 border-fuchsia-500 rounded-md flex gap-2 mt-5">
              <input
                type="text"
                name="name"
                className="w-full h-6 sm:h-10 border-2 placeholder-gray-400 placeholder:text-xs sm:placeholder:text-sm pl-2 rounded-lg outline-none text-sm sm:text-md border-none text-pink-400"
                maxLength={20}
                placeholder="type to add a skill"
                value={updateSkillInput}
                onChange={(e) => setUpdateSkillInput(e.target.value)}
              />
              <button
                className="w-10  h-6 sm:h-10 flex justify-center items-center bg-fuchsia-900 rounded-r-md hover:bg-fuchsia-950"
                onClick={handleUpdateSkill}
              >
                <IoIosAdd className="text-2xl text-pink-500" />
              </button>
            </div>
          </div>

          {/* Projects */}
          <div className="flex flex-col gap-4 w-full sm:w-160">
            <h2 className="font-semibold text-sm leading-normal text-pink-500">
              Projects ({userCrentials.projects.length})
            </h2>
            <div className="w-full flex gap-5 flex-wrap">
              {userCrentials.projects.map((project) => (
                <div
                  className="w-fit border-1 border-fuchsia-500 rounded-md flex flex-col gap-2 sm:gap-3 py-2 sm:py-3 px-2 sm:px-3 relative"
                  key={project._id}
                >
                  {/* Title */}
                  <div className="flex flex-col justify-center ">
                    <label htmlFor="title" className="text-xs text-amber-100">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="border-[0.5px] border-amber-100 rounded-md outline-none text-amber-100 px-2 py-1 text-xs sm:h-10 sm:w-100 w-60"
                      value={project.title}
                    />
                  </div>
                  {/* description */}
                  <div className="flex flex-col justify-center">
                    <label
                      htmlFor="description"
                      className="text-xs text-amber-100"
                    >
                      Description
                    </label>
                    <textarea
                      maxLength={100}
                      name="description"
                      className="border-[0.5px] border-amber-100 rounded-md outline-none text-amber-100 px-2 py-1 text-xs sm:min:h-20 sm:w-100"
                      value={project.description}
                    />
                  </div>
                  {/* link */}
                  <div className="flex flex-col justify-center">
                    <label htmlFor="link" className="text-xs text-amber-100">
                      Link
                    </label>
                    <input
                      type="text"
                      name="link"
                      className="border-[0.5px] border-amber-100 rounded-md outline-none text-amber-100 px-2 py-1 text-xs sm:h-10 sm:w-100"
                      value={project.link}
                    />
                  </div>
                  {/* close  Icon */}
                  <div className="absolute top-[-5px] right-[-5px] p-[2px] rounded-full bg-pink-500 hover:bg-pink-700">
                    <IoIosClose
                      hanging={50}
                      width={50}
                      color="white"
                      className="bold"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="py-2 px-4 bg-pink-500 rounded-md flex w-fit font-semibold hover:bg-pink-700">
              Add Project <IoIosAdd className="text-2xl text-fuchsia-50" />
            </button>
          </div>

          <div className="w-full flex justify-end">
            <button className="font-semibold text-sm sm:text-xl leading-normal text-black py-2 px-4 rounded-md bg-pink-500 hover:bg-pink-700  ">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
