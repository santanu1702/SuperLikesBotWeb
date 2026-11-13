export type StepIcon = "package" | "purchase" | "details" | "likes";

export interface Step {
  id: string;
  label: string; // "STEP 01"
  icon: StepIcon;
  title: string;
  description: string;
}

export const STEPS: Step[] = [
  {
    id: "choose",
    label: "STEP 01",
    icon: "package",
    title: "Choose Your Package",
    description: "Select the plan that fits your needs and budget.",
  },
  {
    id: "purchase",
    label: "STEP 02",
    icon: "purchase",
    title: "Complete Your Purchase",
    description: "Choose your preferred package and complete the purchase process.",
  },
  {
    id: "details",
    label: "STEP 03",
    icon: "details",
    title: "Submit Your Account Details",
    description: "Provide the required Free Fire UID and complete the account setup.",
  },
  {
    id: "enjoy",
    label: "STEP 04",
    icon: "likes",
    title: "Enjoy Daily Auto Likes",
    description: "Receive your daily likes automatically and get notifications directly from our Telegram bot.",
  },
];
