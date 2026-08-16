import { describe, it, expect } from 'vitest';
import { GET as getProduct } from './product/route';
import { GET as getReviews } from './reviews/route';
import { POST as postPreorder } from './order/preorder/route';

describe('App Router API Route Handlers', () => {
  it('GET /api/product returns mockProductData', async () => {
    const res = await getProduct();
    const data = await res.json();
    expect(data.name).toBe('RoH Sound');
    expect(data.price).toBe(399);
  });

  it('GET /api/reviews returns mockReviewsData', async () => {
    const res = await getReviews();
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('POST /api/order/preorder creates reservation', async () => {
    const req = new Request('http://localhost:3000/api/order/preorder', {
      method: 'POST',
      body: JSON.stringify({ colorway: 'emerald', quantity: 2 }),
    });
    const res = await postPreorder(req);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.reservationCode).toMatch(/^ROH-\d+/);
  });
});
