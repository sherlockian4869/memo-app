import { Timestamp } from 'firebase/firestore';

export type Memo = {
  id: number;
  url: string;
  title: string;
  content: string;
  createdAt: Timestamp;
};
