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

      // 🔥 Esto procesa el hash del magic link
      const { data, error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      )

      if (error || !data.session) {
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

    handleAuth()
  }, [])

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      Confirmando email...
    </div>
  )
}
