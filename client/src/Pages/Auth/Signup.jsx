import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import reactSvg from "../../assets/react.svg";
const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    onSubmit: (values) => {
      handleSignup(values);
    },

    validateOnChange: true,
    validate: (values) => {
      let errors = {};
      if (!values.username) {
        errors.username = "Username is required";
      } else if (values.username.length < 6) {
        errors.username = "Username must greater than 5 characters";
      } else if (values.username.length > 20) {
        errors.username = "Username must be smaller than 20 characters";
      }
      if (!values.password) {
        errors.password = "Password is required";
      } else if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(values.password)
      ) {
        errors.password =
          "Password must be at least 8 characters long, contain at least one number, one lowercase and one uppercase letter";
      }

      return errors;
    },
  });

  const FormError = ({ name }) =>
    formik.touched[name] && formik.errors[name] ? (
      <p className="text-red-500 dark:text-red-500 text-sm mt-2">
        {formik.errors[name]}
      </p>
    ) : null;

  const getFormError = (name) =>
    formik.touched[name] && formik.errors[name]
      ? "border-red-500 placeholder-red-900 text-red-900"
      : "border-indigo-900";

  return (
    <section className="py-26 bg-white">
      <div className="container px-4 mx-auto h-screen">
        <div className="max-w-lg mx-auto">
          <div className="text-center my-8">
            <p className="inline-block mx-auto mb-6">
              <img src={reactSvg} alt="" />
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
              Sign up
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              You're just one step away from getting started.
            </p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <label className="block mb-2 font-extrabold">Username</label>
              <div className="relative">
                <input
                  className={`${getFormError(
                    "username"
                  )} inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 rounded`}
                  type="text"
                  placeholder="@john_doe"
                  name="username"
                />
              </div>
              <FormError name="username" />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-extrabold">Password</label>
              <input
                className={`${getFormError(
                  "password"
                )} inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2  rounded`}
                type="password"
                placeholder="********"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <FormError name="password" />
            </div>
            <div className="flex flex-wrap -mx-4 mb-6 items-center justify-between">
              <div className="w-full lg:w-auto px-4 mb-4 lg:mb-0">
                <label>
                  <input type="checkbox" />
                  <span className="ml-1 font-extrabold">
                    I accept all the terms and conditions.
                  </span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200"
            >
              Sign up
            </button>
            <p
              onClick={() => navigate("/login")}
              className="text-center font-extrabold"
            >
              Already have an account?{" "}
              <span className="text-red-500 pointer hover:underline">
                Sign in
              </span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export { Signup };
