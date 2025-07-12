import { DocumentData } from "firebase/firestore";

export interface Answer {
  content: string;
  author: string;
  timestamp: string; // You can change this to `Date` if you're not using ISO strings
}

export interface Question {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  username: string;
  date: string; // Or `Date` if you're not converting with `toISOString()`
  answersList: Answer[];
}

