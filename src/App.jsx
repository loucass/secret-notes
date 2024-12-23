'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NormalContent from './components/NormalContent.tsx'
import SecretNotes from './components/SecretNotes.tsx'
import MockData from './components/MockData.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/custom.css'

export default function App() {
  const [showSecret, setShowSecret] = useState(false)
  const [keySequence, setKeySequence] = useState('')

  useEffect(() => {
    const handleKeyPress = (e) => {
      setKeySequence((prev) => {
        const newSequence = (prev + e.key).slice(-4);
        if (newSequence === 'open') {
          setShowSecret(true);
        }
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  useEffect(() => {
    if (keySequence === 'open') {
      setShowSecret(true)
    }
  }, [keySequence])

  const closeSecretNotes = () => {
    setShowSecret(false);
    setKeySequence('');
  };

  return (
    <main className="min-vh-100 d-flex flex-column justify-content-center align-items-center p-4 position-relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!showSecret ? (
          <motion.div
            key="normal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container"
          >
            <NormalContent />
            <MockData />
          </motion.div>
        ) : (
          <motion.div
            key="secret"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container bg-dark bg-opacity-75 rounded p-4"
          >
            <SecretNotes onClose={closeSecretNotes} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

