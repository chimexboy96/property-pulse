import React from 'react'

import Navbar from '@/components/Navbar.jsx'
import { ToastContainer } from 'react-toastify';
import { GlobalProvider } from '@/context/GlobalContext';
import '@/assets/styles/globals.css'
import Footer from '@/components/Footer.jsx'
import AuthProvider from '@/components/AuthProvider'
import 'photoswipe/dist/photoswipe.css'


export const metadata ={
    title: 'property pulse | find the perfact rental',
    description: 'Find your dream home/rental property',
    keywords: 'rental, find your home, rental property '
}; 

const MainLayout = ({children}) => {
  return (
    <GlobalProvider> 
    <AuthProvider> 
    <html lang='en'>
        <body>
          <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
        </body>
    </html>
    </AuthProvider>
    </GlobalProvider>
  )
}

export default MainLayout