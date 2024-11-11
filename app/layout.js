import "./globals.css";
import ThemeProvider from "./Theme/ThemeProvider";
import ClientLayout from "./ClientLayout"; // Separate client logic
import { GlobalStateProvider } from "./GlobalStateProvider";
import DynamicTitle from './DynamicTitle';

export const metadata = {
  title: "Zenith Spark Station",
  description: "Innovative Company",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="antialiased">
        <GlobalStateProvider>
          <ThemeProvider>
            <ClientLayout>{children}</ClientLayout>
            <DynamicTitle /> {/* Client component to dynamically set title */}
          </ThemeProvider>
        </GlobalStateProvider>
      </body>
    </html>
  );
}
