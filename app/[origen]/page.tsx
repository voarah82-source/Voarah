import { redirect } from 'next/navigation'

export default function OrigenPage({ params }: { params: { origen: string } }) {
  const origen = params.origen

  redirect(`/?origen=${origen}`)
}
