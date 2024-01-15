export type GuestProps = {
  name: string;
  email: string;
  invaite: boolean;
};

export type GuestCardProps = {
  guest: GuestProps;
  onAddInvaite: (newInvaite: GuestProps) => void;
};

export type GuestListProps = {
  list: GuestProps[];
  onAddInvaite: (newInvaite: GuestProps) => void;
};
