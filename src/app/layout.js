import "@/styles/globals.scss";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
      <link rel="icon" href="/assets/brand/favicon.svg" sizes="any" />

      </head>
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
