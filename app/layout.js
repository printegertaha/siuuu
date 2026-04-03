import "./globals.css";
import ProgressBarProvider from "./_context/ProgressBarCTX";
import 'nprogress/nprogress.css';
import ProgressBar from "./_components/ProgressBar";
import { AuthProvider } from "./_components/AuthProvider";
import SavePrevPath from "./_components/SavePrevPath";
import { AlertMsgProvider } from "./_context/AlertMsgContext";
import AlertMsg from "./_components/AlertMsg";
import { Suspense } from "react";
import { PopUpProvider } from "./_context/PopUpContext";
import PopUp from "./_components/PopUp";

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
          <PopUpProvider>
            <AlertMsgProvider >
              <ProgressBarProvider>
                <AlertMsg />
                <ProgressBar />
                <PopUp />
                <Suspense callback={null}>
                  <SavePrevPath />
                </Suspense>
              {children}
              </ProgressBarProvider>
            </AlertMsgProvider>
          </PopUpProvider>
        </AuthProvider>

      </body>
    </html>
  );
}
