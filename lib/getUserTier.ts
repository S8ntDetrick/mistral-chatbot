export type SubscriptionTier = "free" | "basic" | "pro";

type SubscriptionData = {
  tier?: string | null;
  status?: string | null;
  cancel_at_period_end?: boolean | null;
  current_period_end?: string | null;
};

export function getUserTier(subscription: SubscriptionData | null): SubscriptionTier {
  if (!subscription) {
    return "free";
  }

  const tier = subscription.tier;

  const validTier: SubscriptionTier =
    tier === "basic" || tier === "pro" ? tier : "free";

  const status = subscription.status;

  const inactiveStatuses = ["canceled", "unpaid", "incomplete_expired"];

  if (status && inactiveStatuses.includes(status)) {
    return "free";
  }

  if (subscription.cancel_at_period_end && subscription.current_period_end) {
    const now = new Date();
    const periodEnd = new Date(subscription.current_period_end);

    if (now > periodEnd) {
      return "free";
    }

    return validTier;
  }

  return validTier;
}