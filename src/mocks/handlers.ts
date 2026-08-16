import { http, HttpResponse } from 'msw';

export interface ProductDetails {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  price: number;
  originalPrice: number;
  currency: string;
  inStock: boolean;
  inventoryCount: number;
  rating: number;
  reviewCount: number;
  features: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  comment: string;
  avatarBg: string;
}

export const mockProductData: ProductDetails = {
  id: 'roh-sound-01',
  name: 'RoH Sound',
  tagline: 'Pure Acoustic Precision. Zero Distortion.',
  badge: 'Flagship Edition',
  price: 399,
  originalPrice: 499,
  currency: 'USD',
  inStock: true,
  inventoryCount: 142,
  rating: 4.9,
  reviewCount: 1240,
  features: [
    '45mm Custom Graphene Driver Matrix',
    'Ultra Hybrid Active Noise Cancellation (48dB)',
    'Dynamic 360° Spatial Audio Tracking',
    '65-Hour Extended High-Fidelity Battery',
    'Lossless 24-bit/192kHz Bluetooth 5.4 & LDAC',
  ],
};

export const mockReviewsData: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Elena Rostova',
    role: 'Grammy-Nominated Mastering Engineer',
    rating: 5,
    date: '2 days ago',
    verified: true,
    title: 'The cleanest soundstage I have ever heard in wireless audio',
    comment:
      'RoH Sound reproduces sub-bass and high-frequency harmonics with clinical precision. The noise floor is practically non-existent even with ANC pushed to max.',
    avatarBg: 'bg-amber-500',
  },
  {
    id: 'rev-2',
    author: 'Marcus Vance',
    role: 'Acoustic Architect & Composer',
    rating: 5,
    date: '1 week ago',
    verified: true,
    title: 'Zero listening fatigue after 12-hour studio sessions',
    comment:
      'The memory foam pressure distribution and acoustic seal are phenomenal. Spatial Audio tracking stays rock-solid without phase artifacts.',
    avatarBg: 'bg-sky-500',
  },
  {
    id: 'rev-3',
    author: 'Dr. Aris Thorne',
    role: 'Audio DSP Researcher',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    title: 'Graphene driver stiffness delivers instant transient attack',
    comment:
      'Transients in acoustic drums and orchestral strings resolve with zero overhang. At $399, it outclasses models costing twice as much.',
    avatarBg: 'bg-emerald-500',
  },
];

export const handlers = [
  http.get('/api/product', () => {
    return HttpResponse.json(mockProductData);
  }),

  http.get('/api/reviews', () => {
    return HttpResponse.json(mockReviewsData);
  }),

  http.post('/api/order/preorder', async ({ request }) => {
    const body = (await request.json()) as { colorway?: string; quantity?: number; engraving?: string };
    const reservationCode = `ROH-${Math.floor(100000 + Math.random() * 900000)}`;
    return HttpResponse.json({
      success: true,
      reservationCode,
      message: 'Your RoH Sound flagship pre-order is confirmed.',
      details: {
        colorway: body.colorway || 'midnight',
        quantity: body.quantity || 1,
        engraving: body.engraving || 'Standard Edition',
        estimatedDelivery: 'Ships in 2-3 business days',
      },
    });
  }),
];
