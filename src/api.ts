const TBA_API_URL = 'https://www.thebluealliance.com/api/v3/';

export interface FiMEvent {
    key: string;
    name: string;
    short_name: string;
}

export const getEvents = async (): Promise<FiMEvent[]> => {
  try {
    const headers: Headers = new Headers();
    headers.set('X-TBA-Auth-Key', 'ghZtTC8mvcH3PMxxg9kiofSKNSKbqKg47IcZTS0f7luvzX3qUoAn1Y2JLrh4Rc5z');

    const request = new Request('https://www.thebluealliance.com/api/v3/district/2026fim/events', {
      method: 'GET',
      headers,
    });

    const response = await fetch(request);
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    return (await response.json()) as FiMEvent[];
  } catch (error) {
    console.error('Error fetching event data:', error);
    throw new Error('Failed to fetch events');
  }
};