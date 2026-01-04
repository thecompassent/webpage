import { getCompanyEvents } from "@/lib/utils/event-helpers";
import EventDetailClient from "./EventDetailClient";

// Generate static params for all events with galleries
export function generateStaticParams() {
    const companyEvents = getCompanyEvents();
    return companyEvents
        .filter(event => event.slug && event.images && event.images.length > 0)
        .map((event) => ({
            slug: event.slug!,
        }));
}

export default async function EventDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return <EventDetailClient slug={slug} />;
}
