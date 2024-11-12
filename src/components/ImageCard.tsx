import React from 'react';

interface ImageCardProps {
  title: string;
  imageUrl: string;
  link: string;
  description?: string;
}

export function ImageCard({ title, imageUrl, link, description }: ImageCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-gray-400 dark:text-gray-400 text-lg mb-1">{title}</h3>
        {description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
        )}
      </div>
    </a>
  );
}