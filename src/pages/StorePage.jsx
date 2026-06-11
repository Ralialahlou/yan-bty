import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import styles from './StorePage.module.css';

const stores = [
  {
    id: 1,
    name: 'Yan BTY Morocco Mall',
    city: 'Casablanca',
    address: 'Morocco Mall, Bd de la Corniche, Casablanca',
    phone: '+212 5 22 00 00 00',
    hours: 'Mon–Sat 10:00–22:00 · Sun 11:00–21:00',
    services: ['Beauty Consultations', 'Makeovers', 'Skincare Consultations'],
    isMain: true,
  },
  {
    id: 2,
    name: 'Yan BTY Marjane Mall',
    city: 'Rabat',
    address: 'Marjane Mall, Avenue Annakhil, Rabat',
    phone: '+212 5 37 00 00 00',
    hours: 'Mon–Sat 10:00–21:00 · Sun 11:00–20:00',
    services: ['Beauty Consultations', 'Skincare Consultations'],
    isMain: false,
  },
  {
    id: 3,
    name: 'Yan BTY Carre Eden',
    city: 'Marrakech',
    address: "Carré Eden, Avenue Mohammed V, Marrakech",
    phone: '+212 5 24 00 00 00',
    hours: 'Mon–Sat 10:00–21:30 · Sun 11:00–20:30',
    services: ['Beauty Consultations', 'Makeovers'],
    isMain: false,
  },
];

export default function StorePage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className="container">
          <p className={styles.heroLabel}>Visit Us</p>
          <h1 className={styles.heroTitle}>Our Stores</h1>
          <p className={styles.heroSub}>Experience Yan BTY in person. Our beauty experts are ready to help you discover your perfect routine.</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.storeGrid}>
          {stores.map(store => (
            <div key={store.id} className={[styles.storeCard, store.isMain ? styles.storeCardMain : ''].join(' ')}>
              {store.isMain && <div className={styles.mainBadge}>Flagship Store</div>}
              <h2 className={styles.storeName}>{store.name}</h2>
              <p className={styles.storeCity}>{store.city}</p>

              <div className={styles.storeDetails}>
                <div className={styles.storeDetail}>
                  <MapPin size={16} />
                  <span>{store.address}</span>
                </div>
                <div className={styles.storeDetail}>
                  <Phone size={16} />
                  <span>{store.phone}</span>
                </div>
                <div className={styles.storeDetail}>
                  <Clock size={16} />
                  <span>{store.hours}</span>
                </div>
              </div>

              <div className={styles.services}>
                {store.services.map(s => (
                  <span key={s} className={styles.service}>{s}</span>
                ))}
              </div>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.directionsBtn}
              >
                <Navigation size={14} /> Get Directions
              </a>
            </div>
          ))}
        </div>

        <div className={styles.clickCollect}>
          <h2 className={styles.clickCollectTitle}>Click & Collect Available</h2>
          <p className={styles.clickCollectDesc}>
            Order online and collect from your nearest Yan BTY store. Ready for collection within 2 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
