/**
 * Business settings that several sections read. Edit them here, not in the components.
 */

/**
 * Daily like-delivery schedule shown in the hero countdown and the "Likes land at 4 AM" section.
 * India has no daylight saving time, so a fixed UTC offset (IST = UTC+05:30 = 330 minutes) is exact.
 */
export const DELIVERY = {
  hour: 4,
  minute: 0,
  /** Text shown to visitors, e.g. "4 AM". Keep it in sync with hour/minute. */
  label: "4 AM",
  zoneLabel: "IST",
  utcOffsetMinutes: 330,
} as const;

const DAY_MS = 86_400_000;

/** Milliseconds from `now` until the next scheduled delivery (always > 0, at most 24 hours). */
export function msUntilNextDelivery(now: number = Date.now()): number {
  const wallClock = now + DELIVERY.utcOffsetMinutes * 60_000; // "clock on the wall" in the delivery zone
  const midnight = Math.floor(wallClock / DAY_MS) * DAY_MS;
  let target = midnight + (DELIVERY.hour * 60 + DELIVERY.minute) * 60_000;
  if (target <= wallClock) target += DAY_MS;
  return target - wallClock;
}

export interface PaymentMethod {
  id: string;
  label: string;
  /** Short line under the label. */
  note: string;
  /** Only methods with enabled: true are shown on the site. Never enable one you do not actually accept. */
  enabled: boolean;
}

/**
 * Payment methods shown in the "Payment Methods" section.
 * There is no payment gateway on this site: orders and payment are arranged with support on Telegram,
 * and every order message asks support for a QR code. So UPI (QR) is the one method listed.
 * To add or remove a method, edit this list.
 */
export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "upi", label: "UPI", note: "Pay by QR code", enabled: true },
];
