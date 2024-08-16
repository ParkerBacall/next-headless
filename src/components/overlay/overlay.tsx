"use client";
import React from "react";
import { useModal } from "@/providers/ModalContext";
import { closeDrawer } from "../overlay/overlayActions";

const Overlay = () => {
  const {isModalOpen, setModalOpen } = useModal();

  const handleClick = () => {
    setModalOpen(!isModalOpen);
    closeDrawer();
  };

  return (
    <div
      onClick={handleClick}
      id="overlay"
      className="invisible fixed inset-0 z-1 bg-overlay opacity-0 transition-all duration-300"
      style={{ backdropFilter: "blur(5px)" }}
    ></div>
  );
};

export default Overlay;
