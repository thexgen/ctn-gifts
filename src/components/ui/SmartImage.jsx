import { useState } from "react";

export default function SmartImage({ src, alt = "", ratio = "aspect-square", className = "" }) {
    const [failed, setFailed] = useState(false);
    const showPlaceholder = !src || failed;

    return (
        <div className={`relative w-full overflow-hidden bg-stone-100 ${ratio} ${className}`}>
            {showPlaceholder ? (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-stone-400">
                    Image coming soon
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    onError={() => setFailed(true)}
                    className="h-full w-full object-cover"
                />
            )}
        </div>
    );
}