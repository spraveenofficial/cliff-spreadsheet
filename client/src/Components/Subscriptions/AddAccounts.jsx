import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../Context/auth-context";
import { useAssets } from "../../Hooks/assets";
import axios from "../../https/axios";

const AddAccount = ({ length = 1 }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [loading, setLoading] = useState(code ? true : false);
  const { toast } = useAssets();
  const { dispatch } = useAuth();

  const handleAddNewAccount = async () => {
    if (loading) return;
    setLoading((old) => !old);
    try {
      const { data } = await axios.post("/google/add");
      if (data.success) {
        window.location.href = data.data;
      }
    } catch (error) {
      setLoading((old) => !old);
      toast(error.response.data.message, "error");
    }
  };

  const fetchIsAccountAdded = async () => {
    if (!code) return;
    try {
      const { data } = await axios.get(`/google/callback?code=${code}`);
      dispatch({ type: "ADD_ACCOUNT", payload: data.data });
      toast(data.message, data.success ? "success" : "error");
    } catch (error) {
      toast(error.response.data.message, "error");
    }
    setSearchParams({});
    setLoading((old) => !old);
  };

  useEffect(() => {
    if (code) {
      fetchIsAccountAdded();
    }
  }, [code]);

  return (
    <div
      onClick={handleAddNewAccount}
      className="relative pointer h-56 border-gray-200 border-4 rounded p-4 mt-2 flex flex-col justify-center items-center text-center"
    >
      {loading && (
        <div className="z-[100] backdrop-blur-sm modal overscroll-auto absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <Spinner size={"xl"} />
        </div>
      )}
      <i className="material-icons font-bold text-4xl">+</i>
      <h1 className="text-2xl font-bold">Add Account</h1>
      <p className="text-gray-500">
        Add your{" "}
        {length > 0
          ? "More Accounts to Monitor"
          : "First account to get started"}
      </p>
    </div>
  );
};

export { AddAccount };
