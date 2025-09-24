import { Link } from "react-router";
import { useUserStore } from "../store/user-store.js";
import { useEffect } from "react";

const HomeCard = () => {
  const { users, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full flex justify-center items-center gap-5">
      {/* This is the container */}
      <div className="w-[95%] sm:w-[85%] flex flex-col items-center sm:flex-row sm:gap-5 sm:gap-x-5 flex-wrap justify-center">
        {users.map((user) => (
          <Link
            key={user._id}
            to={`/devProfile/${user._id}`}
            className="px-2 py-2 mt-4 h-[200px] flex flex-col rounded-2xl shadow-xs bg-purple-300 hover:bg-purple-200 shadow-red-300 overflow-hidden hover:cursor-pointer sm:w-100 relative"
          >
            <div className="flex gap-3 items-center">
              <img
                src={user.profilePic}
                width={50}
                height={50}
                alt="profile"
                className="border-2 border-pink-500 rounded-full"
              />
              <h1 className="font-bold">{user.name}</h1>
            </div>

            {user.skills && (
              <p className="text-sm text-red-600 mt-3">
                {user.skills.map((skill, index) => (
                  <span key={index}>
                    #{skill}
                    {"  "}
                  </span>
                ))}
              </p>
            )}

            {user.bio && (
              <p className="text-sm mt-3 flex flex-wrap px-2 overflow-visible">
                {user.bio}
                <span className="text-blue-700">more..</span>
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
