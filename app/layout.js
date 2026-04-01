import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProgressBarProvider from "./_context/ProgressBarCTX";
import 'nprogress/nprogress.css';
import ProgressBar from "./_components/ProgressBar";
import { AuthProvider } from "./_components/AuthProvider";
import SavePrevPath from "./_components/SavePrevPath";
import { AlertMsgProvider } from "./_context/AlertMsgContext";
import AlertMsg from "./_components/AlertMsg";

export const metadata = {
  title: "Siuuu",
  description: "greatest of all time",
    icons: {
    icon: "/don.jpeg",
  },
};



export default function RootLayout({ children }) {
  
    
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen`}
        
      >
        <AuthProvider>
          <AlertMsgProvider >
            <ProgressBarProvider>
              <AlertMsg />
              <ProgressBar />
              <SavePrevPath />
            {children}
            </ProgressBarProvider>
          </AlertMsgProvider>
        </AuthProvider>

      </body>
    </html>
  );
}
