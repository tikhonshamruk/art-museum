export interface PaginationArtInterface {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url: string;
}

export interface ArtworkInterface {
    id: number;
    title: string;
    main_reference_number: string;
    date_display: string;
    artist_display: string;
}

export interface ArtResponseInterface {
    pagination: PaginationArtInterface;
    data: ArtworkInterface[];
    info: {
        license_text: string;
        license_links: string[];
        version: string;
    };
    config: {
        iiif_url: string;
        website_url: string;
    };
}