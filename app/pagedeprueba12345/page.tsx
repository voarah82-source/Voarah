'use client'

import { useState } from 'react'
import Header from '../../components/Header'

export default function Page() {
  const [open, setOpen] = useState(false)
  const [tipo, setTipo] = useState<'servicios' | 'productos' | null>(null)
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    )
  }

  const categorias = {
    servicios: [
      'Mudanzas',
      'Guardamuebles',
      'Limpieza',
      'Diseño interior',
      'Mantenimiento',
      'Seguridad',
      'Jardinería'
    ],
    productos: [
      'Materiales',
      'Muebles',
      'Electrodomésticos',
      'Iluminación',
      'Herramientas',
      'Bienes usados'
    ]
  }

  return (
    <>
      <Header onOpenModal={() => {}} />

      <main
        style={{
          minHeight: '100vh',
          background: '#f5f5f7',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 40
        }}
      >
        <div
          style={{
            width: 420,
            background: '#fff',
            borderRadius: 24,
            padding: 24,
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
          }}
        >
          {/* HEADER */}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <h1 style={{ fontSize: 28, marginBottom: 8 }}>
              Un sitio.
              <br />
              Todas las soluciones.
            </h1>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <div className="pill">Solución en 24hs</div>
              <div className="pill active">Más seguridad</div>
              <div className="pill">Profesionales validados</div>
            </div>
          </div>

          {/* SELECTOR */}
          <h3 style={{ textAlign: 'center', marginBottom: 16 }}>
            ¿Qué necesitás?
          </h3>

          <div style={{ display: 'flex', gap: 12 }}>
            <div
              onClick={() => setTipo('servicios')}
              className={`card ${tipo === 'servicios' ? 'active' : ''}`}
            >
              🚚
              <span>Servicios</span>
            </div>

            <div
              onClick={() => setTipo('productos')}
              className={`card ${tipo === 'productos' ? 'active' : ''}`}
            >
              🔨
              <span>Productos</span>
            </div>
          </div>

          {/* CATEGORIAS */}
          {tipo && (
            <div style={{ marginTop: 20 }}>
              <div className="grid">
                {categorias[tipo].map((item) => (
                  <div
                    key={item}
                    onClick={() => toggle(item)}
                    className={`chip ${
                      selected.includes(item) ? 'selected' : ''
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={() => setOpen(true)}
            style={{
              marginTop: 24,
              width: '100%',
              padding: 14,
              borderRadius: 12,
              border: 'none',
              background: '#e1bee7',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            ¡Elegir!
          </button>
        </div>
      </main>

      {/* MODAL FORM */}
      {open && (
        <div className="overlay" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Completá tus datos</h2>

            <input placeholder="Nombre" />
            <input placeholder="Email" />
            <input placeholder="Teléfono" />

            <div style={{ marginTop: 12 }}>
              <strong>Seleccionado:</strong>
              <div style={{ marginTop: 6 }}>
                {selected.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <button className="submit">Enviar</button>
          </div>
        </div>
      )}

      {/* STYLES */}
      <style jsx>{`
        .pill {
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 10px;
          background: #eee;
        }

        .pill.active {
          background: #e1bee7;
        }

        .card {
          flex: 1;
          background: #f5f5f5;
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: center;
          font-weight: 500;
        }

        .card.active {
          background: #e1bee7;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .chip {
          padding: 10px;
          border-radius: 10px;
          background: #f0f0f0;
          text-align: center;
          cursor: pointer;
          font-size: 13px;
        }

        .chip.selected {
          background: #8e24aa;
          color: #fff;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal {
          background: #fff;
          padding: 24px;
          border-radius: 16px;
          width: 400px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .modal input {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .tag {
          display: inline-block;
          padding: 4px 8px;
          background: #eee;
          border-radius: 8px;
          margin-right: 6px;
          font-size: 12px;
        }

        .submit {
          margin-top: 12px;
          padding: 12px;
          border: none;
          border-radius: 10px;
          background: #8e24aa;
          color: #fff;
          font-weight: 600;
        }
      `}</style>
    </>
  )
}
