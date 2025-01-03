import React from 'react'
import { Link } from 'react-router-dom'

export default function Products() {
  return (
    <div>
      <p>This is Products</p>
      <Link to="/" className='underline'>go to dashboard</Link>
    </div>
  )
}
