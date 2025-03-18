import React from "react";
import { motion } from "framer-motion";
import Search from "./Search"
import Service from "./Service";
import "../Styles/home.css"; 
import TopSearch from "./TopSearch";

const Hello = () => {
  const variants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        className="hello-container"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        transition={{ duration: 0.85, ease: "easeInOut" }}
      >
        <div className="hello-overlay">
          <motion.p
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="hello-text"
          >
            Get your bus tickets
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="hello-heading"
          >
            Find the best bus for you!
          </motion.h1>
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
      <Service />
      <TopSearch />
    </>
  );
};

export default Hello;
