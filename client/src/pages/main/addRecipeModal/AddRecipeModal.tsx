import { AnimatePresence, motion } from "framer-motion";
import { AddRecipeModalProvider } from "../../../context/addRecipeModalContext";
import AddRecipeFirst from "./AddRecipeFirst";
import { Dispatch, SetStateAction, useState } from "react";
import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  Cancel01Icon,
} from "hugeicons-react";
import AddRecipeSecond from "./AddRecipeSecond";
import LoadingButton from "../../../components/UI/LoadingButton";

export enum MODAL_STATE {
  FIRST,
  SECOND,
  THIRD,
}

const AddRecipeModalHeader = ({
  Close,
  state,
  changeState,
}: {
  Close: () => void;
  state: MODAL_STATE;
  changeState: Dispatch<SetStateAction<MODAL_STATE>>;
}) => {
  return (
    <header className="flex justify-end h-fit items-center w-full p-2 border-b-2 border-borderColor relative">
      <div className="absolute left-0 top-[-3.5rem] bg-white rounded-full p-2 shadow-lg">
        <Cancel01Icon
          color="#CA054D"
          size={24}
          className="cursor-pointer"
          onClick={Close}
        />
      </div>
      {(state === MODAL_STATE.SECOND || state === MODAL_STATE.THIRD) && (
        <ArrowLeft02Icon
          color="#CA054D"
          size={40}
          className="cursor-pointer"
          onClick={() => {
            let nextState: MODAL_STATE = MODAL_STATE.FIRST;
            if (state === MODAL_STATE.SECOND) {
              nextState = MODAL_STATE.FIRST;
            } else if (state === MODAL_STATE.THIRD) {
              nextState = MODAL_STATE.SECOND;
            }
            changeState(nextState);
          }}
        />
      )}
      <h1 className="w-full text-center font-semibold text-lg">Add Recipe</h1>
      {(state === MODAL_STATE.FIRST || state === MODAL_STATE.SECOND) && (
        <ArrowRight02Icon
          color="#CA054D"
          size={40}
          className="cursor-pointer"
          onClick={() => {
            let nextState: MODAL_STATE = MODAL_STATE.FIRST;
            if (state === MODAL_STATE.FIRST) {
              nextState = MODAL_STATE.SECOND;
            } else if (state === MODAL_STATE.SECOND) {
              nextState = MODAL_STATE.THIRD;
            }
            changeState(nextState);
          }}
        />
      )}
      {state === MODAL_STATE.THIRD && (
        <LoadingButton label="Post" loading={false} type="button" />
      )}
    </header>
  );
};

const AddRecipeModal = ({ Close }: { Close: () => void }) => {
  const [modalState, setModalState] = useState(MODAL_STATE.FIRST);

  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="bg-white w-[90%] h-[calc(100%-8em)] lg:w-[45%] rounded-md shadow-lg flex flex-col"
    >
      <AddRecipeModalProvider>
        <AddRecipeModalHeader
          Close={Close}
          state={modalState}
          changeState={setModalState}
        />
        <AnimatePresence mode="wait">
          {modalState === MODAL_STATE.FIRST && <AddRecipeFirst />}
          {modalState === MODAL_STATE.SECOND && <AddRecipeSecond />}
        </AnimatePresence>
      </AddRecipeModalProvider>
    </motion.div>
  );
};

export default AddRecipeModal;
