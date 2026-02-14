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
    const run = async () => {

      // 🔥 Fuerza validación real del usuario
      const { data, error } = await supabase.auth.getUser()

      if (error || !data.user) {
        router.replace('/?error=auth')
        return
      }

      const pending = localStorage.getItem('pendingLead')

      if (!pending) {
        router.replace('/?error=nopayload')
        return
      }

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
    }

    run()
  }, [])

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      Confirmando email...
    </div>
  )
}

