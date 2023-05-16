export interface IDeveloper {
  name: string;
  github: string;
  image: string;
}

const DEVELOPERS: IDeveloper[] = [
  {
    name: 'Iliasov Damir',
    github: 'https://github.com/iliasovdamir',
    image: 'https://avatars.githubusercontent.com/u/106773589?v=4',
  },
  {
    name: 'Buhlak Alexandr',
    github: 'https://github.com/saha80',
    image: 'https://i.postimg.cc/s2vSDhXk/a291e4874e70df86094bdaf99c6977df.jpg',
  },
  {
    name: 'Savenko Mikhail',
    github: 'https://github.com/almondchips',
    image: 'https://avatars.githubusercontent.com/u/94008966?v=4',
  },
];

export default DEVELOPERS;
