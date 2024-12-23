import { motion } from 'framer-motion'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/custom.css'
import React from 'react'

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt: "Exploring the latest trends and technologies shaping the web development landscape.",
    author: "Jane Doe",
    date: "2023-06-15",
  },
  {
    id: 2,
    title: "Mastering React Hooks",
    excerpt: "A comprehensive guide to using React Hooks for state management and side effects.",
    author: "John Smith",
    date: "2023-06-10",
  },
  {
    id: 3,
    title: "The Power of NextJS",
    excerpt: "Discover how NextJS is revolutionizing the way we build React applications.",
    author: "Alice Johnson",
    date: "2023-06-05",
  },
]

export default function NormalContent() {
  return (
    <div className="container bg-white rounded shadow p-4 mb-4">
      <h1 className="text-center mb-4">Welcome to HTTPX</h1>
      <div className="row">
        {blogPosts.map((post) => (
          <motion.div
            key={post.id}
            className="col-md-4 mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title h5">{post.title}</h2>
                <p className="card-text">{post.excerpt}</p>
                <div className="text-muted">
                  <small>{post.author} • {post.date}</small>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

