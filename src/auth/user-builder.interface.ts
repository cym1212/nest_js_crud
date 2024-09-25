// user-builder.interface.ts
export interface UserBuilder {
  setName(name: string): this;
  setPassword(password: string): this;
  setPhoneNumber(phoneNumber: string): this;
  build(): Promise<void>;
}
