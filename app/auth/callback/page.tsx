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
      // Esto procesa el token del hash
      await supabase.auth.getSession()

      const pending = localStorage.getItem('pendingLead')

      if (pending) {
        await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: pending
        })

        localStorage.removeItem('pendingLead')
      }

      // Redirigimos al home con flag de éxito
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
