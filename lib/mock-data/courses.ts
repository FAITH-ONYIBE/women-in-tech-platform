export type Course = {
  id: string;
  title: string;
  category: string;
  /** Set to a file in /public/images to use a photo; otherwise a branded tile is drawn. */
  image?: string;
  tile: { from: string; to: string; label: string; sub?: string };
  enrollable: boolean;
};

export const courses: Course[] = [
  {
    id: 'networking-certification',
    title: 'Networking Certification',
    category: "New Member's Hub",
    tile: { from: '#00B9E8', to: '#0096C7', label: 'NETWORKING', sub: 'Certification track' },
    enrollable: true,
  },
  {
    id: 'online-learning-courses',
    title: 'Partner Online Courses',
    category: "New Member's Hub",
    tile: { from: '#0A5BD8', to: '#0847A8', label: 'ONLINE', sub: 'Partner courses' },
    enrollable: true,
  },
  {
    id: 'skill-development',
    title: 'Skill Development',
    category: 'Resources',
    tile: { from: '#2A0F57', to: '#7A1FA2', label: 'SKILLS', sub: 'Community resources' },
    enrollable: false,
  },
];
