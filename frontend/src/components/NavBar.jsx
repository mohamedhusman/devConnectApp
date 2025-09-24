import { Link } from "react-router";
import { useUserStore } from "../store/user-store.js";
import { useEffect } from "react";
import { useState } from "react";

const NavBar = () => {
  const { getUserData, userData, logout, isAuthenticated } = useUserStore();

  const [options, setOptions] = useState(false);

  useEffect(() => {
    getUserData();
  }, [isAuthenticated]);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <header className="w-full flex justify-center items-center">
      <div className="w-[95%] sm:w-[85%] py-4 px-6 mt-5 flex justify-between items-center relative">
        <Link
          to={"/"}
          className="text-2xl  md:text-3xl font-bold text-gray-50"
          style={{ fontFamily: "Modern Negra" }}
        >
          Dev Connect
        </Link>

        {userData ? (
          <div className="flex gap-4 items-center">
            <img
              src={userData.profilePic}
              width={50}
              height={50}
              alt="profile"
              className="border-2 border-pink-500 rounded-full"
              onClick={() => setOptions(!options)}
            />
            {options && (
              <div
                className="flex flex-col gap-1.5 bg-amber-50 py-1 px-2 rounded-xl absolute top-10 right-15 text-sm font-semibold"
                onMouseLeave={() => setOptions(false)}
              >
                <Link className="hover:text-gray-700" to={"/profile"}>
                  view profile
                </Link>
                <Link className="hover:text-gray-700" to={"/profile/update"}>
                  update profile
                </Link>
                <a
                  className="hover:cursor-pointer hover:text-gray-700"
                  onClick={handleLogout}
                >
                  logout
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4 ">
            <Link
              to={"/register"}
              className="hover:border-gray-50 border-1 py-2 px-3 rounded-xl text-gray-900 hover:text-gray-50 bg-gray-50 hover:bg-black transition-colors duration-300"
            >
              Register
            </Link>

            <Link
              to={"/login"}
              className="hover:bg-black py-2 px-3 rounded-xl border-1 border-gray-50 text-gray-50 transition-colors duration-300 "
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
