import ClientProvider from "./ClientProvider";
import "./globals.css";

export const metadata = {
  title:{
    default:"Zeverial",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <ClientProvider>
        {children}
        </ClientProvider>
      </body>
    </html>
  );
}
