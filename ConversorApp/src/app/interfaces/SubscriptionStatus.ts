export interface SubscriptionStatus {
    userId: number;
    subscriptionIsActive: boolean;
    subscriptionName: string;
    maxCountConvertions: number;
    conversionMaked: number;
    conversionsRemaining: number;
  }