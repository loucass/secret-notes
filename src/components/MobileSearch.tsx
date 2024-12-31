'use client'

import React, { useState } from 'react'
import { Search } from 'lucide-react'

interface MobileSearchProps {
  onSearch: (searchTerm: string) => void;
}

export default function MobileSearch({ onSearch }: MobileSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
    setSearchTerm('')
  }

  return (
    <form onSubmit={handleSubmit} className="mobile-search-form d-md-none mb-4 w-100">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="submit">
          <Search size={20} />
        </button>
      </div>
    </form>
  )
}

