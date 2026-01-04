import { artists } from "@/lib/data";
import ArtistDetailClient from "./ArtistDetailClient";

// Generate static params for all artists
export function generateStaticParams() {
    return artists.map((artist) => ({
        slug: artist.slug,
    }));
}

export default async function ArtistDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return <ArtistDetailClient slug={slug} />;
}
