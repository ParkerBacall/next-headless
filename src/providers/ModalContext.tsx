"use client";
import { closeDrawer, openDrawer } from "@/components/overlay/overlayActions";
import { useMemo, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { createContext } from "react";

type ModalProviderProps = {
  children: ReactNode;
};

type ModalContextType = {
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
  closeModal: () => void;
  openModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    closeDrawer();
  }, []);

  const openModal = useCallback(() => {
    setModalOpen(true);
    openDrawer();
  }, []);

  const value = useMemo(
    () => ({
      isModalOpen,
      setModalOpen,
      openModal,
      closeModal,
    }),
    [isModalOpen, setModalOpen, openModal, closeModal]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
