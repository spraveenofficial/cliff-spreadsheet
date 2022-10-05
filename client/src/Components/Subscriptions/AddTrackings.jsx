import { Button, Select, Spinner } from "@chakra-ui/react";
import { MyModal } from "../Modal";
import axios from "../../https/axios";
import { useEffect, useState } from "react";
import { useAssets } from "../../Hooks/assets";

const AddTrackings = ({ email, isOpen, onOpen, onClose }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useAssets();

  const [state, setState] = useState({
    data: [],
    loading: true,
    message: "",
    error: false,
    success: false,
  });

  const [selected, setSelected] = useState({
    sheetId: "",
    sheetName: "",
    spreadsheetName: "",
  });

  const isDisabled =
    !selected.spreadsheetName || !selected.sheetId || !selected.sheetName;

  const handleLoadTrackings = async () => {
    setState({ ...state, loading: true });
    try {
      const { data } = await axios.post("/sheets/data", { email });
      if (data.success) {
        setState({
          ...state,
          data: data.data,
          message: data.message,
          loading: false,
          success: true,
        });
      }
    } catch (error) {
      setState({
        ...state,
        error: true,
        loading: false,
        message: error.response.data.message,
        success: false,
      });
    }
  };

  const handleSelect = (e) => {
    const { name, value } = e.target;
    if (name === "sheetId") {
      const sheet = state.data.find((sheet) => sheet.id === value);
      return setSelected({
        ...selected,
        sheetId: value,
        spreadsheetName: sheet.name,
      });
    }
    setSelected({ ...selected, [name]: value });
  };

  useEffect(() => {
    if (isOpen) {
      handleLoadTrackings();
    }
  }, [isOpen]);

  const handleAddTrackings = async () => {
    setIsAdding(true);
    try {
      const { data } = await axios.post("/sheets/add", {
        email,
        sheetId: selected.sheetId,
        sheetName: selected.sheetName,
        spreadsheetName: selected.spreadsheetName,
      });
      toast(data.message, data.success ? "success" : "error");
      onClose();
    } catch (error) {
      toast(error.response.data.message, "error");
    }
    setIsAdding(false);
  };

  return (
    <MyModal title={email} isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      {state.loading ? (
        <div className="flex justify-center items-center text-center">
          <Spinner size="xl" />
        </div>
      ) : state.success ? (
        <>
          <div className="w-full">
            <label>Select SpreadSheet</label>
            <Select
              name="sheetId"
              onChange={handleSelect}
              mt={1}
              placeholder="Select option"
            >
              {state.data.map((sheets) => (
                <option
                  key={sheets.id}
                  className="overflow-hidden"
                  value={sheets.id}
                >
                  {sheets.name}
                </option>
              ))}
            </Select>
            <div className="mt-2">
              <label className="mt-4">Select Sheet</label>
              <Select
                name="sheetName"
                onChange={handleSelect}
                mt={1}
                placeholder="Select option"
              >
                {selected.sheetId &&
                  state.data
                    .filter((id) => id.id === selected.sheetId)[0]
                    ?.sheets.map((sheetsName) => (
                      <option
                        key={sheetsName}
                        className="overflow-hidden"
                        value={sheetsName}
                      >
                        {sheetsName}
                      </option>
                    ))}
              </Select>
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <Button
              isLoading={isAdding}
              loadingText="Adding"
              onClick={handleAddTrackings}
              disabled={isDisabled}
              colorScheme="blue"
            >
              Add
            </Button>
          </div>
        </>
      ) : (
        !state.loading &&
        state.error && (
          <div className="flex justify-center items-center text-center">
            <p className="text-xl font-bold text-red-700">{state.message}</p>
          </div>
        )
      )}
    </MyModal>
  );
};

export { AddTrackings };
