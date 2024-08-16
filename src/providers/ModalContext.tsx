"use client";
import { useMemo, useContext, useState } from "react";
import type { ReactNode } from "react";
import { createContext } from "react";

type ModalProviderProps = {
  children: ReactNode;
};

type ModalContextType = {
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const value = useMemo(
    () => ({
      isModalOpen,
      setModalOpen,
    }),
    [isModalOpen, setModalOpen]
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
