'use client'

import { useState } from 'react'
import Header from '../../components/Header'

const DATA = [
  {
    titulo: 'Mudanzas',
    items: ['Con embalaje', 'Desembalaje', 'Solo transporte']
  },
  {
    titulo: 'Guardamuebles y Self-Storage',
    items: ['Recogida', 'Entrega', 'Bauleras']
  },
  {
    titulo: 'Limpieza',
    items: ['Hogares', 'Oficinas', 'Pileta', 'Poda']
  },
  {
    titulo: 'Diseño interior',
    items: ['Proyectos', 'Planos', 'Certificaciones']
  },
  {
    titulo: 'Mantenimiento',
    items: ['Pintura', 'Plomería', 'Electricidad']
  }
]

export default function Page() {
  const [open, setOpen] = useState(true)
  const [active, setActive] = useState(0)
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (item: string) => {
    setSelected(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    )
  }

  return (
    <>
      <Header onOpenModal={() => setOpen(true)} />

      {/* CTA REAL */}
      <div style={{ textAlign: 'center', marginTop: 60 }}>
        <div
          onClick={() => setOpen(true)}
          style={{
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'linear-gradient(135deg,#9c27b0,#7b1fa2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 600,
            margin: '0 auto',
            cursor: 'pointer'
          }}
        >
          Activar
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="overlay" onClick={() => setOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>¿Qué necesitás?</h2>

            <div className="box">
              {/* LEFT */}
              <div className="left">
                {DATA.map((row, i) => (
                  <div
                    key={i}
                    onClick={() => setActive(i)}
                    className={`leftItem ${active === i ? 'active' : ''}`}
                  >
                    {row.titulo}
                  </div>
                ))}
              </div>

              {/* RIGHT */}
              <div className="right">
                {DATA[active].items.map(item => (
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
          </div>
        </div>
      )}

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal {
          width: 900px;
          max-width: 95%;
          background: #fff;
          border-radius: 16px;
          padding: 30px;
        }

        h2 {
          margin-bottom: 20px;
        }

        .box {
          display: grid;
          grid-template-columns: 280px 1fr;
          border: 1px solid #ddd;
          border-radius: 10px;
          overflow: hidden;
        }

        .left {
          background: #e3f2fd;
          display: flex;
          flex-direction: column;
        }

        .leftItem {
          padding: 16px;
          cursor: pointer;
          border-bottom: 1px solid #d0d0d0;
          font-weight: 500;
        }

        .leftItem.active {
          background: #cfe8ff;
          font-weight: 600;
        }

        .right {
          padding: 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-content: flex-start;
        }

        .chip {
          padding: 10px 14px;
          background: #f0f0f0;
          border-radius: 10px;
          cursor: pointer;
          transition: 0.2s;
        }

        .chip:hover {
          background: #e0e0e0;
        }

        .chip.selected {
          background: #8e24aa;
          color: #fff;
        }

        /* RESPONSIVE REAL */
        @media (max-width: 768px) {
          .box {
            grid-template-columns: 1fr;
          }

          .left {
            flex-direction: row;
            overflow-x: auto;
          }

          .leftItem {
            white-space: nowrap;
            border-bottom: none;
            border-right: 1px solid #ddd;
          }
        }
      `}</style>
    </>
  )
}
