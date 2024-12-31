'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'

export default function SecretSearchBar({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const toggleSearch = () => {
    setIsOpen(!isOpen)
    if (isOpen) {
      setSearchTerm('')
      onSearch('')
    }
  }

  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)
    onSearch(term)
  }

  return (
    <div className="secret-search-bar mb-4">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="input-group"
          >
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search notes..."
              className="form-control bg-dark text-white border-0"
            />
            <button
              onClick={toggleSearch}
              className="btn btn-outline-secondary border-0"
              type="button"
            >
              <X size={20} className="text-white" />
            </button>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleSearch}
            className="btn btn-outline-secondary border-0"
          >
            <Search size={20} className="text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

