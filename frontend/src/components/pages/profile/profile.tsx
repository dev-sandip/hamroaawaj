import { useGlobalContext } from "@/hooks/use-global-context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  useEffect(() => {
    // if (!user) {
    //   navigate("/login");
    //   console.log("user not logged in");
    // }
  });

  return (
    <>
      <div className=" max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4">
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span className="sr-only">Open dropdown</span>
            {/* <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg> */}
          </button>
          <div
            id="dropdown"
            className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Export Data
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className=" w-80 flex flex-col items-center border-4 border-gray-500 rounded-lg pb-10">
          <img
            className=" h-24 mb-3 rounded-full m-7 shadow-lg"
            src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-slate-800">
            User
          </h5>
          <span className="text-md text-gray-500 dark:text-gray-400">
            Visual Designer
          </span>
           {/* <div className="   flex  space-x-10 h-[7vh] w-auto me-[20vw]"> */}
            <span className="w-10 h-aut0 mx-8 place-items-center">Rank</span>

            <img
              className=" aspect-square w-14 h-auto  shadow-lg rounded-2xl"
              src="https://cdn-icons-png.flaticon.com/512/8037/8037137.png"
            />
          {/* </div> */}
        </div>
      </div>
      
    </>
  );
};

export default Profile;
