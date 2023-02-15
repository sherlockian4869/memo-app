import { Timestamp } from 'firebase/firestore';

export type Data = {
  id: string;
  url: string;
  type: string;
  title: string;
  content: string;
  createdAt: Timestamp;
};
