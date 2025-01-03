import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div>
      <p>This is Dashboard</p>
      <Link to="/products" className='underline'>go to products</Link>
    </div>
  )
}
