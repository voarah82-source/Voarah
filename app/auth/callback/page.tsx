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
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {

        if (event === 'SIGNED_IN' && session) {

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
              console.error('Error enviando lead')
              router.replace('/?error=1')
            }

          } catch (err) {
            console.error('Error real:', err)
            router.replace('/?error=1')
          }
        }
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      Confirmando email...
    </div>
  )
}

