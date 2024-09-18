import React from "react";
import { motion } from "framer-motion";

type Props = {
  children?: React.ReactNode;
  Close: () => void;
};

const Modal = ({ children, Close }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-black bg-opacity-5 absolute left-0 top-0 backdrop-blur-sm w-screen h-screen flex items-center justify-center z-20"
      onClick={Close}
    >
      {children}
    </motion.div>
  );
};

export default Modal;
