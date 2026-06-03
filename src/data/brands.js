export const brands = [
  { id: 'yan-one', name: 'Yan&One', slug: 'yan-one', isOwn: true, logo: null, tagline: 'Our signature collection', color: '#b25745' },
  { id: 'clarins', name: 'Clarins', slug: 'clarins', isOwn: false, logo: null, tagline: 'French luxury skincare', color: '#e8d5c4' },
  { id: 'nars', name: 'NARS', slug: 'nars', isOwn: false, logo: null, tagline: 'Fearlessly bold makeup', color: '#1a1a1a' },
  { id: 'charlotte-tilbury', name: 'Charlotte Tilbury', slug: 'charlotte-tilbury', isOwn: false, logo: null, tagline: 'Hollywood beauty secrets', color: '#c89f8b' },
  { id: 'lancome', name: 'Lancôme', slug: 'lancome', isOwn: false, logo: null, tagline: 'The art of beauty', color: '#d4a0a0' },
  { id: 'la-roche-posay', name: 'La Roche-Posay', slug: 'la-roche-posay', isOwn: false, logo: null, tagline: 'Dermatologist recommended', color: '#5b8db8' },
  { id: 'cerave', name: 'CeraVe', slug: 'cerave', isOwn: false, logo: null, tagline: 'Developed with dermatologists', color: '#2b6cb0' },
  { id: 'kiehl', name: "Kiehl's", slug: 'kiehls', isOwn: false, logo: null, tagline: 'New York apothecary since 1851', color: '#2d4a22' },
  { id: 'urban-decay', name: 'Urban Decay', slug: 'urban-decay', isOwn: false, logo: null, tagline: 'Beauty with an edge', color: '#6b21a8' },
  { id: 'fenty', name: 'Fenty Beauty', slug: 'fenty-beauty', isOwn: false, logo: null, tagline: 'Beauty for all', color: '#c2410c' },
  { id: 'drunk-elephant', name: 'Drunk Elephant', slug: 'drunk-elephant', isOwn: false, logo: null, tagline: 'Clean-compatible skincare', color: '#f97316' },
  { id: 'the-ordinary', name: 'The Ordinary', slug: 'the-ordinary', isOwn: false, logo: null, tagline: 'Clinical formulations', color: '#374151' },
];

export const getBrandById = (id) => brands.find(b => b.id === id);
export const getBrandBySlug = (slug) => brands.find(b => b.slug === slug);
