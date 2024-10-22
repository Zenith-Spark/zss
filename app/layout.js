import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "./Theme/ThemeProvider";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/Footer";



export const metadata = {
  title: "Zenith Spark Station",
  description: "Innovative Company",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
        className={` antialiased`}
        >
        <ThemeProvider>
        <Navbar/>
        {children}
        <Footer/>
      </ThemeProvider>
      </body>
    </html>
  );
}

