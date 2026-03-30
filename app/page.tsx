"use client";

import { useState, useRef } from "react";

export default function Home() {
  const COMMON_MAT_NUM = 2264;
  const UNIQUE_MAT_NUM = 2413;

  const [totalMatNum, setTotalMatNum] = useState(0);
  const [yellowMatNum, setYellowMatNum] = useState(0);
  const [purpleMatNum, setPurpleMatNum] = useState(0);
  const [blueMatNum, setBlueMatNum] = useState(0);
  const [greenMatNum, setGreenMatNum] = useState(0);
  const [isCommonMat, setIsCommonMat] = useState(true);

  const [toast, setToast] = useState({
    message: "",
    type: "success" as "success" | "error",
    show: false,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function showToast(msg: string, type: "success" | "error") {
    // Clear previous timeout (fixes rapid click bug)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Show new toast
    setToast({
      message: msg,
      type,
      show: true,
    });

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  }

  function calculate() {
    if (
      yellowMatNum < 0 ||
      purpleMatNum < 0 ||
      blueMatNum < 0 ||
      greenMatNum < 0
    ) {
      showToast("Please enter non-negative numbers.", "error");
      return;
    }

    const total =
      yellowMatNum * 3 ** 3 +
      purpleMatNum * 3 ** 2 +
      blueMatNum * 3 ** 1 +
      greenMatNum * 3 ** 0;

    setTotalMatNum(total);
    compareMatNum(total);
    console.log(
      "current status of toast,",
      toast.message,
      toast.type,
      toast.show
    );
  }

  function compareMatNum(total: number) {
    if (isCommonMat) {
      if (total > COMMON_MAT_NUM) {
        showToast("You have more than enough common mats!", "success");
      } else if (total < COMMON_MAT_NUM) {
        showToast("You need more common mats!", "error");
      } else {
        showToast("You have exactly enough common mats!", "success");
      }
    } else {
      if (total > UNIQUE_MAT_NUM) {
        showToast("You have more than enough unique mats!", "success");
      } else if (total < UNIQUE_MAT_NUM) {
        showToast("You need more unique mats!", "error");
      } else {
        showToast("You have exactly enough unique mats!", "success");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4 relative">
      {/* Toast */}
      <div
        className={`absolute top-5 px-6 py-3 rounded-xl shadow-lg text-white font-medium transition-all duration-300
          ${toast.type === "success" ? "bg-green-500" : "bg-red-500"} ${
          toast.show
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        } `}
      >
        {toast.message}
      </div>

      <div className="bg-gray-600 shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-black">
          Wuwa Mat Calculator
        </h1>

        <div className="flex gap-3">
          <button
            className={`flex-1 py-2 rounded-xl font-medium ${
              isCommonMat ? "bg-blue-500 text-white" : "bg-gray-700"
            }`}
            onClick={() => setIsCommonMat(true)}
          >
            Common
          </button>

          <button
            className={`flex-1 py-2 rounded-xl font-medium ${
              !isCommonMat ? "bg-purple-500 text-white" : "bg-gray-700"
            }`}
            onClick={() => setIsCommonMat(false)}
          >
            Unique
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Yellow"
            className="p-2 border rounded-lg"
            onChange={(e) => setYellowMatNum(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Purple"
            className="p-2 border rounded-lg"
            onChange={(e) => setPurpleMatNum(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Blue"
            className="p-2 border rounded-lg"
            onChange={(e) => setBlueMatNum(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Green"
            className="p-2 border rounded-lg"
            onChange={(e) => setGreenMatNum(Number(e.target.value))}
          />
        </div>

        <button
          onClick={calculate}
          className="w-full py-2 rounded-xl bg-black text-white"
        >
          Calculate
        </button>

        <p>
          {isCommonMat
            ? `You need ${COMMON_MAT_NUM} common mats.`
            : `You need ${UNIQUE_MAT_NUM} unique mats.`}
        </p>

        <p className="text-center text-2xl text-white">
          Total Mats: {totalMatNum}
        </p>
      </div>
    </div>
  );
}
