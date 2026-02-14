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

      // 🔥 Dejar que Supabase procese el hash automáticamente
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.replace('/?error=auth')
        return
      }

      const pending = localStorage.getItem('pendingLead')

      if (!pending) {
        router.replace('/?success=1')
        return
      }

      try {
        const res = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: pending
        })

        if (res.ok) {
          localStorage.removeItem('pendingLead')
          router.replace('/?success=1')
        } else {
          router.replace('/?error=lead')
        }

      } catch {
        router.replace('/?error=lead')
      }
    }

    // 🔥 Esperar 500ms para que Supabase hidrate sesión
    setTimeout(handleAuth, 500)

  }, [])

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      Confirmando email...
    </div>
  )
}

