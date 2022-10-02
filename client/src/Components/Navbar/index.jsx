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
  return <h1>This is Navbar</h1>;
};

export { Navbar };
