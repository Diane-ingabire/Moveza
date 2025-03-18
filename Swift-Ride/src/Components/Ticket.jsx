import React from "react"; 
import { motion } from "framer-motion";
import Search from "./Search";

import "../Styles/ticket.css"; 


const Ticket = () => {
  const variants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        className="ticket-container"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        transition={{ duration: 0.85, ease: "easeInOut" }}
      >
        <div className="ticket-overlay">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="hello-text"
          >
          Reserve your Ticket
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="ticket-heading"
          >
           Want to change Route
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Search />
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export default Ticket;
