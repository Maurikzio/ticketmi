declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production",
      AWS_REGION: string;
      AWS_ACCESS_KEY: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_BUCKET_NAME: string;
    }
  }
}

export { }
