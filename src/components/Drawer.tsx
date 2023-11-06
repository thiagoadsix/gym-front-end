"use client"

import React from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}

export function Drawer({ isOpen, onClose, className, children }: DrawerProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="drawer-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={handleBackdropClick} />
        {/* Drawer container */}
        <section className="fixed inset-y-0 right-0 max-w-full flex outline-none" aria-labelledby="drawer-heading">
          {/* Drawer panel */}
          <div className={`relative w-screen max-w-md transform transition ease-in-out duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'} ${className}`}>
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              {/* Close button */}
              <div className="p-6">
                <button onClick={onClose} className="bg-zinc-600 hover:bg-zinc-900 text-zinc-50 text-lg font-semibold rounded-lg px-2 py-1.5">
                  X
                </button>
              </div>
              {/* Content */}
              <div className="flex-1 p-6">
                {children}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
