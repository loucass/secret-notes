'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Minus, Square, Sun, Moon, Star, Archive, Lock } from 'lucide-react'
import { Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/custom.css'

export default function Note({ note, onClose, onUpdate, onDelete }) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [isDark, setIsDark] = useState(note.isDark || true)
  const [isFavorite, setIsFavorite] = useState(note.favorite)
  const [isArchived, setIsArchived] = useState(note.archived)

  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
    setIsDark(note.isDark || true)
    setIsFavorite(note.favorite)
    setIsArchived(note.archived)
  }, [note])

  const handleSave = () => {
    onUpdate({ ...note, title, content, isDark, favorite: isFavorite, archived: isArchived })
    onClose()
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const toggleArchive = () => {
    setIsArchived(!isArchived)
  }

  const toggleLock = () => {
    if (note.locked) {
      onUpdate({ ...note, locked: false, password: null });
    } else {
      const password = prompt("Enter a password to lock the note:");
      if (password) {
        onUpdate({ ...note, locked: true, password });
      }
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered dialogClassName={`note-modal ${isDark ? 'dark' : 'light'}`}>
      <Modal.Header className="border-0">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="mac-buttons">
            <button onClick={onClose} className="mac-button mac-close" />
            <div className="mac-button mac-minimize">
              <Minus size={8} className="m-auto" />
            </div>
            <div className="mac-button mac-maximize">
              <Square size={8} className="m-auto" />
            </div>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control border-0 bg-transparent text-center flex-grow-1 mx-2"
            placeholder="Untitled Note"
          />
          <div className="d-flex">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFavorite}
              className={`btn btn-link p-1 ${isFavorite ? 'text-warning' : ''}`}
            >
              <Star size={14} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleArchive}
              className={`btn btn-link p-1 ${isArchived ? 'text-info' : ''}`}
            >
              <Archive size={14} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleLock}
              className={`btn btn-link p-1 ${note.locked ? 'text-success' : ''}`}
            >
              <Lock size={14} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="btn btn-link p-1"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </motion.button>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-control"
          rows={10}
          placeholder="Start typing your note..."
          disabled={note.locked}
        />
      </Modal.Body>
      <Modal.Footer>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDelete(note.id)}
          className="btn btn-danger"
        >
          Delete
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="btn btn-primary"
        >
          Save
        </motion.button>
      </Modal.Footer>
    </Modal>
  )
}

