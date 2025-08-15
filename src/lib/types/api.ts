export type ApiRegisterPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  content: {
    user: { id: string; fullName: string; email: string; role: string };
    token: string;
  };
  message: string;
  errors: string[];
};
