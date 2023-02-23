import { Timestamp } from 'firebase/firestore';

export type Data = {
  id: string;
  url: string;
  type: string;
  important: string;
  title: string;
  content: string;
  document: string;
  createdAt: Timestamp;
};
