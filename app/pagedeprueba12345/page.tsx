'use client'

import { useState } from 'react'
import Header from '../../components/Header'

export default function PageDePrueba() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const inputStyle = {
    padding: '12px 14px',
    borderRadius: 10,
    border: '1px solid #ddd',
    fontSize: 14
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)

    console.log('DATA:', Object.fromEntries(formData))

    setTimeout(() => {
      setLoading(false)
      alert('TEST OK')
    }, 1000)
  }

  return (
    <>
      <Header onOpenModal={() => setOpen(true)} />

      <main style={{ padding: 40, textAlign: 'center' }}>
        <h1>TEST NUEVO FORM</h1>

        {/* CTA CIRCULAR */}
        <div
          onClick={() => setOpen(true)}
          style={{
            margin: '40px auto',
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: '#8E24AA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Activar
        </div>
      </main>

      {/* MODAL */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              padding: 30,
              borderRadius: 12,
              width: 700,
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <h2>Nuevo formulario</h2>

            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              {/* DATOS */}
              <input name="nombre" placeholder="Nombre" style={inputStyle} />
              <input name="email" placeholder="Email" style={inputStyle} />
              <input name="telefono" placeholder="Teléfono" style={inputStyle} />

              {/* SERVICIOS */}
              <div>
                <h3>Servicios</h3>

                <details>
                  <summary>Logística</summary>
                  <label><input type="checkbox" name="servicio_mudanza" /> Mudanza</label>
                  <label><input type="checkbox" name="servicio_guardamuebles" /> Guardamuebles</label>
                </details>

                <details>
                  <summary>Hogar</summary>
                  <label><input type="checkbox" name="servicio_limpieza" /> Limpieza</label>
                  <label><input type="checkbox" name="servicio_pintura" /> Pintura</label>
                  <label><input type="checkbox" name="servicio_mantenimiento" /> Mantenimiento</label>
                </details>

                <details>
                  <summary>Otros</summary>
                  <label><input type="checkbox" name="servicio_decoracion" /> Decoración</label>
                  <label><input type="checkbox" name="servicio_otros" /> Otros</label>
                  <input name="servicio_otros_texto" placeholder="Especificar" style={inputStyle} />
                </details>
              </div>

              {/* PRODUCTOS */}
              <div>
                <h3>Productos</h3>

                <details>
                  <summary>Construcción</summary>
                  <label><input type="checkbox" name="producto_materiales_obra" /> Materiales</label>
                  <label><input type="checkbox" name="producto_pintura" /> Pintura</label>
                </details>

                <details>
                  <summary>Equipamiento</summary>
                  <label><input type="checkbox" name="producto_electrodomesticos" /> Electrodomésticos</label>
                  <label><input type="checkbox" name="producto_muebles" /> Muebles</label>
                </details>

                <details>
                  <summary>Otros</summary>
                  <label><input type="checkbox" name="producto_otros" /> Otros</label>
                  <input name="producto_otros_texto" placeholder="Especificar" style={inputStyle} />
                </details>
              </div>

              <button
                type="submit"
                style={{
                  padding: 14,
                  background: '#8E24AA',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8
                }}
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
