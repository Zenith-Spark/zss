import "./globals.css";
import ThemeProvider from "./Theme/ThemeProvider";
import ClientLayout from "./ClientLayout"; // Separate client logic

export const metadata = {
  title: "Zenith Spark Station",
  description: "Innovative Company",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider>
          {/* Client-side layout handling */}
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
