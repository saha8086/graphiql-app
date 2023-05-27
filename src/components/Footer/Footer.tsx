import { FC } from 'react';
import DEVELOPERS from 'src/constants/developers';

export const Footer: FC = () => {
  return (
    <footer className="w-full flex justify-between p-2 items-center bg-white dark:bg-slate-600 shadow">
      <p className="font-bold">2023</p>
      <ul className="flex gap-5">
        {DEVELOPERS.map((developer) => {
          return (
            <li key={developer.name}>
              <a href={developer.github} target="_blank" rel="noreferrer">
                <img
                  className="w-8 h-8 dark:invert"
                  src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                  alt={developer.name}
                  title={developer.name}
                />
              </a>
            </li>
          );
        })}
      </ul>
      <a href="https://rs.school/react/" target="_blank" rel="noreferrer">
        <img
          className="w-20 h-10 dark:invert"
          src="https://rs.school/images/rs_school.svg"
          alt="RSSchool"
        />
      </a>
    </footer>
  );
};
