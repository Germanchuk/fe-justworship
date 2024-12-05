import React from 'react'

export default function Preferences() {
  return (
    <div><button className='btn btn-primary' onClick={() => window.location.reload()}>Hard reload</button></div>
  )
}
