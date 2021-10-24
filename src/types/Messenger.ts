export enum Operator {
  lt = 'lt',
  gt = 'gt'
}

export interface MessageDTO {
  id: number;
  author: string;
  created: number;
  text: string;
}

export interface DialogDTO {
  id: number;
  subject: string;
  created: number;
  lastMessage?: MessageDTO;
}

export interface TimeWhere {
  operator: Operator;
  value: number;
}
