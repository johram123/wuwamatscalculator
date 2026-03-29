"use client";

import { useState } from "react";

export default function Home() {
  const COMMON_MAT_NUM = 2264;
  const UNIQUE_MAT_NUM = 2413;
  const [totalMatNum, setTotalMatNum] = useState(0);
  const [yellowMatNum, setYellowMatNum] = useState(0);
  const [purpleMatNum, setPurpleMatNum] = useState(0);
  const [blueMatNum, setBlueMatNum] = useState(0);
  const [greenMatNum, setGreenMatNum] = useState(0);
  const [isCommonMat, setIsCommonMat] = useState(true);

  function calculate() {
    if (
      yellowMatNum < 0 ||
      purpleMatNum < 0 ||
      blueMatNum < 0 ||
      greenMatNum < 0
    ) {
      alert("Please enter non-negative numbers.");
      return;
    }

    const total =
      yellowMatNum * 3 ** 3 +
      purpleMatNum * 3 ** 2 +
      blueMatNum * 3 ** 1 +
      greenMatNum * 3 ** 0;

    setTotalMatNum(total);
    compareMatNum(total);
  }

  function compareMatNum(total: number) {
    if (isCommonMat) {
      if (total > COMMON_MAT_NUM) {
        alert("You have more than enough common mats!");
      } else if (total < COMMON_MAT_NUM) {
        alert("You need more common mats!");
      } else {
        alert("You have exactly enough common mats!");
      }
    } else {
      if (total > UNIQUE_MAT_NUM) {
        alert("You have more than enough unique mats!");
      } else if (total < UNIQUE_MAT_NUM) {
        alert("You need more unique mats!");
      } else {
        alert("You have exactly enough unique mats!");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
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

        <p className="text-center text-2xl text-white">
          Total Mats: {totalMatNum}
        </p>
      </div>
    </div>
  );
}
