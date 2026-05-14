/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  name: string;
  rating: number;
  priceRange: string;
  hours: string;
  image: string;
  isVeg?: boolean;
  isVegNonVeg?: boolean;
  category: 'food' | 'laundry' | 'servant';
}

export interface LifestyleItem {
  id: string;
  name: string;
  rating: number;
  priceRange: string;
  hours: string;
  image: string;
  distance: string;
  tags: string[];
  category: 'markets' | 'fun' | 'attractions';
}

export const servicesData: Service[] = [
  {
    id: '1',
    name: 'Sagar Ratna',
    rating: 4.5,
    priceRange: '₹150–300 per meal',
    hours: '8:00 AM – 11:00 PM',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200&h=150',
    isVeg: true,
    category: 'food'
  },
  {
    id: '2',
    name: 'Khana Khazana',
    rating: 4.2,
    priceRange: '₹200–400 per meal',
    hours: '7:00 AM – 12:00 AM',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=200&h=150',
    isVegNonVeg: true,
    category: 'food'
  },
  {
    id: '3',
    name: 'Café Coffee Corner',
    rating: 4.3,
    priceRange: '₹100–250 per item',
    hours: '6:30 AM – 10:30 PM',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=200&h=150',
    isVeg: true,
    category: 'food'
  },
  {
    id: '4',
    name: 'Quick Clean Laundry',
    rating: 4.7,
    priceRange: '₹50–150 per kg',
    hours: '9:00 AM – 8:00 PM',
    image: 'https://plus.unsplash.com/premium_photo-1664372899525-d99a419fd21a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGF1bmRyeXxlbnwwfHwwfHx8MA%3D%3D',
    category: 'laundry'
  },
  {
    id: '5',
    name: 'Royal Dry Cleaners',
    rating: 4.4,
    priceRange: '₹200–800 per suit',
    hours: '10:00 AM – 9:00 PM',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhdW5kcnl8ZW58MHx8MHx8fDA%3D',
    category: 'laundry'
  },
  {
    id: '6',
    name: 'Trusty Maid Services',
    rating: 4.8,
    priceRange: '₹3k–8k per month',
    hours: '6:00 AM – 6:00 PM',
    image: 'https://media.istockphoto.com/id/1306806470/photo/person-cleaning-the-wooden-floor.webp?a=1&b=1&s=612x612&w=0&k=20&c=6zmbkhkP7I4AknLDEy6nJwsSRCxmPco-YfvOScOkyfs=',
    category: 'servant'
  },
  {
    id: '7',
    name: 'Pro Cook Personnel',
    rating: 4.6,
    priceRange: '₹5k–12k per month',
    hours: '7:00 AM – 9:00 PM',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=200&h=150',
    category: 'servant'
  }
];

export const lifestyleData: LifestyleItem[] = [
  {
    id: 'm1',
    name: 'Fresh Valley Market',
    rating: 4.4,
    priceRange: '₹50–200 per kg',
    hours: '6:00 AM – 10:00 PM',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400&h=300',
    distance: '2.3 km',
    tags: ['Fruits & Vegetables'],
    category: 'markets'
  },
  {
    id: 'm2',
    name: 'City Central Bazaar',
    rating: 4.2,
    priceRange: '₹30–150 per kg',
    hours: '7:00 AM – 9:00 PM',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=400&h=300',
    distance: '5.7 km',
    tags: ['Daily Needs', 'Spices'],
    category: 'markets'
  },
  {
    id: 'f1',
    name: 'Sky High Adventure Park',
    rating: 4.8,
    priceRange: '₹500–1200 per person',
    hours: '10:00 AM – 8:00 PM',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=400&h=300',
    distance: '8.1 km',
    tags: ['Rides', 'Food'],
    category: 'fun'
  },
  {
    id: 'f2',
    name: 'The Gaming Zone',
    rating: 4.5,
    priceRange: '₹200–500 per hour',
    hours: '11:00 AM – 11:00 PM',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=400&h=300',
    distance: '1.2 km',
    tags: ['VR', 'Arcade'],
    category: 'fun'
  },
  {
    id: 'a1',
    name: 'Garden Memorial',
    rating: 4.7,
    priceRange: 'Free Entry',
    hours: '6:00 AM – 7:00 PM',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=400&h=300',
    distance: '4.5 km',
    tags: ['Historical', 'Park'],
    category: 'attractions'
  },
  {
    id: 'a2',
    name: 'Sunset Point Lake',
    rating: 4.6,
    priceRange: '₹20 Entry',
    hours: '24 Hours',
    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=400&h=300',
    distance: '9.2 km',
    tags: ['Scenic', 'Boating'],
    category: 'attractions'
  }
];
