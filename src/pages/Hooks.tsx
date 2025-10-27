"use client";

import LoadingSpinner from "../components/LoadingSpinner"
import { Dropdown } from "../components/DropdownClickOutside";
import { Modal } from "../components/ModalClickOutside";
import { useState } from "react";
import HTitle from "../components/textComponents/HTitle";

export default function Hooks() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="mx-2">
      <HTitle text="Hooks" />
      <LoadingSpinner bg="lightgray"/* hex code or red, green etc. */ spinColor=""/* tailwind text-green-600 */ />
      <Dropdown button={<p>button click outside to close</p>} children={
        <>
          <p>asdf</p>
          <p>as12312312</p>
        </>
      }/>
      
      <button onClick={()=> setIsModalOpen(true)} className="mx-2 p-2 border">Modal click outside to close</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} children={
        <>
        <p>modal content</p>
        </>
      }/>
    </div>
  );
};

