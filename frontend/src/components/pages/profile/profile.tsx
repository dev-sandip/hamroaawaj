const Profile = () => {
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
        <div className="flex flex-col items-center h-[60vh] border-4 border-red-500 rounded-[20px] pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full m-7 shadow-lg"
            src="https://2.img-dpreview.com/files/p/E~C1000x0S4000x4000T1200x1200~articles/3925134721/0266554465.jpeg"
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Bonnie Green
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Visual Designer
          </span>
          <div className=" flex space-x-10 h-[7vh] w-auto me-[20vw]">
            <span className="w-10 ms-[20px]">Rank</span>
            <img
              className=" aspect-square w-40 h-40 ms-10 shadow-lg"
              src="https://static.botsrv2.com/website/img/quriobot_favicon.1727b193.png"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
