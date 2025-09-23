import { IconButton } from '@chakra-ui/react';
import { useResponsive } from '@hooks/responsive';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { VscPlay } from 'react-icons/vsc';

export interface PlayButtonProps {
  isLoading: boolean;
  onRunClick: () => void;
}

export const PlayButton: FC<PlayButtonProps> = ({ isLoading, onRunClick }) => {
  const { t } = useTranslation();

  const { isMobile } = useResponsive();

  return (
    <IconButton
      aria-label={t('run-request')}
      icon={<VscPlay className="text-base" />}
      colorScheme="blue"
      isLoading={isLoading}
      aspectRatio={!isMobile ? 5 / 3 : undefined}
      onClick={onRunClick}
    />
  );
};
