export type MemberType = {
  id: string;
  name: string;
  username: string;
};

export type ConversationType = {
  id: string;
  members: MemberType[];
  lastMessage: { text: string };
  name:string
};

