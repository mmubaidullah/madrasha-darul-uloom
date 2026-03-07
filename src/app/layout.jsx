import "./globals.css";
import Providers from "@/components/providers/Providers";

export const metadata = {
  title: "মাদরাসা ব্যবস্থাপনা সিস্টেম",
  description: "একটি সম্পূর্ণ মাদরাসা ব্যবস্থাপনা সিস্টেম",
};

export default function AppLayout({ children }) {
  return (
    <html lang="bn">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}