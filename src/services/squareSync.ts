import axios from 'axios';

export async function fetchCatalogItems() {
  try {
    const response = await axios.get('/.netlify/functions/get-catalog');
    return response.data.items;
  } catch (error) {
    console.error('Failed to fetch catalog:', error);
    return null;
  }
}

export async function syncWithSquare() {
  try {
    const items = await fetchCatalogItems();
    if (items) {
      // Update local state/storage with new catalog items
      localStorage.setItem('square_catalog', JSON.stringify(items));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Sync failed:', error);
    return false;
  }
}