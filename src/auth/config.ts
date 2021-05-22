export interface Config {
  clientId: string;
  clientSecret: string;
}

export const defaults: Config = {
  clientId: "",
  clientSecret: "",
};

export const env: Config = {
  clientId: process.env.AUTH_CLIENT_ID as string,
  clientSecret: process.env.AUTH_CLIENT_SECRET as string,
};
