"use client";
import React from "react";
import { useModal } from "@/providers/ModalContext";

const Overlay = () => {
  const {closeModal } = useModal();
  return (
    <div
      onClick={closeModal}
      id="overlay"
      className="invisible fixed inset-0 z-1 bg-overlay opacity-0 transition-all duration-300"
      style={{ backdropFilter: "blur(5px)" }}
    ></div>
  );
};

export default Overlay;
