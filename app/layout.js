import "./globals.css";
import ThemeProvider from "./Theme/ThemeProvider";
import ClientLayout from "./ClientLayout"; // Separate client logic
import { GlobalStateProvider } from "./GlobalStateProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Zenith Spark Station",
  description: "Innovative Company",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ToastContainer/>
        <GlobalStateProvider>
          <ThemeProvider>
            <ClientLayout>{children}</ClientLayout>
          </ThemeProvider>
        </GlobalStateProvider>
      </body>
    </html>
  );
}

