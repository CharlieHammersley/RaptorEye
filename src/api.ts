const TBA_API_URL = 'https://www.thebluealliance.com/api/v3/';

export interface FiMEvent {
  key: string;
  name: string;
  short_name: string;
  _cachedAt?: number;
}

const retryFetch = async (request: Request, maxRetries = 3): Promise<Response> => {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(request);
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      return response;
    } catch (error) {
      lastError = error;
      console.warn(`Fetch attempt ${i + 1} failed, retrying...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * i)); // Exponential backoff
    }
  }
  throw lastError;
};

export const getEvents = async (): Promise<FiMEvent[]> => {
  try {
    // Check if cached data is valid (not older than 24 hours)
    const cacheTime = localStorage.getItem('tba_events_timestamp');
    if (cacheTime && Date.now() - parseInt(cacheTime) < 24 * 60 * 60 * 1000) {
      console.log('Using cached events');
      return JSON.parse(localStorage.getItem('tba_events') || '[]');
    }

    // Fetch from TBA API with retry logic
    const headers: Headers = new Headers();
    headers.set('X-TBA-Auth-Key', 'ghZtTC8mvcH3PMxxg9kiofSKNSKbqKg47IcZTS0f7luvzX3qUoAn1Y2JLrh4Rc5z');

    const request = new Request('https://www.thebluealliance.com/api/v3/district/2026fim/events', {
      method: 'GET',
      headers,
    });

    const response = await retryFetch(request);
    const events = (await response.json()) as FiMEvent[];

    // Cache the API response
    localStorage.setItem('tba_events', JSON.stringify(events));
    localStorage.setItem('tba_events_timestamp', Date.now().toString());

    return events;
  } catch (error) {
    console.error('Network request failed, using offline data');

    // Fallback to cached data if available
    const cachedData = localStorage.getItem('tba_events');
    if (cachedData) {
      console.log('Using stale cached events');
      return JSON.parse(cachedData);
    }

    throw new Error('No internet and no cached events available');
  }
};
