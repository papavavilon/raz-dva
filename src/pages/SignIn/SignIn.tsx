import styles from './SignIn.module.css';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import LogoDark from '../../assets/logo-dark.svg';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { notify } from '../../utils/notify.ts';
import { Button } from '../../components/Button/Button.tsx';
import Input from '../../components/Input/Input.tsx';
import Checkbox from '../../components/Checkbox/Checkbox.tsx';
import { useUserSlice } from '../../store';

interface SignInInputs {
  email: string;
  subscribe: boolean;
}

interface VerificationInputs {
  code: string;
}

const SignIn = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState<1 | 2>(1);
  const [userEmail, setUserEmail] = useState<string>('');

  const userSlice = useUserSlice();

  const navigate = useNavigate();

  const {
    register: registerSignIn,
    handleSubmit: handleSignInSubmit,
    formState: { errors: signInErrors },
  } = useForm<SignInInputs>({
    defaultValues: { subscribe: true },
  });

  const {
    register: registerVerify,
    handleSubmit: handleVerifySubmit,
    formState: { errors: verifyErrors },
  } = useForm<VerificationInputs>();

  const onSignIn: SubmitHandler<SignInInputs> = (data) => {
    setUserEmail(data.email);
    setStep(2);
  };

  const handleSignIn = (email: string) => {
    userSlice.login(email.split('@')[0]);
    navigate('/');
    notify.success('Signed In Successfully.');
  };

  const onVerify: SubmitHandler<VerificationInputs> = () =>
    handleSignIn(userEmail);

  const handleOauthSignIn = () => handleSignIn('test_user@example.com');

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <div className={styles.logoContainer}>
          <img src={LogoDark} alt="" />
        </div>
        {step === 1 ? (
          <form
            className={styles.formContent}
            onSubmit={handleSignInSubmit(onSignIn)}
            noValidate
          >
            <div>
              <h1 className="subtitle-m">{t('Sign in')}</h1>
              <p className={`body-l text-secondary ${styles.subtitle}`}>
                {t('Sign in or create an account')}
              </p>
            </div>
            <div className={styles.oauthButtonsContainer}>
              <Button
                variant={'light'}
                type="button"
                onClick={handleOauthSignIn}
              >
                <div className={styles.oauthButtonContent}>
                  <p className="body-l">{t('Continue with')}</p>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5377 6.69401H14.0007V6.66634H8.00065V9.33301H11.7683C11.2187 10.8853 9.74165 11.9997 8.00065 11.9997C5.79165 11.9997 4.00065 10.2087 4.00065 7.99967C4.00065 5.79067 5.79165 3.99967 8.00065 3.99967C9.02032 3.99967 9.94798 4.38434 10.6543 5.01267L12.54 3.12701C11.3493 2.01734 9.75665 1.33301 8.00065 1.33301C4.31898 1.33301 1.33398 4.31801 1.33398 7.99967C1.33398 11.6813 4.31898 14.6663 8.00065 14.6663C11.6823 14.6663 14.6673 11.6813 14.6673 7.99967C14.6673 7.55267 14.6213 7.11634 14.5377 6.69401Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M2.10156 4.89667L4.2919 6.50301C4.88456 5.03567 6.3199 3.99967 7.99956 3.99967C9.01923 3.99967 9.9469 4.38434 10.6532 5.01267L12.5389 3.12701C11.3482 2.01734 9.75556 1.33301 7.99956 1.33301C5.4389 1.33301 3.21823 2.77867 2.10156 4.89667Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M7.99945 14.6669C9.72145 14.6669 11.2861 14.0079 12.4691 12.9362L10.4058 11.1902C9.71409 11.7166 8.86865 12.0012 7.99945 12.0002C6.26545 12.0002 4.79312 10.8946 4.23845 9.35156L2.06445 11.0266C3.16779 13.1856 5.40845 14.6669 7.99945 14.6669Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M14.537 6.69466H14V6.66699H8V9.33366H11.7677C11.5047 10.0725 11.0311 10.7181 10.4053 11.1907L10.4063 11.19L12.4697 12.936C12.3237 13.0687 14.6667 11.3337 14.6667 8.00033C14.6667 7.55333 14.6207 7.11699 14.537 6.69466Z"
                      fill="#1976D2"
                    />
                  </svg>
                </div>
              </Button>
              <Button
                variant={'light'}
                type="button"
                onClick={handleOauthSignIn}
              >
                <div className={styles.oauthButtonContent}>
                  <p className="body-l">{t('Continue with')}</p>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.2382 8.4856C12.26 10.8356 14.3 11.6177 14.3225 11.6277C14.3052 11.6827 13.9966 12.7422 13.2478 13.8364C12.6006 14.7824 11.9287 15.7249 10.8706 15.7446C9.83083 15.7636 9.49646 15.1279 8.30758 15.1279C7.11908 15.1279 6.74771 15.7249 5.76333 15.7636C4.74183 15.8024 3.96396 14.7405 3.31133 13.7981C1.97783 11.8701 0.958705 8.34998 2.32708 5.97385C3.00683 4.79385 4.22183 4.04673 5.54046 4.02748C6.54346 4.00835 7.49021 4.70223 8.10333 4.70223C8.71608 4.70223 9.86658 3.86773 11.0761 3.99023C11.5825 4.01135 13.0037 4.19473 13.9163 5.53073C13.843 5.57635 12.2206 6.52085 12.2382 8.4856ZM10.2841 2.71485C10.8263 2.05848 11.1913 1.14448 11.0918 0.235352C10.3101 0.266727 9.36483 0.756226 8.80421 1.41235C8.30171 1.99323 7.86171 2.92323 7.98033 3.81435C8.85171 3.88185 9.74171 3.3716 10.2841 2.71485Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </Button>
            </div>
            <div className={styles.dividerRow}>
              <div className={styles.dividerLine} />
              <p className="body-l">{t('or')}</p>
              <div className={styles.dividerLine} />
            </div>
            <Input
              type="email"
              error={signInErrors.email}
              placeholder="Email"
              {...registerSignIn('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid email format',
                },
              })}
            />
            <Button variant="secondary" type="submit">
              <p className="body-l">{t('Continue')}</p>
            </Button>
            <Checkbox
              label={t('Email me with news and offers')}
              {...registerSignIn('subscribe')}
            />
          </form>
        ) : (
          <form
            className={styles.formContent}
            onSubmit={handleVerifySubmit(onVerify)}
            noValidate
          >
            <div>
              <h1 className="subtitle-m">{t('Enter code')}</h1>
              <p className={`body-l text-secondary ${styles.subtitle}`}>
                {t('Sent to')} {userEmail}
              </p>
            </div>
            <Input
              placeholder="6-digit code"
              maxLength={6}
              error={verifyErrors.code}
              {...registerVerify('code', {
                required: 'Code is required',
                minLength: { value: 6, message: 'Code must be 6 digits' },
                maxLength: 6,
                pattern: { value: /^[0-9]+$/, message: 'Only numbers allowed' },
              })}
            />
            <Button variant="secondary" type="submit">
              <p className="body-l">{t('Submit')}</p>
            </Button>
          </form>
        )}
      </div>
      <div className={styles.policyWrapper}>
        <Link to="#" className="body-l">
          {t('Privacy policy')}
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
