import React from 'react';

interface LinkCardProps {
  title: string;
  description?: string;
  url?: string;
  bgColor: string;
  icon?: React.ReactNode;
}

export function LinkCard({ title, description, url, bgColor, icon }: LinkCardProps) {
  const Content = () => (
    <div className={`
      w-full ${bgColor} text-white rounded-xl p-4
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
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Content />
      </a>
    );
  }

  return <Content />;
}