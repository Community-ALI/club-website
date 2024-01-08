import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MJC Club Application',
  description: `Facilitating club success is the highest priority for Campus Life & Student Learning. 
  With many clubs taking part in hundreds of activities each year, it is important that each club understands 
  and knows what is required to hold meetings, use funds, and host events that are all within the rules of the 
  district and Modesto Junior College.`,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" id="root">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
