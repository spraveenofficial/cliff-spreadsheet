import { useState } from "react";
import { useAssets } from "../../Hooks/assets";
import axios from "../../https/axios";
import { useAuth } from "../../Context/auth-context";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import { AddTrackings } from "./AddTrackings";
import moment from "moment";

const AddedAccount = ({ name, email, picture, expiry_date }) => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toast } = useAssets();
  const { dispatch } = useAuth();

  const handleRemoveAccount = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/google/remove", { email });
      dispatch({ type: "REMOVE_ACCOUNT", payload: email });
      toast(data.message, "success");
    } catch (error) {
      toast(error.response.data.message, "error");
    }
    setLoading(false);
  };

  return (
    <div className="pointer h-56 border-gray-200 border-4 relative rounded p-4 mt-2 flex flex-col justify-center items-center text-center">
      <AddTrackings
        email={email}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
      <img src={picture} className="rounded-full w-16 h-16" />
      <i
        onClick={handleRemoveAccount}
        className="material-icons max-w-full text-gray-500 absolute top-0 right-0 text-3xl"
      >
        delete
      </i>
      {loading && (
        <div className="z-[100] backdrop-blur-sm modal overscroll-auto absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <Spinner size={"xl"} />
        </div>
      )}
      <h1 className="text-xl font-bold">{name}</h1>
      <div className="demotext">
        <p className="text-gray-500 text-sm">{email}</p>
      </div>
      <p className="text-gray-500 text-sm">
        {moment(expiry_date).format("DD/MM/YYYY hh:mm A")}
      </p>
      <p
        onClick={onOpen}
        className="text-white text-sm bg-blue-400 p-2 rounded-md mt-1"
      >
        Add Tracks
      </p>
    </div>
  );
};

export { AddedAccount };
