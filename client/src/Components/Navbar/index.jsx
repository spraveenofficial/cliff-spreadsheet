import { useState } from "react";
import { NavLink } from "react-router-dom";

const navbarItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    access: "common",
  },
  {
    title: "Subscriptions",
    path: "/subscriptions",
    access: "common",
  },
  {
    title: "Sign In",
    path: "/login",
    access: "public",
  },
  {
    title: "Sign Up",
    path: "/register",
    access: "public",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isAuthenticated = false; // TODO: Get this from the context/store

  return (
    <nav className="flex items-center bg-gray-800 p-3 flex-wrap">
      <a className="p-2 mr-4 inline-flex items-center">
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-current text-white h-8 w-8 mr-2"
        >
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
        <span className="text-xl text-white font-bold uppercase tracking-wide">
          Cliff
        </span>
      </a>
      <button
        className="text-white sm:inline-flex p-3 hover:bg-gray-900 rounded hidden ml-auto hover:text-white outline-none nav-toggler"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="material-icons">menu</i>
      </button>
      <div
        className={`w-full lg:inline-flex lg:flex-grow lg:w-auto md:inline-flex md:flex-grow md:w-auto ${
          !isOpen && "hidden"
        }`}
      >
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto lg:items-center md:inline-flex md:flex-row md:ml-auto md:w-auto w-full md:items-center items-start  flex flex-col md:h-auto">
          {navbarItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="pointer md:inline-flex md:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
            >
              <span>{item.title}</span>
            </NavLink>
          ))}
          {isAuthenticated && (
            <>
              <div className="md:inline-flex md:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white">
                <span>{user.username}</span>
              </div>
              <p
                onClick={handleLogout}
                className="pointer md:inline-flex md:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
              >
                <span>Logout</span>
              </p>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
