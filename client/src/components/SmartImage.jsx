import { useState } from "react";

/**
 * Renders an image from /public/assets. If the file isn't there yet,
 * it falls back to an elegant gradient placeholder labelled with the
 * intended subject — so the layout always looks intentional.
 */
export default function SmartImage({ src, alt, label, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className={`smart-image placeholder ${className}`} role="img" aria-label={alt}>
        <span>{label || alt || "Add image"}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`smart-image ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
