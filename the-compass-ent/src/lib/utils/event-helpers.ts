import type { Event, CompanyEvent } from '../data';
import { events, eventGalleryImages } from '../data';

// Helper Functions for Event Categorization

/**
 * Categorizes events into past and upcoming based on current date
 * @param events - Array of events to categorize
 * @returns Object containing past and upcoming events
 */
export function categorizeEventsByDate(events: Event[]) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time, compare dates only

    const upcoming = events.filter(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
    });

    const past = events.filter(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate < today;
    });

    return { upcoming, past };
}

/**
 * Get upcoming events sorted by date (earliest first)
 * @param events - Array of events
 * @param limit - Maximum number of events to return (optional)
 * @returns Array of upcoming events
 */
export function getUpcomingEvents(events: Event[], limit?: number) {
    const { upcoming } = categorizeEventsByDate(events);
    const sorted = upcoming.sort((a, b) => a.date.localeCompare(b.date));
    return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Get past events sorted by date (most recent first)
 * @param events - Array of events
 * @param limit - Maximum number of events to return (optional)
 * @returns Array of past events
 */
export function getPastEvents(events: Event[], limit?: number) {
    const { past } = categorizeEventsByDate(events);
    const sorted = past.sort((a, b) => b.date.localeCompare(a.date));
    return limit ? sorted.slice(0, limit) : sorted;
}

// CompanyEvent Conversion Functions

/**
 * Convert Event to CompanyEvent format
 * @param event - Event to convert
 * @returns CompanyEvent object
 */
export function eventToCompanyEvent(event: Event): CompanyEvent {
    // Format date: "2025-11-19" → "2025.11.19 - Taiwan, Taichung"
    const formattedDate = `${event.date.replace(/-/g, '.')} - ${event.city}`;

    return {
        id: event.id,
        title: `${event.artist || 'Event'} @ ${event.venue}`,
        date: formattedDate,
        type: 'image',
        src: event.poster || '',
        slug: event.slug,
        images: event.gallery || eventGalleryImages[event.id]
    };
}

/**
 * Get company events (events with posters for display on company page)
 * Only returns events that have poster images
 * @returns Array of CompanyEvent objects
 */
export function getCompanyEvents(): CompanyEvent[] {
    return events
        .filter(e => e.poster) // Only events with posters
        .map(eventToCompanyEvent);
}

/**
 * Get featured company events (events with gallery images)
 * These events have additional gallery images for detail pages
 * @returns Array of CompanyEvent objects with galleries
 */
export function getFeaturedCompanyEvents(): CompanyEvent[] {
    const featuredIds = Object.keys(eventGalleryImages);
    return events
        .filter(e => featuredIds.includes(e.id))
        .map(eventToCompanyEvent);
}

