// Shared between the register form (client) and its server action.

export const attendanceCategories = [
  "Exhibitor",
  "Sponsor",
  "Student",
  "Speaker",
  "Professional member",
  "Corporate representative",
  "Nacos member",
] as const;

export const membershipGrades = [...attendanceCategories];

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
