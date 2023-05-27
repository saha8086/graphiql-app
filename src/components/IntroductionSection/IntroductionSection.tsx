import { useTranslation } from 'react-i18next';

interface IColumn {
  name: string;
  value: string;
}

const PEOPLE_IN_CONFERENCE_IMG =
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply';

const IntroductionSection = () => {
  const { t } = useTranslation();
  const columns: IColumn[] = t('startSection.columns', { returnObjects: true });
  return (
    <section className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img
        src={PEOPLE_IN_CONFERENCE_IMG}
        alt="people in conference room"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div className="introduction-background" />
      </div>
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <div className="introduction-background" />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 min-h-[610px]">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">GraphiQL</h1>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {t('startSection.subTitle')}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">{t('startSection.description')}</p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <dl className="mt-16 items-start grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((column) => (
              <div key={column.name} className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-300">{column.name}</dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                  {column.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
