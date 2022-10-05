import React, { useState, useEffect } from "react";
import axios from "../../https/axios";
import moment from "moment";
import { useAuth } from "../../Context/auth-context";
import { Button, Spinner, useDisclosure } from "@chakra-ui/react";
import { MyModal } from "../../Components";
import { useAssets } from "../../Hooks/assets";

const DashBoard = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);
  const [selected, setSelected] = useState(null);
  const { toast } = useAssets();
  const [state, setState] = useState({
    data: [],
    loading: true,
    message: "",
    error: false,
  });

  const handleFetchData = async () => {
    if (
      user?.subscriptions.length === 0 ||
      (!state.loading && state.data.length === 0)
    ) {
      setState({
        ...state,
        loading: false,
        message: "No Trackings Found, Add Trackings",
        error: true,
      });
      return;
    }
    if (state.data.length > 0) return;
    setState({ ...state, loading: true });
    try {
      const { data } = await axios.get("/sheets/trackings");
      if (data.success) {
        setState({
          ...state,
          data: data.data,
          message: data.message,
          loading: false,
        });
      }
    } catch (error) {
      setState({
        ...state,
        error: true,
        loading: false,
        message: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleModal = (id) => {
    setSelected(id);
    onOpen();
  };

  const handleDeleteTracking = async () => {
    setIsDeleting(true);
    try {
      const { data } = await axios.delete(`/sheets/trackings/${selected}`);
      if (data.success) {
        setState({
          ...state,
          data: state.data.filter((item) => item.id !== selected),
        });
        onClose();
        toast(data.message, "success");
      }
    } catch (error) {
      toast(error.response.data.message, "error");
    }
    setIsDeleting(false);
  };

  function ShowModal({ isOpen, onOpen, onClose, isDeleting }) {
    return (
      <MyModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <div className="flex flex-col text-center mb-4 space-y-2 justify-center items-center h-24">
          <h1 className="text-2xl font-extrabold">Are you Sure?</h1>
          <p className="text-gray-500 text-sm">
            This will permanently delete this tracking from your account.
          </p>
        </div>
        <div className="flex justify-end space-x-1">
          <Button onClick={onClose} colorScheme="red">
            Cancel
          </Button>
          <Button
            isLoading={isDeleting}
            loadingText="Deleting"
            onClick={handleDeleteTracking}
            colorScheme="green"
          >
            Confirm
          </Button>
        </div>
      </MyModal>
    );
  }

  // Memoized ShowModal
  const MemoizedModal = React.memo(ShowModal);

  if (state.loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-bold text-red-700">{state.message}</p>
      </div>
    );
  }
  return (
    <div className="home h-screen p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <MemoizedModal
        title="Are you Sure?"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        isDeleting={isDeleting}
      />
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="py-3 px-4 w-[7%]  whitespace-nowrap overflow-hidden text-ellipsis"
              >
                Status
              </th>
              <th
                scope="col"
                className="py-3 px-6 w-[40%] sm:w-[30%] whitespace-nowrap overflow-hidden text-ellipsis"
              >
                Name
              </th>
              <th
                scope="col"
                className="py-3 px-6 w-[15%] sm:w-[20%] whitespace-nowrap overflow-hidden text-ellipsis"
              >
                <div>Sheet</div>
              </th>
              <th scope="col" className="py-4 px-4 w-[10%] sm:w-fit">
                <div className="flex items-center">Columns</div>
              </th>
              <th scope="col" className="py-3 px-6  w-2/7 sm:hidden">
                <div className="flex items-center">Created at</div>
              </th>
              <th
                scope="col"
                className="py-3 px-6 sm:w-fit w-[10%] whitespace-nowrap overflow-hidden text-ellipsis"
              >
                <div className="flex justify-end">Action</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {state.data.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="py-3 relative px-6 font-medium text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap dark:text-white">
                  <span
                    className={`top-5 left-5 absolute w-3 h-3 border-2 border-white dark:border-gray-800 rounded-full ${
                      item.isTracking ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                </td>
                <td className="py-3 px-6 font-medium text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap dark:text-white">
                  {item.spreadSheetName}
                </td>
                <td className="py-3 px-6 overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.sheetName}
                </td>
                <td className="py-3 px-6 font-bold">{item.columnLength}</td>
                <td className="sm:hidden py-3 px-6 overflow-hidden text-ellipsis whitespace-nowrap">
                  {moment(item.createdAt).format("DD/MM/YYYY, h:mm a")}
                </td>
                <td className="py-3 px-6 text-right">
                  <i
                    onClick={() => handleModal(item.id)}
                    className="cursor-pointer material-icons text-md text-red-700"
                  >
                    delete
                  </i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { DashBoard };
