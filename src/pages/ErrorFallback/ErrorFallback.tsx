import styles from './ErrorFallback.module.css';
import LogoLight from '../../assets/logo-light.svg';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { FallbackProps } from 'react-error-boundary';
import { Button } from '../../components/Button/Button.tsx';

export function NotFoundFallback({
  resetErrorBoundary,
}: {
  resetErrorBoundary: (...args: unknown[]) => void;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleReturnToCatalog = () => {
    resetErrorBoundary();
    navigate('/catalog');
  };

  return (
    <div className={styles.container}>
      <div className={styles.brandHeader}>
        <img src={LogoLight} alt="" />
      </div>

      <div className={styles.contentWrapper}>
        <h1 className={styles.bgText}>404</h1>
        <h2 className={styles.title}>{t('Down for the count')}</h2>
        <p className={styles.description}>
          {t(
            'The gear or page you are looking for has been moved, deleted, or never existed. Time to get back in the ring.',
          )}
        </p>
        <Button variant={'main'} onClick={handleReturnToCatalog}>
          <p>{t('Return to Catalog')}</p>
        </Button>
      </div>
    </div>
  );
}

export function GeneralErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: (...args: unknown[]) => void;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRetry = () => {
    resetErrorBoundary();
    navigate(0);
  };

  const handleGoHome = () => {
    resetErrorBoundary();
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.brandHeader}>
        <img src={LogoLight} alt="" />
      </div>

      <div className={styles.contentWrapper}>
        <h1 className={styles.titleTko}>
          <Trans>
            Technical <span className={styles.highlightRed}>TKO</span>
          </Trans>
        </h1>
        <h2 className={styles.title}>{t('Something went wrong')}</h2>
        <p className={styles.description}>
          {t(
            "Our systems took an unexpected hit. We're in the corner working on getting things back to fighting shape.",
          )}
        </p>

        <div className={styles.errorBox}>
          <span className={styles.errorLabel}>ERROR:</span>
          {error?.message || t('Unknown Application Error')}
        </div>

        <div className={styles.buttonGroup}>
          <Button variant={'main'} onClick={handleRetry}>
            <p>{t('Try Again')}</p>
          </Button>
          <Button variant={'outline-light'} onClick={handleGoHome}>
            <p>{t('Go to Home')}</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function GlobalErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const isError = (e: unknown): e is Error => e instanceof Error;

  if (!isError(error)) {
    return;
  }

  const is404 = error.message.includes('404');

  if (is404) {
    return <NotFoundFallback resetErrorBoundary={resetErrorBoundary} />;
  }

  return (
    <GeneralErrorFallback
      error={error}
      resetErrorBoundary={resetErrorBoundary}
    />
  );
}
