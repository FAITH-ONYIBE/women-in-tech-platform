// All figures are placeholder demo data for the academic project.

export const hero = {
  title: 'She has the talent. She needs the opportunity.',
  body: 'africanqueen is an online community that helps African women build careers in technology. Join free to earn industry certificates, meet mentors, and find grants and jobs.',
};

export type Feature = { title: string; body: string; link?: { label: string; href: string } };

export const features: Feature[] = [
  {
    title: 'Free Certifications',
    body: 'Earn industry-recognised certificates in networking, data and cloud. Learning is free, online and in person.',
  },
  {
    title: 'Events and Data Mondays',
    body: 'Join hands-on events in Nigeria, Kenya, Ghana and Uganda, including our weekly Data Monday sessions.',
  },
  {
    title: '30+ Mentors',
    body: 'Get real advice from women who have done it. Mentors help with your CV, interviews and next career step.',
  },
  {
    title: 'Grants and Jobs',
    body: 'Members get new grants, fellowships and job tips every week. Find funding for your studies or your startup.',
    link: { label: 'Explore Career Opportunities', href: '/courses' },
  },
];

export const stats = [
  { value: '12,000+', label: 'Online Community' },
  { value: '3,500+', label: 'Women Trained in Tech' },
  { value: '410+', label: 'Certificates Earned' },
  { value: '5+', label: 'Years of Impact' },
];

export const movement = {
  title: ['More Than a Community.', 'A Movement.'],
  body: 'We are dedicated to creating a world where African women are at the forefront of technological innovation and economic growth.',
  quote: '“We build a pipeline of African women in technology by connecting them with the training, mentorship, and opportunities they need to lead.”',
  tags: ['Global Tech Leaders', 'Social Impact Champions', 'Startup Founders'],
  bullets: [
    'Launching startups that solve real-world challenges in Africa.',
    'Securing roles in global tech companies and leading innovation teams.',
    'Gaining cutting-edge skills in AI, blockchain, and software development.',
    'Building a powerful professional network of peers, mentors, and allies.',
  ],
};

export const donationTiers = [
  { amount: '$25', text: 'A tech workshop for one woman' },
  { amount: '$100', text: 'Mentorship and skill building for one emerging leader' },
  { amount: '$250', text: 'One woman joins a global hackathon or skill challenge' },
  { amount: '$500', text: 'A full certification or training scholarship for one woman', featured: true },
];

export const partners = ['Lagos Tech Collective', 'Abia Digital Guild', 'Nairobi Code Circle', 'Accra Women Build'];

export const spotlight = {
  name: 'Adaeze Okafor',
  country: 'Nigeria',
  quote: '“I had no idea a certification would change my life.”',
  body: 'She earned her networking certificate, got hired, and came back to help lead our annual event.',
  link: { label: 'See her certificate', href: '/courses' },
};
