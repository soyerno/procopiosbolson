import React from 'react';
import { LinkCard } from './components/LinkCard';
import { OrderFlow } from './components/OrderFlow';
import { SocialLinks } from './components/SocialLinks';
import { Github, Instagram, Phone, MapPin, IceCream, Clock, Facebook } from 'lucide-react';
import storeConfig from './config/store.json';
import { MapCard } from './components/MapCard';

function App() {
  const { store } = storeConfig;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <IceCream className="w-16 h-16 text-pink-600" />
            <div>
              <h1 className="text-4xl font-bold text-pink-800 font-serif">{store.name}</h1>
              <p className="text-lg text-purple-700 mt-2 italic">{store.slogan}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-col-1 grap-4 space-y-4 mb-8">
          <OrderFlow />
          
          <LinkCard
            title="Horario de Atención"
            description={`Lun-Vie: ${store.schedule.weekdays}\nFines de semana: ${store.schedule.weekends}`}
            icon={<Clock className="w-5 h-5" />}
            bgColor="bg-purple-500"
          />

          {/* <LinkCard
            title="Ubicación"
            description={store.address}
            url={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
            icon={<MapPin className="w-5 h-5" />}
            bgColor="bg-pink-500"
          /> */}

          <LinkCard
            title="Teléfono"
            description={store.phone}
            url={`https://wa.me/${store.social.whatsapp.replace(/\D/g, '')}`}
            icon={<Phone className="w-5 h-5" />}
            bgColor="bg-purple-500"
          />

          <MapCard
            title="Ubicación"
            description={store.address}
            mapUrl={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
            icon={<MapPin className="w-5 h-5" />}
            bgColor="bg-pink-500"
            location='R8430 El Bolsón, Río Negro' 
            // mapUrl='https://www.google.com/maps/place/Procopios+Helado/@-41.9699901,-71.5372181,15z/data=!4m2!3m1!1s0x0:0xcf1b1ab2b868108b?sa=X&ved=1t:2428&ictx=111'
          />
          
        </div>

        
        <SocialLinks
          links={[
            {
              icon: <Instagram className="w-5 h-5" />,
              url: `https://instagram.com/${store.social.instagram}`,
              theme: 'light'
            },
            {
              icon: <Facebook className="w-5 h-5" />,
              url: store.social.facebook,
              theme: 'light'
            },
            // {
            //   icon: <Phone className="w-5 h-5" />,
            //   url: `https://wa.me/${store.social.whatsapp.replace(/\D/g, '')}`,
            //   theme: 'light'
            // }
          ]}
          theme="light"
        />

       
        <footer className="text-center text-sm text-gray-500">
          <p>© 2024 {store.name}. Todos los derechos reservados.</p>
          <p>Diseño: <a className='text-blue-500 underline' target='_blank' href='https://soyerno.com.ar'>soyerno.com.ar</a></p>
        </footer>
      </div>
    </div>
  );
}

export default App;