export type SceneType =
  | 'opening'
  | 'password'
  | 'welcome'
  | 'questions'
  | 'reveal'
  | 'letter'
  | 'hug'
  | 'miss_you'
  | 'gallery'
  | 'final';

export interface SceneMeta {
  id: SceneType;
  title: string;
  shortTitle: string;
  iconName: string;
}

export const SCENES: SceneMeta[] = [
  { id: 'opening', title: 'A World Just For You', shortTitle: 'Prologue', iconName: 'Sparkles' },
  { id: 'password', title: 'Our Secret Date', shortTitle: 'Secret Key', iconName: 'KeyRound' },
  { id: 'welcome', title: 'My Favorite Person', shortTitle: 'Welcome', iconName: 'Heart' },
  { id: 'questions', title: 'Four Little Questions', shortTitle: 'Questions', iconName: 'HelpCircle' },
  { id: 'reveal', title: 'Happy Birthday Maa', shortTitle: 'Birthday Reveal', iconName: 'Gift' },
  { id: 'letter', title: 'Heartfelt Letter', shortTitle: 'Love Letter', iconName: 'Mail' },
  { id: 'hug', title: 'Hugging & Warm Embrace', shortTitle: 'Hugging', iconName: 'Smile' },
  { id: 'miss_you', title: 'Under The Same Stars', shortTitle: 'I Miss You', iconName: 'Moon' },
  { id: 'gallery', title: 'Our Memory Scrapbook', shortTitle: 'Memories', iconName: 'Camera' },
  { id: 'final', title: 'Forever Us', shortTitle: 'Forever Us', iconName: 'Flame' },
];
