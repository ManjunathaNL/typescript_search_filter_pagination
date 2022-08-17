export interface credType{
    username: string;
    password: string;
  }
export const loginFN = async (creds: credType): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (creds.username === "admin" && creds.password === "admin@123") {
          resolve();
        } else {
          reject();
        }
      }, 1000);
    });
  };
  