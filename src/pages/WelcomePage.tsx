import TeamSection from '@components/TeamSection/TeamSection';
import TitleSection from '@components/TitleSection/TitleSection';

const WelcomePage = () => {
  return (
    <>
      <TitleSection />
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <button className="rounded-md bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Start <span aria-hidden="true">→</span>
        </button>
      </div>
      <TeamSection />
    </>
  );
};

export default WelcomePage;
