import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/custom.css'

interface PasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (password: string) => void
  mode: 'lock' | 'unlock'
}

export default function PasswordModal({ isOpen, onClose, onSubmit, mode }: PasswordModalProps) {
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (isOpen) {
      setPassword('')
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(password)
    setPassword('')
  }

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'lock' ? 'Set Password' : 'Enter Password'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === 'lock' ? 'Enter new password' : 'Enter password'}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onSubmit(password)}>
          {mode === 'lock' ? 'Lock Note' : 'Unlock Note'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

