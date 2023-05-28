import { useTranslation } from 'react-i18next';
import DEVELOPERS from 'src/constants/developers';

const TeamSection = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center justify-center gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-2">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('teamSection.title')}
          </h2>
          <p className="mt-6 text-xl leading-8 text-gray-600 pr-4">
            {t('teamSection.description')}
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-1 sm:gap-y-16 xl:col-span-1">
          {DEVELOPERS.map((developer) => {
            return (
              <li key={developer.name}>
                <div className="flex items-center gap-x-6">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={developer.image}
                    alt={developer.name}
                  />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {t(`teamSection.${developer.name}`)}
                    </h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">
                      {t('teamSection.developer')}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default TeamSection;
