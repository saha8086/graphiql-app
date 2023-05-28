import TeamSection from '@components/TeamSection/TeamSection';
import StartSection from '@components/IntroductionSection/IntroductionSection';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/authentication';

const WelcomePage = () => {
  const { t } = useTranslation();
  const [authorized] = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <StartSection />
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <button
          onClick={() => {
            navigate(authorized ? '/graphql' : '/sign-in');
          }}
          className="rounded-md bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {t('start')} <span aria-hidden="true">→</span>
        </button>
      </div>
      <TeamSection />
    </>
  );
};

export default WelcomePage;
