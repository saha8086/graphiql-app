import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export interface GraphiQlButtonProps {
  className?: string;
}

export const GraphiQlButton: FC<GraphiQlButtonProps> = (props) => {
  const { t } = useTranslation();

  return (
    <button {...props} type="button">
      <Link to="/graphql">{t('graphi-ql-button')}</Link>
    </button>
  );
};
