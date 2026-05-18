import styles from './Profile.module.css';
import { useUserSlice } from '../../store';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button/Button.tsx';
import Input from '../../components/Input/Input.tsx';
import { type SubmitHandler, useForm } from 'react-hook-form';
import type { ShippingAddress } from '../../types';
import { notify } from '../../utils';

const Profile = () => {
  const { user, updateShippingAddress } = useUserSlice();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ShippingAddress>({ defaultValues: user?.shippingAddress ?? {} });

  const onSubmit: SubmitHandler<ShippingAddress> = (data) => {
    updateShippingAddress(data);
    notify.success('Delivery details updated successfully!');
  };

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.deliveryDetailsWrapper}>
        <form
          className={styles.deliveryDetailsForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="body-bold-xl">{t('Delivery address')}</h2>
          <Input
            placeholder={t('Country/Region')}
            error={errors.country}
            {...register('country')}
          />
          <div className={styles.inputsRow}>
            <Input
              placeholder={t('First name')}
              error={errors.firstName}
              {...register('firstName')}
            />
            <Input
              placeholder={t('Last name')}
              error={errors.lastName}
              {...register('lastName')}
            />
          </div>
          <Input
            placeholder={t('Address')}
            error={errors.address}
            {...register('address')}
          />
          <Input
            placeholder={t('Apartment, suite, etc. (optional)')}
            error={errors.apartment}
            {...register('apartment')}
          />
          <div className={styles.inputsRow}>
            <Input
              placeholder={t('Postal code')}
              error={errors.postalCode}
              {...register('postalCode')}
            />
            <Input
              placeholder={t('City')}
              error={errors.city}
              {...register('city')}
            />
          </div>
          <Input
            placeholder={t('Phone')}
            error={errors.phone}
            {...register('phone')}
          />

          <Button type="submit" variant="main" disabled={!isDirty}>
            <p className="body-l">{t('Save')}</p>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
