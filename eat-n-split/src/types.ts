import { SyntheticEvent } from 'react';

export type FriendProps = {
  id: string;
  name: string;
  image: string;
  balance: number;
};

export type EventFunction = (event?: SyntheticEvent) => void;
