export interface IContact {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  needsNDA: "yes" | "no";
  marketingConsent: boolean;
}