type Pickup = {
  id: number;
  name: string;
  email: string;
  address: string;
  wasteDescription: string;
  status: string;
  pickupDate: string;
  estimatedCompletion: string;
  recycledProduct: string | null;
};

class Store {
  private pickups: Pickup[] = [];
  private nextId = 1;

  addPickup(pickup: Omit<Pickup, 'id' | 'status' | 'pickupDate' | 'estimatedCompletion' | 'recycledProduct'>): number {
    const newPickup: Pickup = {
      ...pickup,
      id: this.nextId++,
      status: 'Scheduled',
      pickupDate: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      recycledProduct: null,
    };
    this.pickups.push(newPickup);
    return newPickup.id;
  }

  getPickupByEmail(email: string): Pickup | undefined {
    return this.pickups.find(pickup => pickup.email === email);
  }

  updatePickupStatus(email: string, status: string, recycledProduct?: string): void {
    const pickup = this.pickups.find(p => p.email === email);
    if (pickup) {
      pickup.status = status;
      if (recycledProduct) {
        pickup.recycledProduct = recycledProduct;
      }
    }
  }
}

export const store = new Store();

