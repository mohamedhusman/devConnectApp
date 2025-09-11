import { FaSearch } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="w-full flex justify-center items-center py-20 overflow-x-hidden">
      <div className="w-[80%] flex flex-col gap-10 ">
        <h1 className="text-4xl font-bold  sm:text-center sm:text-6xl leading-normal bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Discover Developers and share feedback together
        </h1>

        <div className="">
          <p className="text-l mb-6 text-center bg-gradient-to-r from-gray-50 via-gray-400 to-gray-600 bg-clip-text text-transparent">
            Brows profiles, connect with peers
          </p>
          <div className="flex justify-center items-center ">
            <div className="flex border-pink-500 border-1  pr-2 pl-2 h-10 items-center w-[80%] sm:w-[60%] gap-2 rounded-full">
              <input
                type="search"
                className=" w-full h-full caret-purple-400 focus:outline-none"
              />
              <FaSearch className="text-lg text-pink-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
