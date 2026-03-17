import { apiFetch } from './api';

export const testimonialService = {
  async create(data: { content: string; author: string }) {
    return apiFetch('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getAll() {
    return apiFetch('/testimonials');
  },

  async approve(id: string) {
    return apiFetch(`/testimonials/${id}/approve`, {
      method: 'PATCH',
    });
  },

  async getPublic() {
    return apiFetch('/testimonials/public');
  },
};