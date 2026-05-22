/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export interface BrandNameProps {
  className?: string; // Additional classes for the text block
  withLogo?: boolean;  // Render the favicon.ico logo as an icon
  logoSizeClassName?: string; // Class for logo dimensions
  orangeColorClass?: string;
  charcoalColorClass?: string;
}

export default function BrandName({
  className = "",
  withLogo = true,
  logoSizeClassName = "h-5 w-5",
  orangeColorClass = "text-orange-500",
  charcoalColorClass = "text-[#1a1c1e]"
}: BrandNameProps) {
  return (
    <span className={`inline-flex items-center gap-2 select-none tracking-tight leading-none ${className}`}>
      {withLogo && (
        <img
          src="https://sansmercantile.com/favicon.ico"
          referrerPolicy="no-referrer"
          className={`${logoSizeClassName} object-contain shrink-0`}
          alt=""
          onError={(e) => {
            // Fallback to high-end CSS node graphic if image is blocked
            (e.currentTarget as HTMLElement).style.display = "none";
          }}
        />
      )}
      <span className="flex items-center">
        <span className={`${orangeColorClass} font-semibold lowercase tracking-tight`}>
          sans
        </span>
        <span 
          className={`${charcoalColorClass} font-black uppercase tracking-tight`}
          style={{ 
            textShadow: "0 0 12px rgba(26, 28, 30, 0.12)",
          }}
        >
          Mercantile
        </span>
      </span>
    </span>
  );
}
