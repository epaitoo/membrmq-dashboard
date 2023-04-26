export interface Member {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string | null;
  group?: string;
  birthday?: string
}