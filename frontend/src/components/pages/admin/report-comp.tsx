import { Link } from "react-router-dom";

const ReportComp = () => {
  return (
    <Link
      to="#"
      className="
            overflow-hidden
            shadow-lg
            transition
            duration-500
            ease-in-out
            transform
            hover:shadow-2xl
            rounded-lg
            md:w-80
          "
    >
      <img
        alt="blog photo"
        src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
        className="max-h-40 w-full object-cover"
      />
      <div className="bg-white w-full p-4">
        <a href="#" className="text-green-600 text-2xl font-medium">
          Should You Get Online Education?
        </a>
        <p className="text-gray-600 font-light text-md">
          It is difficult to believe that we have become so used to having
          instant access to information at...
        </p>
        <div
          className="
                flex flex-wrap
                justify-starts
                items-center
                py-3
                border-b-2
                text-xs text-white
                font-medium
              "
        ></div>
      </div>
    </Link>
  );
};
export default ReportComp;
