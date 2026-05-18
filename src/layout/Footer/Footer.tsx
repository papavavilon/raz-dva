import styles from './Footer.module.css';
import LogoDark from '../../assets/logo-dark.svg';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button.tsx';
import { useEffect } from 'react';
import { notify } from '../../utils/notify.ts';
import { type SubmitHandler, useForm } from 'react-hook-form';

type ContactFormValues = {
  email: string;
};

const Footer = () => {
  const { t } = useTranslation();

  const {
    register: registerContact,
    handleSubmit: handleContactSubmit,
    reset: resetContact,
    formState: { errors: contactErrors, submitCount: contactSubmitCount },
  } = useForm<ContactFormValues>();

  const onContactSubmit: SubmitHandler<ContactFormValues> = (data) => {
    console.log(data);
    notify.success('Email sent!');
    resetContact();
  };

  useEffect(() => {
    const firstError = Object.values(contactErrors)[0];
    if (firstError?.message) {
      notify.error(firstError.message as string);
    }
  }, [contactSubmitCount, contactErrors]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.footer}>
        <div className={styles.brandContainer}>
          <img className={styles.logo} src={LogoDark} alt="" />
          <div className={styles.logosContainer}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2324_1392)">
                <path
                  d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C20.102 2.381 21.621 3.924 21.769 7.152C21.827 8.417 21.838 8.797 21.838 12.001C21.838 15.206 21.826 15.585 21.769 16.85C21.62 20.075 20.105 21.621 16.85 21.769C15.584 21.827 15.206 21.839 12 21.839C8.796 21.839 8.416 21.827 7.151 21.769C3.891 21.62 2.38 20.07 2.232 16.849C2.174 15.584 2.162 15.205 2.162 12C2.162 8.796 2.175 8.417 2.232 7.151C2.381 3.924 3.896 2.38 7.151 2.232C8.417 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C2.695 0.272 0.273 2.69 0.073 7.052C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.668 0.072 16.948C0.272 21.306 2.69 23.728 7.052 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.668 23.986 16.948 23.928C21.302 23.728 23.73 21.31 23.927 16.948C23.986 15.668 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.732 2.699 21.311 0.273 16.949 0.073C15.668 0.014 15.259 0 12 0ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.163 12 18.163C15.403 18.163 18.162 15.404 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.21 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.21 14.209 16 12 16ZM18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.595C16.965 6.39 17.61 7.035 18.406 7.035C19.201 7.035 19.845 6.39 19.845 5.595C19.845 4.8 19.201 4.155 18.406 4.155Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_2324_1392">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <svg
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.1996 8.2002L4.59961 13.6002L9.99961 15.4002M20.1996 8.2002L9.99961 15.4002M20.1996 8.2002L15.3996 20.8002L9.99961 15.4002"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13 25C19.6276 25 25 19.6276 25 13C25 6.3724 19.6276 1 13 1C6.3724 1 1 6.3724 1 13C1 19.6276 6.3724 25 13 25Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2324_1397)">
                <path
                  d="M20.5025 3.58288C19.3967 2.47181 18.0796 1.59084 16.6282 0.991317C15.1767 0.391794 13.6198 0.0857045 12.0482 0.090885C5.46332 0.090885 0.0964826 5.43087 0.0964826 11.9829C0.0964826 14.0828 0.651256 16.1228 1.68844 17.9228L0 24.0908L6.33166 22.4348C8.0804 23.3828 10.0462 23.8868 12.0482 23.8868C18.6332 23.8868 24 18.5468 24 11.9949C24 8.81486 22.7578 5.82687 20.5025 3.58288ZM12.0482 21.8708C10.2633 21.8708 8.51457 21.3908 6.98291 20.4908L6.6211 20.2748L2.85829 21.2588L3.8593 17.6108L3.61809 17.2388C2.62619 15.6633 2.09961 13.842 2.09849 11.9829C2.09849 6.53487 6.5608 2.09488 12.0362 2.09488C14.6894 2.09488 17.1859 3.12688 19.0553 4.99887C19.981 5.91551 20.7147 7.00592 21.2136 8.20686C21.7126 9.4078 21.9669 10.6954 21.9618 11.9949C21.9859 17.4428 17.5236 21.8708 12.0482 21.8708ZM17.4995 14.4788C17.198 14.3348 15.7266 13.6149 15.4613 13.5069C15.1839 13.4109 14.991 13.3629 14.7859 13.6509C14.5809 13.9508 14.0141 14.6228 13.8452 14.8148C13.6764 15.0188 13.4955 15.0428 13.194 14.8868C12.8925 14.7428 11.9276 14.4188 10.794 13.4109C9.90151 12.6189 9.31055 11.6469 9.12965 11.3469C8.9608 11.0469 9.10553 10.8909 9.26231 10.7349C9.39497 10.6029 9.56382 10.3869 9.70854 10.2189C9.85327 10.0509 9.91357 9.91886 10.01 9.72686C10.1065 9.52286 10.0583 9.35486 9.98593 9.21086C9.91357 9.06686 9.31055 7.60287 9.06935 7.00287C8.82814 6.42687 8.57487 6.49887 8.39397 6.48687H7.81507C7.61005 6.48687 7.29648 6.55887 7.01909 6.85887C6.75377 7.15887 5.98191 7.87886 5.98191 9.34286C5.98191 10.8069 7.05528 12.2229 7.2 12.4149C7.34472 12.6189 9.31055 15.6188 12.3015 16.9028C13.0131 17.2148 13.5678 17.3948 14.002 17.5268C14.7136 17.7548 15.3648 17.7188 15.8834 17.6468C16.4623 17.5628 17.6563 16.9268 17.8975 16.2308C18.1508 15.5348 18.1508 14.9468 18.0663 14.8148C17.9819 14.6828 17.801 14.6228 17.4995 14.4788Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_2324_1397">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className={styles.sitemap}>
          <Link to="/#best-sellers" className="body-l">
            {t('Best Sellers')}
          </Link>
          <Link to="/" className="body-l">
            {t('About Us')}
          </Link>
          <Link to="/catalog" className="body-l">
            {t('Catalog')}
          </Link>
          <Link to="/#reviews" className="body-l">
            {t('Reviews')}
          </Link>
          <Link to="/#faq" className="body-l">
            {t('FAQ')}
          </Link>
        </div>
        <div className={styles.contactContainer}>
          <p className={`body-bold-24 ${styles.contactTitle}`}>
            {t('contact Us')}
          </p>
          <form
            className={styles.contactInputWrapper}
            onSubmit={handleContactSubmit(onContactSubmit)}
          >
            <input
              type="text"
              className={`body-l ${styles.contactInput}`}
              placeholder={'your@gmail.com'}
              {...registerContact('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })}
            />
            <Button className={styles.inputButton} variant="main" type="submit">
              <p className="button-l">{t('Send')}</p>
            </Button>
          </form>
        </div>
      </div>
      <p className={`body-bold-l ${styles.copyright}`}>
        {t('© 2026 RazDva Fightshop. All rights reserved.')}
      </p>
    </div>
  );
};

export default Footer;
