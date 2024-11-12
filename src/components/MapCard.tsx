import React from 'react';
import { MapPin } from 'lucide-react';

interface MapCardProps {
  title: string;
  description: string;
  location: string;
  mapUrl: string;
  bgColor?: string;
  icon?: React.ReactNode;
}

export function MapCard({ title, location, mapUrl, description, bgColor, icon }: MapCardProps) {
  return (
    <a
      href={mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg overflow-hidden transform transition-all duration-300 shadow-lg"
    >
      <div className={`
        w-full ${bgColor} text-white rounded-t-xl p-4
        flex items-start gap-3 group hover:opacity-90 transition-opacity
      `}>
        {icon}
        <div>
          <div className="font-semibold text-lg">{title}</div>
          {description && (
            <div className="text-sm opacity-90 whitespace-pre-line">{description}</div>
          )}
        </div>
      </div>
      <div className="relative pb-[56.25%] bg-gray-100">
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(location)}`}
          className="absolute top-0 left-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map showing ${location}`}
        />
      </div>
    </a>
  );
}