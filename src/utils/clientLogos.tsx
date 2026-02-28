// Direct mapping of client IDs to logo image paths
export const CLIENT_LOGOS: Record<string, string> = {
  "sydney-airport": "/syd_logo.png",
  uniting: "/uniting_logo.png",
  "hungry-jacks": "/hungryjacks_logo.png",
  "levande": "/levande_logo.png"
};

export const getClientLogo = (clientId: string): string | undefined => {
  return CLIENT_LOGOS[clientId];
};
