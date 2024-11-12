import React from 'react';

interface SocialLinkProps {
  icon: React.ReactNode;
  url: string;
  theme: string;
}

export function SocialLinks({ links, theme }: { links: SocialLinkProps[], theme: string }) {
  return (
    <div className="flex justify-center space-x-4 mb-8">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 rounded-full ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} transition-colors duration-300`}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}