import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Modal from "../components/UI/Modal";
import AddRecipeModal from "./main/addRecipeModal/AddRecipeModal";
import { createContext, useState } from "react";
import { AnimatePresence } from "framer-motion";

export const addRecipeModalContext = createContext({});

const AppLayout = () => {
  const [addRecipeModalOpen, setAddRecipeModalOpen] = useState(false);

  return (
    <div className="h-screen w-screen">
      <addRecipeModalContext.Provider
        value={{ addRecipeModalOpen, setAddRecipeModalOpen }}
      >
        <Navbar />
        <Outlet />
        <AnimatePresence mode="wait">
          {addRecipeModalOpen && (
            <Modal Close={() => setAddRecipeModalOpen(false)}>
              <AddRecipeModal Close={() => setAddRecipeModalOpen(false)} />
            </Modal>
          )}
        </AnimatePresence>
      </addRecipeModalContext.Provider>
    </div>
  );
};

export default AppLayout;
