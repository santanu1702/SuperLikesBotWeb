import { LINKS } from "./links";
import { toBold } from "../utils/bold";

export type PlanIcon = "demo" | "starter" | "pro" | "premium";

/** Every plan delivers exactly this many likes per day; durations are derived from it. */
export const LIKES_PER_DAY = 200;

export interface Plan {
  id: string;
  icon: PlanIcon;
  name: string;
  price: number;
  /** Total likes in the package (numeric, used to calculate the duration). */
  totalLikes: number;
  /** Likes label shown on the card. */
  likes: string;
  description: string;
  buttonLabel: string;
  /** Duration in days = ceil(totalLikes / LIKES_PER_DAY). */
  days: number;
  /** Plain-text order message (converted to bold-style Unicode for Telegram). */
  message: string;
  /** Each plan has its own Telegram deep link with its own prefilled message. */
  href: string;
  popular?: boolean;
}

/** Duration in whole days; fractional results always round up to the next full day. */
export const durationDays = (totalLikes: number) => Math.ceil(totalLikes / LIKES_PER_DAY);

export const durationLabel = (days: number) => `${days} ${days === 1 ? "Day" : "Days"}`;

/** Builds the Telegram chat URL with a bold-style, safely encoded prefilled message. */
export const telegramOrderLink = (message: string) =>
  `${LINKS.support}?text=${encodeURIComponent(toBold(message))}`;

type PlanInput = Omit<Plan, "days" | "href">;

const define = (p: PlanInput): Plan => ({
  ...p,
  days: durationDays(p.totalLikes),
  href: telegramOrderLink(p.message),
});

export const PLANS: Plan[] = [
  define({
    id: "demo",
    icon: "demo",
    name: "Demo Plan",
    price: 7,
    totalLikes: 200,
    likes: "200+ Likes",
    description: "Demo Likes Package",
    buttonLabel: "Buy Demo Plan",
    message: "Hello I want 7rs demo like. Please give me QR",
  }),
  define({
    id: "starter",
    icon: "starter",
    name: "Starter Plan",
    price: 35,
    totalLikes: 1000,
    likes: "1000+ Likes",
    description: "Affordable Autolike Package",
    buttonLabel: "Buy Starter Plan",
    message: "Hello I want 35rs autolike. Please give me QR",
  }),
  define({
    id: "pro",
    icon: "pro",
    name: "Pro Plan",
    price: 80,
    totalLikes: 3000,
    likes: "3000+ Likes",
    description: "Professional Autolike Package",
    buttonLabel: "Buy Pro Plan",
    message: "Hello I want 80rs autolike. Please give me QR",
  }),
  define({
    id: "premium",
    icon: "premium",
    name: "Premium Plan",
    price: 130,
    totalLikes: 6600,
    likes: "6600 Likes",
    description: "Premium Autolike Package",
    buttonLabel: "Buy Premium Plan",
    message: "Hello I want 130rs autolike. Please give me QR",
    popular: true,
  }),
];
