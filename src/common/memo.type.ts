import { Timestamp } from 'firebase/firestore';

export type Memo = {
  url: string;
  type: string;
  title: string;
  content: string;
};
