"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface PlanZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const attractions = [/* … même tableau qu’avant … */];

export default function PlanZoomModal({ isOpen, onClose }: PlanZoomModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 800);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen || !isMobile) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Ce bloc empêche la propagation pour ne pas fermer la modale quand on clique dessus */}
      <div
        className="relative w-[1400px] max-w-full aspect-[16/9] mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture dans le coin supérieur droit de l'image */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 z-50 text-white hover:text-red-500 transition"
          aria-label="Fermer"
        >
          <X size={28} />
        </button>

        <Image
          src="/images/zombieland-map-isometric.webp"
          alt="Plan du parc Zombieland"
          fill
          className="object-contain"
          priority
        />

        {attractions.map((attr) => (
          <Link
            key={attr.slug}
            href={`/attractions/${attr.slug}`}
            className="absolute z-10 text-[10px] sm:text-sm font-subtitle font-semibold text-primary-light whitespace-nowrap transition hover:underline"
            style={{
              top: attr.top,
              left: attr.left,
              transform: "translate(-50%, -50%)",
            }}
            onClick={onClose}
          >
            {attr.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
