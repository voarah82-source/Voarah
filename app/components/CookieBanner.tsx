'use client'

import { useEffect, useState } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('voarah_cookies_accepted')
    if (!accepted) {
      setVisible(true)
    }
  }, [])

  function acceptCookies() {
    localStorage.setItem('voarah_cookies_accepted', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        right: 16,
        maxWidth: 960,
        margin: '0 auto',
        background: '#ffffff',
        border: '1px solid #e5e5e5',
        borderRadius: 12,
        padding: '16px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
        zIndex: 5000,
        fontFamily: 'Montserrat, system-ui, sans-serif'
      }}
    >
      <p
        style={{
          fontSize: 13,
          color: '#555',
          margin: 0,
          flex: 1
        }}
      >
        Este sitio utiliza cookies técnicas y de análisis para mejorar la
        experiencia del usuario.
      </p>

      <button
        onClick={acceptCookies}
        style={{
          padding: '10px 16px',
          background: '#8E24AA',
          color: '#ffffff',
          border: 'none',
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          whiteSpace: 'nowrap'
        }}
      >
        Aceptar
      </button>
    </div>
  )
}
