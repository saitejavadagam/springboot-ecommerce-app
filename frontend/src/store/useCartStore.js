import { create } from 'zustand';
import { apiFetch } from '../api/client';


export const useCartStore = create((set, get) => ({
  cart: { items: [], totalAmount: 0 },
  loading: false,
  error: null,

  fetchCart: async () => {
    set({ loading: true, error: null });
    try {
      const data = await apiFetch(`api/carts/me`);
      set({ cart: data });
    } catch (err) {
      console.error("Failed to fetch cart", err);
      set({ error: "Failed to fetch cart" });
    } finally {
      set({ loading: false });
    }
  },

  addItem: async (productId,quantity=1) => {

    if (!productId) return;
    set({ loading: true, error: null });

    try {
      const existing = get().cart.items.find((i) => i.productId === productId);

      if (existing) {
        const data = await apiFetch(
          `api/carts/me/items/${existing.itemId}`,
          { method: "PATCH", body: JSON.stringify({ quantity: existing.quantity + quantity }) }
        );
        set({ cart: data });
      } else {
        const data = await apiFetch(`api/carts/me/items`, {
          method: "POST",
          body: JSON.stringify({ productId, quantity: 1 }),
        });
        set({ cart: data });
      }
    } catch (err) {
      console.error("Failed to add item", err);
      set({ error: "Failed to add item" });
    } finally {
      set({ loading: false });
    }
  },

  removeItem: async (productId) => {
    if (!productId) return;
    set({ loading: true, error: null });

    try {
      const existing = get().cart.items.find((i) => i.productId === productId);
      if (!existing) return;

      if (existing.quantity > 1) {
        const data = await apiFetch(
          `api/carts/me/items/${existing.itemId}`,
          { method: "PATCH", body: JSON.stringify({ quantity: existing.quantity - 1 }) }
        );
        set({ cart: data });
      } else {
        const data = await apiFetch(
          `api/carts/me/items/${existing.itemId}`,
          { method: "DELETE" }
        );
        set({ cart: data });
      }
    } catch (err) {
      console.error("Failed to remove item", err);
      set({ error: "Failed to remove item" });
    } finally {
      set({ loading: false });
    }
  },

  clearCart: async () => {
    set({ loading: true, error: null });
    try {
      await apiFetch(`api/carts/me/items`, { method: "DELETE" });
      set({ cart: { items: [], totalAmount: 0 } });
    } catch (err) {
      console.error("Failed to clear cart", err);
      set({ error: "Failed to clear cart" });
    } finally {
      set({ loading: false });
    }
  },

  getTotalItems: () => get().cart.items.reduce((acc, i) => acc + (i.quantity || 0), 0),
  getSubtotal: () => get().cart.items.reduce((acc, i) => acc + ((i.quantity || 1) * (i.price || 0)), 0),
}));
