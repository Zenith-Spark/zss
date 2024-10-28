import "./globals.css";
import ThemeProvider from "./Theme/ThemeProvider";
import ClientLayout from "./ClientLayout"; // Separate client logic
import { GlobalStateProvider } from "./GlobalStateProvider";

export const metadata = {
  title: "Zenith Spark Station",
  description: "Innovative Company",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add favicon here */}
        <link rel="icon" href="/public/img/loadingscreen.webp" sizes="any" />
      </head>
      <body className="antialiased">
        <GlobalStateProvider>
          <ThemeProvider>
            <ClientLayout>{children}</ClientLayout>
          </ThemeProvider>
        </GlobalStateProvider>
      </body>
    </html>
  );
}

