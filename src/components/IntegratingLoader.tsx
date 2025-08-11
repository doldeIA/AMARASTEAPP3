import React from "react";

export default function IntegratingLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg p-6 text-center">
        <div className="animate-spin mb-4" aria-hidden>
          <svg className="w-8 h-8" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="4" fill="none" strokeDasharray="60" />
          </svg>
        </div>
        <div className="text-sm font-semibold">Integrando — aguarde...</div>
      </div>
    </div>
  );
}
