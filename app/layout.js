import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MJC Club Application',
  description: `Facilitating club success is the highest priority for Campus Life & Student Learning. 
  With many clubs taking part in hundreds of activities each year, it is important that each club understands 
  and knows what is required to hold meetings, use funds, and host events that are all within the rules of the 
  district and Modesto Junior College.`
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
      <script src="https://kit.fontawesome.com/5fc59c26d3.js" crossorigin="anonymous"></script>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
