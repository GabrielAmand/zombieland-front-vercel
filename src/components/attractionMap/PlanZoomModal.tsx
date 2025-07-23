"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

interface PlanZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const attractions = [
  { name: 'Le Dédale Maudit', slug: 'le-dédale-maudit', top: '46.5%', left: '30.2%' },
  { name: 'Speed Apocalypse', slug: 'speed-apocalypse', top: '38.9%', left: '39.3%' },
  { name: 'Le Manoir des Ames Perdues', slug: 'le-manoir-des-âmes-perdues', top: '4.3%', left: '61.4%' },
  { name: 'L’Enfer en Soins Intensifs', slug: 'lenfer-en-soins-intensifs', top: '35.3%', left: '58.9%' },
  { name: 'Le Virus Express', slug: 'le-virus-express', top: '16.0%', left: '46.3%' },
  { name: 'Vertige Mortel', slug: 'vertige-mortel', top: '5.7%', left: '32.8%' },
  { name: 'Chasse Mortelle', slug: 'chasse-mortelle', top: '11.1%', left: '72.4%' },
  { name: 'Prison Hors du Temps', slug: 'prison-hors-du-temps', top: '57.7%', left: '69.7%' },
  { name: 'Clinique du Chaos', slug: 'clinique-du-chaos', top: '64.5%', left: '40.0%' },
  { name: 'Les Ombres du Cimetière', slug: 'les-ombres-du-cimetière', top: '82.4%', left: '55.0%' },
  { name: 'Les Bois Maudits', slug: 'les-bois-maudits', top: '28.2%', left: '71.1%' },
  { name: 'Route Z', slug: 'route-z', top: '53.1%', left: '53.4%' },
  { name: 'Tunnel Sans Retour', slug: 'tunnel-sans-retour', top: '39.5%', left: '72.4%' },
];

export default function PlanZoomModal({ isOpen, onClose }: PlanZoomModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center overflow-auto px-[5vw] py-4"
      onClick={onClose}
    >
      <div
        className="relative"
        style={{
          width: "1600px", // 💥 Zoom fort (x2 environ)
          maxWidth: "100%",
          aspectRatio: "16/9",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Croix de fermeture */}
        <button
          className="absolute top-2 right-2 z-50 text-white hover:text-red-500 transition"
          onClick={onClose}
        >
          <X size={28} />
        </button>
  
        {/* Image + liens */}
        <div className="relative w-full h-full">
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
              className="absolute z-10 text-[12px] sm:text-sm font-subtitle font-semibold text-primary-light whitespace-nowrap transition hover:underline"
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
    </div>
  );
  
}
