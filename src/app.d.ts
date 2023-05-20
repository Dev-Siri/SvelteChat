declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }
}

export interface Message {
  createdAt: string;
  picture: string;
  text: string;
  uid: string;
}
