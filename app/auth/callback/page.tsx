'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

export default function AuthCallback() {
  const router = useRouter()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const handleAuth = async () => {

      // 🔥 ESTA LÍNEA ES LA CLAVE
      await supabase.auth.exchangeCodeForSession(window.location.href)

      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.replace('/')
        return
      }

      const pending = localStorage.getItem('pendingLead')

      if (!pending) {
        router.replace('/')
        return
      }

      try {
        const res = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: pending
        })

        if (!res.ok) {
          console.error('Error enviando lead')
        } else {
          localStorage.removeItem('pendingLead')
        }

      } catch (err) {
        console.error('Error real:', err)
      }

      router.replace('/?success=1')
    }

    handleAuth()
  }, [])

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      Confirmando email...
    </div>
  )
}

