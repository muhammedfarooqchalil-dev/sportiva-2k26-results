export type GroupColor = 'Green' | 'Red' | 'Blue';
export type EventType = 'Athletics' | 'Games';
export type Position = '1st' | '2nd' | '3rd' | 'Participated';

export interface Result {
  id: string;
  studentName: string;
  regNo: string;
  group: GroupColor;
  eventName: string;
  eventType: EventType;
  position: Position;
  points: number;
  timestamp: number;
}

export interface GroupScore {
  group: GroupColor;
  totalPoints: number;
}

export const GROUPS: GroupColor[] = ['Green', 'Red', 'Blue'];
export const EVENT_TYPES: EventType[] = ['Athletics', 'Games'];
export const POSITIONS: Position[] = ['1st', '2nd', '3rd', 'Participated'];

// Default points mapping to help the user
export const POINTS_MAP: Record<Position, number> = {
  '1st': 5,
  '2nd': 3,
  '3rd': 1,
  'Participated': 0
};