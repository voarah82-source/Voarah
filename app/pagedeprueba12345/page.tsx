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
    items: ['Hogar', 'Oficinas', 'Pileta', 'Poda']
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
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<number | null>(null)

  return (
    <>
      <Header onOpenModal={() => setOpen(true)} />

      <main style={{ padding: 60, background: '#f4f4f6' }}>
        {/* CTA REAL */}
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <div
            onClick={() => setOpen(true)}
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#9c27b0,#7b1fa2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 18,
              fontWeight: 600,
              margin: '0 auto',
              cursor: 'pointer'
            }}
          >
            Activar
          </div>
        </div>
      </main>

      {/* MODAL */}
      {open && (
        <div className="overlay" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>¿Qué necesitás?</h2>

            <div className="table">
              {DATA.map((row, i) => (
                <div key={i} className="row">
                  <div
                    className="left"
                    onClick={() =>
                      setActive(active === i ? null : i)
                    }
                  >
                    {row.titulo}
                  </div>

                  <div className="right">
                    {active === i &&
                      row.items.map((item) => (
                        <div key={item} className="item">
                          {item}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
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

        .table {
          display: flex;
          flex-direction: column;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
        }

        .row {
          display: grid;
          grid-template-columns: 300px 1fr;
          border-bottom: 1px solid #eee;
        }

        .left {
          background: #e3f2fd;
          padding: 16px;
          font-weight: 600;
          cursor: pointer;
        }

        .right {
          padding: 16px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .item {
          background: #f5f5f5;
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
        }

        /* RESPONSIVE BIEN HECHO */
        @media (max-width: 768px) {
          .row {
            grid-template-columns: 1fr;
          }

          .left {
            border-bottom: 1px solid #ddd;
          }
        }
      `}</style>
    </>
  )
}
