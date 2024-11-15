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
      <div className="relative bg-gray-100">
      <iframe className='border-none w-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2966.723970486065!2d-71.5372634!3d-41.9632636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x961bbfc57ea03c47%3A0x5ab75d7df263bc14!2sAv.%20Sarmiento%202796%2C%20R8430%20El%20Bols%C3%B3n%2C%20R%C3%ADo%20Negro!5e0!3m2!1sen!2sar!4v1731632174428!5m2!1sen!2sar" height="450" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        {/* <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(location)}`}
          className="absolute top-0 left-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map showing ${location}`}
        /> */}
      </div>
    </a>
  );
}