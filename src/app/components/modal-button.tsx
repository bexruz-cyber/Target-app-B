"use client"

import { useState } from "react"
import { FormModal } from "./form-modal"
import "../style/modal.css"

export function ModalButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="homeCenterBtn">
      RO'YXATDAN O'TISH
      </button>

      <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
