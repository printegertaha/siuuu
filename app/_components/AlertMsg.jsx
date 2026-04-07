"use client";

import { useEffect } from "react";
import { useAlertMsg } from "../_context/AlertMsgContext";
import { Verified, XCircle } from "lucide-react";

export default function AlertMsg() {
  const { alert, setAlert } = useAlertMsg();

  useEffect(() => {
    let hideAlertTOut;
    let emptyAlertTout;
    if (alert?.isVisible) {
      hideAlertTOut = setTimeout(
        () => {
          setAlert({ ...alert, isVisible: false });
        },
        alert?.isSuccess ? 1000 : 2000,
      );
      emptyAlertTout = setTimeout(
        () => {
          setAlert({ ...alert, message: "", isSuccess: "" });
        },
        alert?.isSuccess ? 1500 : 2500,
      );
    }

    return () => {
      clearTimeout(hideAlertTOut);
      clearTimeout(emptyAlertTout);
    };
  }, [alert?.isVisible]);

  return (
    <>
      {alert.isVisible ? (
        <div
          className={`fixed  top-5  z-1000 left-1/2 -translate-x-1/2 flex items-center justify-center w-max gap-1 sm:text-xl px-3 py-2 rounded-3xl sm:font-semibold border  bg-gray-200/20 backdrop-blur-[59px]  ${alert.isSuccess ? "text-green-500" : "text-red-500"}`}
        >
          {alert.isSuccess ? (
            <Verified />
          ) : (
            <XCircle className="text-red-500 w-4 h-4 sm:w-6 sm:h-6 rounded-[50%]" />
          )}
          <p className="capitalize tracking-wider">{alert.message}</p>
        </div>
      ) : null}
    </>
  );
}
