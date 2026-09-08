"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function SafeImage({ src, alt, className = "", priority, sizes = "100vw" }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`safe-image ${className}`}>
      <div className="image-fallback" aria-hidden="true">
        <span>PSA</span>
        <small>Image coming soon</small>
      </div>
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          unoptimized
          sizes={sizes}
          onError={() => setFailed(true)}
          className="object-cover"
        />
      )}
    </div>
  );
}
