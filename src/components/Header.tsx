import React from 'react';
import { IceCream, Clock, Phone, MapPin, Instagram, MessageCircle } from 'lucide-react';
import storeConfig from '../config/store.json';

export function Header() {
  const { store } = storeConfig;

  return (
    <header className="bg-gradient-to-r from-pink-100 to-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-3 mb-4">
              <IceCream className="w-16 h-16 text-pink-600" />
              <div className="text-center">
                <h1 className="text-5xl font-bold text-pink-800 font-serif">{store.name}</h1>
                <p className="text-lg text-purple-700 mt-2 italic">{store.slogan}</p>
              </div>
            </div>
            
            <div className="flex gap-4 mt-4">
              <a
                href={`https://instagram.com/${store.social.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href={`https://wa.me/${store.social.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700 transition-colors"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2 p-4 bg-white/50 rounded-lg">
              <Clock className="w-6 h-6 text-pink-600" />
              <div>
                <div className="font-medium text-gray-800">Horario</div>
                <div className="text-gray-600">Lun-Vie: {store.schedule.weekdays}</div>
                <div className="text-gray-600">Fines de semana: {store.schedule.weekends}</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-2 p-4 bg-white/50 rounded-lg">
              <Phone className="w-6 h-6 text-pink-600" />
              <div>
                <div className="font-medium text-gray-800">Teléfono</div>
                <div className="text-gray-600">{store.phone}</div>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-2 p-4 bg-white/50 rounded-lg">
              <MapPin className="w-6 h-6 text-pink-600" />
              <div>
                <div className="font-medium text-gray-800">Dirección</div>
                <div className="text-gray-600">{store.address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}