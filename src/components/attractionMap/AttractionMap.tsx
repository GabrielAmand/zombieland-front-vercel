"use client";

import {
  MapContainer,
  ImageOverlay,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import Link from "next/link";
import {
  Flame,
  Ghost,
  HeartPulse,
  AlertTriangle,
  Activity,
  Target,
  Lock,
  Syringe,
  Skull,
  TreeDeciduous,
  Car,
  ArrowRightCircle,
  Eye,
} from "lucide-react";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";

// Type avec icône associée
interface Attraction {
  name: string;
  slug: string;
  position: [number, number]; // [y, x]
  icon: JSX.Element;
}

const imageSize = 1024;
const imageBounds: [[number, number], [number, number]] = [
  [0, 0],
  [imageSize, imageSize],
];
const center: [number, number] = [imageSize / 2, imageSize / 2];

// Données attractions avec icônes Lucide
const attractions: Attraction[] = [
  { name: "Le Dédale Maudit", slug: "le-dédale-maudit", position: [451, 584], icon: <Eye size={20} /> },
  { name: "Speed Apocalypse", slug: "speed-apocalypse", position: [600, 316], icon: <Flame size={20} /> },
  { name: "Le Manoir des Ames Perdues", slug: "le-manoir-des-ames-perdues", position: [955, 695], icon: <Ghost size={20} /> },
  { name: "L’Enfer en Soins Intensifs", slug: "lenfer-en-soins-intensifs", position: [548, 124], icon: <HeartPulse size={20} /> },
  { name: "Le Virus Express", slug: "le-virus-express", position: [777, 443], icon: <AlertTriangle size={20} /> },
  { name: "Vertige Mortel", slug: "vertige-mortel", position: [957, 204], icon: <Activity size={20} /> },
  { name: "Chasse Mortelle", slug: "chasse-mortelle", position: [666, 712], icon: <Target size={20} /> },
  { name: "Prison Hors du Temps", slug: "prison-hors-du-temps", position: [940, 498], icon: <Lock size={20} /> },
  { name: "Clinique du Chaos", slug: "clinique-du-chaos", position: [334, 360], icon: <Syringe size={20} /> },
  { name: "Les Ombres du Cimetière", slug: "les-ombres-du-cimetière", position: [99, 589], icon: <Skull size={20} /> },
  { name: "Les Bois Maudits", slug: "les-bois-maudits", position: [727, 903], icon: <TreeDeciduous size={20} /> },
  { name: "Route Z", slug: "route-z", position: [184, 843], icon: <Car size={20} /> },
  { name: "Tunnel Sans Retour", slug: "tunnel-sans-retour", position: [617, 907], icon: <ArrowRightCircle size={20} /> },
];

// Fonction pour transformer l'icône JSX en icône Leaflet
function createDivIcon(icon: JSX.Element): L.DivIcon {
  const html = renderToStaticMarkup(icon);
  return L.divIcon({
    html,
    className: "", // remove default leaflet class
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

export default function InteractiveMap() {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/marker-icon-2x.png",
      iconUrl: "/leaflet/marker-icon.png",
      shadowUrl: "/leaflet/marker-shadow.png",
    });
  }, []);

  return (
    <div className="w-full max-w-[1024px] mx-auto aspect-square overflow-hidden border border-white">
      <MapContainer
        crs={L.CRS.Simple}
        center={center}
        zoom={0}
        minZoom={0}
        maxZoom={4}
        maxBounds={imageBounds}
        maxBoundsViscosity={1.0}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={true}
        attributionControl={false}
      >
        <ImageOverlay
          url="/images/zombieland-map-isometric.webp"
          bounds={imageBounds}
        />

        {attractions.map((attr) => (
          <Marker
            key={attr.slug}
            position={attr.position}
            icon={createDivIcon(attr.icon)}
          >
            <Popup>
              <strong>{attr.name}</strong>
              <br />
              <Link href={`/attractions/${attr.slug}`} className="text-blue-600 underline">
                Voir l’attraction
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
