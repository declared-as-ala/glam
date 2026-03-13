"use client";

import { Clock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function getRemaining(targetDate: string | Date) {
  const end = new Date(targetDate).getTime();
  const diff = Math.max(end - Date.now(), 0);
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { hours, minutes, seconds };
}

export function FlashSaleCountdown({ endAt }: { endAt: string | Date }) {
  const [remaining, setRemaining] = useState(() => getRemaining(endAt));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(getRemaining(endAt));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [endAt]);

  const blocks = useMemo(
    () => [
      { label: "heures", value: remaining.hours },
      { label: "min", value: remaining.minutes },
      { label: "sec", value: remaining.seconds },
    ],
    [remaining],
  );

  return (
    <div className="flex items-center gap-4">
      <Clock className="h-6 w-6 text-[#FF6B9D]" />
      <div className="flex items-center gap-2">
        {blocks.map((block, index) => (
          <div key={block.label} className="flex items-center gap-2">
            <div className="rounded-xl bg-white px-4 py-2 text-center shadow-md">
              <div className="text-2xl font-bold text-gray-900">
                {String(block.value).padStart(2, "0")}
              </div>
              <div className="text-xs text-gray-500">{block.label}</div>
            </div>
            {index < blocks.length - 1 ? <div className="text-2xl font-bold">:</div> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
