// Shared between the register form (client) and its server action.

export const membershipGrades = [
  "Professional member",
  "Student member",
  "Corporate representative",
  "Not yet a member",
] as const;

export type RegistrationValues = {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  event: string;
  grade: string;
  notes: string;
};

export type RegistrationField = keyof RegistrationValues;

export type RegisterState =
  | { status: "idle" }
  | {
      status: "error";
      message?: string;
      fieldErrors: Partial<Record<RegistrationField, string>>;
      values: RegistrationValues;
    }
  | {
      status: "success";
      firstName: string;
      email: string;
      eventTitle: string;
      accessCode: string | null;
      emailSent: boolean;
      alreadyRegistered: boolean;
    };
