export interface PlayerProfile {
  id: string;
  /** Image in /public/profiles. Only images supplied by the site owner are used. */
  src: string;
  width: number;
  height: number;
  /** Describes the card for screen readers (player name and guild as shown on the card). */
  alt: string;
}

/**
 * Profile cards for the "Live Player Profiles" carousel.
 * No UIDs or levels are shown outside the image itself. Add a new card by dropping a picture into
 * /public/profiles and adding an entry here.
 */
export const PROFILES: PlayerProfile[] = [
  { id: "feelings", src: "/profiles/feelings.webp", width: 536, height: 132, alt: "Free Fire profile card: feelings, REVOLUT!ON" },
  { id: "revxghost", src: "/profiles/revxghost.webp", width: 536, height: 131, alt: "Free Fire profile card: REVxGHOST-X7, REVOLUT!ON" },
  { id: "nyt-leader", src: "/profiles/nyt-leader.webp", width: 537, height: 132, alt: "Free Fire profile card: NyT Leader, NotYourType" },
  { id: "revxradar", src: "/profiles/revxradar.webp", width: 534, height: 125, alt: "Free Fire profile card: REVxRADAR-X, REVOLUT!ON" },
];
