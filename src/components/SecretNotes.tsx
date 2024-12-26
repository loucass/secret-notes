'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Note from './Note.tsx'
import { X, Plus, Star, Archive, Lock } from 'lucide-react'
import PasswordModal from './PasswordModal.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/custom.css'
import SecretSearchBar from './SecretSearchBar'

export default function SecretNotes({ onClose }) {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [showArchived, setShowArchived] = useState(false)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [passwordModalMode, setPasswordModalMode] = useState<'lock' | 'unlock'>('lock')
  const [activeNoteId, setActiveNoteId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('secretNotes'))
    // const storedNotes = localStorage.getItem('secretNotes')
    console.log(storedNotes);
    if (storedNotes) {
      try {
        setNotes(storedNotes)
        console.log(notes);
      } catch (error) {
        console.error('Error parsing stored notes:', error)
      }
    }
  }, [])

  useEffect(() => {
    if (notes.length >= 1) {
      try {
        console.log(notes , JSON.stringify(notes));
        localStorage.setItem('secretNotes', JSON.stringify(notes))
      } catch (error) {
        console.error('Error saving notes to localStorage:', error)
      }
    }
  }, [notes])

  const addNote = () => {
    const newNote = { id: Date.now(), title: 'New Note', content: 'Start typing...', favorite: false, archived: false, locked: false }
    setNotes([...notes, newNote])
  }

  const updateNote = (updatedNote) => {
    setNotes(prevNotes => prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
  }

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const toggleFavorite = (id) => {
    setNotes(notes.map((note) => note.id === id ? { ...note, favorite: !note.favorite } : note))
  }

  const toggleArchive = (id) => {
    setNotes(notes.map((note) => note.id === id ? { ...note, archived: !note.archived } : note))
  }

  const toggleLock = (id: number) => {
    const note = notes.find((note) => note.id === id)
    if (note?.locked) {
      setPasswordModalMode('unlock')
    } else {
      setPasswordModalMode('lock')
    }
    setActiveNoteId(id)
    setPasswordModalOpen(true)
  }

  const handlePasswordSubmit = (password: string) => {
    if (passwordModalMode === 'lock') {
      setNotes(notes.map((note) => 
        note.id === activeNoteId ? { ...note, locked: true, password } : note
      ))
    } else if (passwordModalMode === 'unlock') {
      const note = notes.find((note) => note.id === activeNoteId)
      if (note && note.password === password) {
        setNotes(notes.map((note) => 
          note.id === activeNoteId ? { ...note, locked: false, password: null } : note
        ))
        setSelectedNote(note);
      } else {
        alert('Incorrect password')
      }
    }
    setPasswordModalOpen(false)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  }

  const filteredNotes = searchTerm
  ? notes.filter(note =>
      // note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // note.content.toLowerCase().includes(searchTerm.toLowerCase())
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : notes;

  const handleNoteSelect = (note) => {
    if (note.locked) {
      setActiveNoteId(note.id);
      setPasswordModalMode('unlock');
      setPasswordModalOpen(true);
    } else {
      setSelectedNote(note);
    }
  };

  return (
    <div className="secret-notes p-4 position-relative">
      <button
        onClick={onClose}
        className="btn btn-link position-absolute top-0 end-0 text-white"
      >
        <X size={24} />
      </button>
      <h2 className="text-white mb-4">Secret Notes</h2>
      <SecretSearchBar onSearch={handleSearch} />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          onClick={addNote}
          className="btn btn-primary d-flex align-items-center"
        >
          <Plus size={18} className="me-2" />
          Add New Note
        </button>
        <button
          onClick={() => setShowArchived(!showArchived)}
          className="btn btn-secondary d-flex align-items-center"
        >
          <Archive size={18} className="me-2" />
          {showArchived ? 'Hide Archived' : 'Show Archived'}
        </button>
      </div>
      <div className="mb-4">
        {filteredNotes.some(note => note.favorite && !note.archived) && (
          <div className="mb-4">
            <h3 className="text-white mb-3">Starred Notes</h3>
            <ul className="list-unstyled">
              {filteredNotes.sort((a, b) => {
                if (a.favorite && !b.favorite) return -1
                if (!a.favorite && b.favorite) return 1
                return 0
              })
                .filter(note => note.favorite && !note.archived)
                .map((note) => (
                  <NoteItem
                    key={note.id}
                    note={note}
                    onSelect={handleNoteSelect}
                    onToggleFavorite={toggleFavorite}
                    onToggleArchive={toggleArchive}
                    onToggleLock={toggleLock}
                  />
                ))}
            </ul>
          </div>
        )}
        <div className="mb-4">
          <h3 className="text-white mb-3">All Notes</h3>
          <ul className="list-unstyled">
            {filteredNotes.sort((a, b) => {
                if (a.favorite && !b.favorite) return -1
                if (!a.favorite && b.favorite) return 1
                return 0
              })
              .filter(note => !note.favorite && !note.archived)
              .map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onSelect={handleNoteSelect}
                  onToggleFavorite={toggleFavorite}
                  onToggleArchive={toggleArchive}
                  onToggleLock={toggleLock}
                />
              ))}
          </ul>
        </div>
        {showArchived && (
          <div>
            <h3 className="text-white mb-3">Archived Notes</h3>
            <ul className="list-unstyled">
              {filteredNotes.sort((a, b) => {
                if (a.favorite && !b.favorite) return -1
                if (!a.favorite && b.favorite) return 1
                return 0
              })
                .filter(note => note.archived)
                .map((note) => (
                  <NoteItem
                    key={note.id}
                    note={note}
                    onSelect={handleNoteSelect}
                    onToggleFavorite={toggleFavorite}
                    onToggleArchive={toggleArchive}
                    onToggleLock={toggleLock}
                  />
                ))}
            </ul>
          </div>
        )}
      </div>
      <AnimatePresence>
        {selectedNote && (
          <Note
            note={selectedNote}
            onClose={() => setSelectedNote(null)}
            onUpdate={updateNote}
            onDelete={deleteNote}
          />
        )}
      </AnimatePresence>
      <PasswordModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        onSubmit={handlePasswordSubmit}
        mode={passwordModalMode}
      />
    </div>
  )
}

function NoteItem({ note, onSelect, onToggleFavorite, onToggleArchive, onToggleLock }) {
  return (
    <motion.li
      className="note-item mb-2 p-3 rounded d-flex justify-content-between align-items-center"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex-grow-1 me-3" onClick={() => onSelect(note)}>
        <h5 className="mb-0 text-white text-truncate">{note.title}</h5>
      </div>
      <div>
        <button onClick={() => onToggleFavorite(note.id)} className={`btn btn-link p-1 ${note.favorite ? 'text-warning' : 'text-white'}`}>
          <Star size={18} />
        </button>
        <button onClick={() => onToggleArchive(note.id)} className={`btn btn-link p-1 ${note.archived ? 'text-info' : 'text-white'}`}>
          <Archive size={18} />
        </button>
        <button onClick={() => onToggleLock(note.id)} className={`btn btn-link p-1 ${note.locked ? 'text-success' : 'text-white'}`}>
          <Lock size={18} />
        </button>
      </div>
    </motion.li>
  )
}

