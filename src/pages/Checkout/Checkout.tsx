import styles from './Checkout.module.css';
import LogoDark from '../../assets/logo-dark.svg';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button/Button.tsx';
import Input from '../../components/Input/Input.tsx';
import Checkbox from '../../components/Checkbox/Checkbox.tsx';
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { RadioAccordion } from '../../components/RadioAccordion/RadioAccordion.tsx';
import { useCartSlice, useOrdersSlice, useUserSlice } from '../../store';
import { getProductById } from '../../db.ts';
import type {
  Order,
  PaymentMethod,
  SelectedOptions,
  ShippingAddress,
} from '../../types';
import toTitleCase from '../../utils/toTitleCase.ts';
import { useEffect, useState } from 'react';
import { getProductPreviewImg, notify } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { getCardProvider } from '../../utils/getCardProvider.ts';

interface FormValues extends ShippingAddress {
  email: string;
  subscribe: boolean;
  paymentMethod: PaymentMethod;
  cardNumber: string;
  cardExp: string;
  cardCvc: string;
  cardName: string;
  billingSameAsShipping: boolean;
  promocode: string;
}

const Checkout = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const cartSlice = useCartSlice();
  const ordersSlice = useOrdersSlice();
  const { user } = useUserSlice();

  const [discountApplied, setDiscountApplied] = useState(false);
  const [order, setOrder] = useState<Order | null>();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      paymentMethod: 'card',
      subscribe: true,
      billingSameAsShipping: true,
      ...(user?.shippingAddress ?? {}),
    },
  });

  const paymentMethod = useWatch({ control, name: 'paymentMethod' });
  const address = useWatch({ control, name: 'address' });
  const city = useWatch({ control, name: 'city' });
  const country = useWatch({ control, name: 'country' });
  const postalCode = useWatch({ control, name: 'postalCode' });
  const promocode = useWatch({ control, name: 'promocode' }) || '';

  const isShippingEntered = Boolean(address && city && country && postalCode);

  const shippingCost = isShippingEntered ? 100 : 0;
  const discountAmount = discountApplied
    ? Math.round(cartSlice.cartSubtotal * 0.1)
    : 0;
  const finalTotal = cartSlice.cartSubtotal - discountAmount + shippingCost;

  const formatSelectedOptions = (options: SelectedOptions) => {
    return [
      options.size?.label,
      options.color && toTitleCase(t(options.color)),
      options.weight ? `${options.weight}oz` : undefined,
    ]
      .filter((v): v is string => Boolean(v))
      .join(' / ');
  };

  const formatPaymentMethodDetails = (order: Order) => {
    if (order.paymentMethod === 'google') return 'Google Pay';
    else if (order.paymentMethod === 'apple') return 'Apple Pay';
    else if (order.paymentMethod === 'paypal') return 'PayPal';
    else if (order.paymentMethod === 'card' && order.cardNumberSnapshot)
      return `${order.cardProvider} ending *${order.cardNumberSnapshot}`;
  };

  const validateCardNumber = (value: string) => {
    if (paymentMethod !== 'card' || !value) return true;

    const stripped = value.replace(/[\s-]/g, '');
    if (stripped.length < 13 || stripped.length > 19) {
      return t('Card number must be between 13 and 19 digits');
    }
    return true;
  };

  const validateCardExp = (value: string) => {
    if (paymentMethod !== 'card' || !value) return true;

    const match = value.match(/^(0[1-9]|1[0-2])\s?\/\s?([0-9]{2})$/);
    if (match) {
      const month = parseInt(match[1], 10);
      const year = parseInt(`20${match[2]}`, 10);

      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      if (
        year < currentYear ||
        (year === currentYear && month < currentMonth)
      ) {
        return t('Card has expired');
      }
    }
    return true;
  };

  const handleExpressPay = (method: 'google' | 'apple') => {
    const order = ordersSlice.addOrder({
      userId: user?.id,
      cartItems: cartSlice.cartItems,
      subtotal: cartSlice.cartSubtotal,
      discount: 1000,
      shippingCost: 100,
      total: finalTotal,
      paymentMethod: method,
      shippingAddress: {
        email: 'mockuser@example.com',
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Mock Street',
        city: 'Kyiv',
        country: 'Ukraine',
        postalCode: '01001',
        phone: '+380790598573',
        apartment: '13',
      },
    });
    cartSlice.clearCart();

    notify.success(t(`Paid successfully with`) + ` ${method}!`);
    setOrder(order);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const order = ordersSlice.addOrder({
      userId: user?.id,
      cartItems: cartSlice.cartItems,
      subtotal: cartSlice.cartSubtotal,
      discount: discountAmount,
      shippingCost: shippingCost,
      cardNumberSnapshot: data.cardNumber.slice(-4),
      cardProvider:
        data.paymentMethod === 'card'
          ? getCardProvider(data.cardNumber)
          : undefined,
      total: finalTotal,
      paymentMethod: paymentMethod,
      shippingAddress: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        country: data.country,
        postalCode: data.postalCode,
        phone: data.phone,
        apartment: data.apartment,
      },
    });
    cartSlice.clearCart();

    notify.success(t('Order placed successfully!'));
    setOrder(order);
  };

  const handleApplyPromo = () => {
    if (promocode.toLowerCase() === 'udar') {
      setDiscountApplied(true);
      notify.success(t('Promo code applied!'));
    } else {
      notify.error(t('Promo code is invalid!'));
    }
  };

  const handleBack = () => {
    navigate('/catalog');
  };

  useEffect(() => {
    if (cartSlice.cartItems.length === 0 && !order) {
      navigate('/catalog', { replace: true });
      notify.warning(
        t('You cannot access checkout page without any items in cart!'),
      );
    }
  }, [cartSlice.cartItems.length, order, navigate]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          <svg
            width="9"
            height="16"
            viewBox="0 0 9 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.73047 0.750203L0.749535 7.72149L7.69234 14.7311"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <img src={LogoDark} alt="" />
      </div>

      {order ? (
        <div className={styles.resultsWrapper}>
          <div className={styles.successContainer}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.6722 0.334392C23.2102 0.0347133 22.648 -0.0691647 22.1093 0.0456033C21.5707 0.160371 21.0996 0.484387 20.7998 0.946392L9.16216 18.8848L3.48662 13.6371C3.28638 13.4519 3.05163 13.308 2.79578 13.2136C2.53993 13.1192 2.26798 13.0761 1.99547 13.0868C1.44511 13.1083 0.92585 13.3476 0.551925 13.752C0.178001 14.1564 -0.01996 14.6928 0.00159223 15.2432C0.0231445 15.7935 0.262444 16.3128 0.666848 16.6867L8.11885 23.5765C8.11885 23.5765 8.33277 23.7607 8.43177 23.8251C8.6606 23.9736 8.91643 24.0755 9.18467 24.1251C9.4529 24.1748 9.72828 24.171 9.99508 24.1142C10.2619 24.0574 10.5149 23.9485 10.7396 23.7939C10.9643 23.6393 11.1564 23.4419 11.3048 23.2131L24.2842 3.20678C24.5839 2.7447 24.6878 2.18251 24.573 1.64386C24.4583 1.1052 24.1342 0.634182 23.6722 0.334392Z"
                fill="white"
              />
            </svg>
          </div>
          <div className={styles.successTitleContainer}>
            <h1 className="title-page-l">
              {t('Thank You for Your Purchase!')}
            </h1>
            <p className="body-l text-secondary">
              {t(
                'Your order has been confirmed. A confirmation email has been sent to your e-mail address.',
              )}
            </p>
          </div>
          <div className={styles.orderWrapper}>
            <div className={styles.orderHeader}>
              <p className="body-bold-xl">
                {t('Order')} #{order.orderNumber}
              </p>
              <p className={`body-bold-l ${styles.orderPrice}`}>
                {t('PAID')}: ₴{order.total}
              </p>
            </div>
            <div className={styles.orderDetailsWrapper}>
              <p className="subtitle-m">{t('Order Details')}</p>
              <div className={styles.orderDetails}>
                <div className={styles.orderItems}>
                  {order.items.map((item) => (
                    <div key={item.lineItemId} className={styles.productItem}>
                      <div className={styles.productImageContainer}>
                        <img
                          src={item.productSnapshot.imageUrl}
                          alt={item.productSnapshot.name}
                        />
                        <div className={styles.quantityContainer}>
                          <p>{item.quantity}</p>
                        </div>
                      </div>
                      <div className={styles.productItemContentWrapper}>
                        <div className={styles.productItemContentRow}>
                          <p className={`body-bold-l ${styles.productName}`}>
                            {item.productSnapshot.name}
                          </p>{' '}
                          <div className={styles.priceWrapper}>
                            <p className="body-bold-m">₴</p>
                            <p className="body-bold-l">{item.unitPrice}</p>
                          </div>
                        </div>
                        <p className="body-l text-secondary">
                          {formatSelectedOptions(item.selectedOptions)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.orderDetailsNextWrapper}>
                  <div className={styles.orderNextWrapper}>
                    <p className="body-bold-xl">{t('What’s Next?')}</p>
                    <ul className="body-l">
                      <li>
                        {t(
                          'You will receive an order confirmation email with details of your purchase.',
                        )}
                      </li>
                      <li>
                        {t(
                          'Once your order is shipped, we will send you a tracking number and shipping updates.',
                        )}
                      </li>
                      <li>
                        {t(
                          'If you have any questions, contact our support team.',
                        )}
                      </li>
                    </ul>
                    <p className="body-m">
                      {t('Need help? Contact us at')}{' '}
                      <a href="mailto:razdva@gmail.com">razdva@gmail.com</a>
                    </p>
                  </div>
                  <div className={styles.orderTotalsContainer}>
                    <div className={styles.totalsRow}>
                      <p className="body-l">{t('Subtotal')}</p>
                      <div className={styles.priceWrapper}>
                        <p className="body-m">₴</p>
                        <p className="body-l">{order.subtotal}</p>
                      </div>
                    </div>
                    {order.discount ? (
                      <div className={styles.totalsRow}>
                        <p className="body-l">{t('Discount')}</p>
                        <div className={styles.priceWrapper}>
                          <p className="body-m">-₴</p>
                          <p className="body-l">{order.discount}</p>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {order.shippingCost ? (
                      <div className={styles.totalsRow}>
                        <p className="body-l">{t('Shipping')}</p>
                        <div className={styles.priceWrapper}>
                          <p className="body-bold-m">+₴</p>
                          <p className="body-bold-l">{order.shippingCost}</p>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className={styles.dividerLine} />
                    <div className={styles.totalsRow}>
                      <p className="body-bold-xl">{t('Total')}</p>
                      <p className="body-bold-xl">₴{order.total}</p>
                    </div>
                    <div className={styles.dividerLine} />
                    <div className={styles.orderInformationContainer}>
                      <p className="body-l">
                        <b>{t('Order Information')}</b>
                      </p>
                      <div className="body-l">
                        <p>
                          <span className="text-secondary">
                            {t('Order Number')}:
                          </span>{' '}
                          #{order.orderNumber}
                        </p>
                        <p>
                          <span className="text-secondary">
                            {t('Order Date')}:
                          </span>{' '}
                          {new Date(order.placedAt).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            },
                          )}
                        </p>
                        <p>
                          <span className="text-secondary">E-Mail:</span>{' '}
                          {order.shippingAddress.email}
                        </p>
                        <p>
                          <span className="text-secondary">
                            {t('Payment Method')}:
                          </span>{' '}
                          {formatPaymentMethodDetails(order)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <p className="body-bold-xl text-secondary">
              {t('Thank you for shopping with us!')}
            </p>
            <p className="body-bold-l">
              {t('© 2026 RazDva Fightshop. All rights reserved.')}
            </p>
          </div>
        </div>
      ) : (
        <form
          className={styles.content}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className={styles.paymentDetailsContainer}>
            <div className={styles.contactDeliveryDetails}>
              <p className="body-l text-secondary">{t('Express checkout')}</p>
              <div className={styles.paymentButtonsContainer}>
                <Button
                  variant="light"
                  type="button"
                  onClick={() => handleExpressPay('google')}
                >
                  <div className={styles.paymentButtonContent}>
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.6257 9.03715H18.9008V8.9998H10.8008V12.5998H15.8871C15.1451 14.6955 13.1511 16.1998 10.8008 16.1998C7.81863 16.1998 5.40078 13.782 5.40078 10.7998C5.40078 7.81765 7.81863 5.3998 10.8008 5.3998C12.1773 5.3998 13.4297 5.9191 14.3832 6.76735L16.9289 4.2217C15.3215 2.72365 13.1714 1.7998 10.8008 1.7998C5.83053 1.7998 1.80078 5.82955 1.80078 10.7998C1.80078 15.7701 5.83053 19.7998 10.8008 19.7998C15.771 19.7998 19.8008 15.7701 19.8008 10.7998C19.8008 10.1964 19.7387 9.6073 19.6257 9.03715Z"
                        fill="#FFC107"
                      />
                      <path
                        d="M2.83789 6.61075L5.79484 8.7793C6.59494 6.79841 8.53264 5.3998 10.8002 5.3998C12.1767 5.3998 13.4291 5.9191 14.3826 6.76735L16.9283 4.2217C15.3209 2.72365 13.1708 1.7998 10.8002 1.7998C7.34329 1.7998 4.34539 3.75145 2.83789 6.61075Z"
                        fill="#FF3D00"
                      />
                      <path
                        d="M10.7994 19.7997C13.1241 19.7997 15.2364 18.9101 16.8334 17.4633L14.0479 15.1062C13.1141 15.8168 11.9728 16.201 10.7994 16.1997C8.45846 16.1997 6.47081 14.7071 5.72201 12.624L2.78711 14.8853C4.27661 17.7999 7.30151 19.7997 10.7994 19.7997Z"
                        fill="#4CAF50"
                      />
                      <path
                        d="M19.6257 9.03735H18.9008V9H10.8008V12.6H15.8871C15.5322 13.5974 14.8928 14.4689 14.048 15.1069L14.0493 15.1061L16.8348 17.4631C16.6377 17.6422 19.8008 15.3 19.8008 10.8C19.8008 10.1966 19.7387 9.6075 19.6257 9.03735Z"
                        fill="#1976D2"
                      />
                    </svg>
                    <p className="body-l">{t('Pay')}</p>
                  </div>
                </Button>
                <Button
                  variant="light"
                  type="button"
                  onClick={() => handleExpressPay('apple')}
                >
                  <div className={styles.paymentButtonContent}>
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_2654_8890)">
                        <path
                          d="M16.5223 11.4552C16.5516 14.6277 19.3056 15.6836 19.336 15.6971C19.3127 15.7713 18.8961 17.2017 17.8853 18.6787C17.0115 19.9558 16.1044 21.2282 14.676 21.2549C13.2723 21.2805 12.8209 20.4223 11.2159 20.4223C9.61144 20.4223 9.11009 21.2282 7.78118 21.2805C6.40215 21.3328 5.35202 19.8993 4.47098 18.6271C2.67075 16.0243 1.29494 11.2721 3.14224 8.06436C4.0599 6.47136 5.70016 5.46274 7.4803 5.43675C8.83435 5.41093 10.1125 6.34766 10.9402 6.34766C11.7674 6.34766 13.3206 5.22109 14.9534 5.38646C15.637 5.41498 17.5557 5.66254 18.7877 7.46614C18.6887 7.52773 16.4985 8.80281 16.5223 11.4552ZM13.8842 3.66471C14.6162 2.7786 15.109 1.5447 14.9747 0.317383C13.9193 0.359739 12.6432 1.02056 11.8864 1.90633C11.208 2.69051 10.614 3.94601 10.7741 5.14903C11.9505 5.24016 13.152 4.55132 13.8842 3.66471Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2654_8890">
                          <rect width="21.6" height="21.6" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <p className="body-l">{t('Pay')}</p>
                  </div>
                </Button>
              </div>
              <div className={styles.dividerRow}>
                <div className={styles.dividerLine} />
                <p className="body-l">{t('or')}</p>
                <div className={styles.dividerLine} />
              </div>

              <p className="body-bold-xl">{t('Contact')}</p>
              <Input
                type="email"
                placeholder={t('Email or mobile phone number')}
                error={errors.email}
                {...register('email', {
                  required: t('Email is required'),
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: t('Invalid email format'),
                  },
                })}
              />
              <Checkbox
                label={t('Email me with news and offers')}
                {...register('subscribe')}
              />

              <p className="body-bold-xl">{t('Delivery')}</p>
              <Input
                placeholder={t('Country/Region')}
                error={errors.country}
                {...register('country', { required: t('Country is required') })}
              />
              <div className={styles.inputsRow}>
                <Input
                  placeholder={t('First name')}
                  error={errors.firstName}
                  {...register('firstName', {
                    required: t('First name is required'),
                  })}
                />
                <Input
                  placeholder={t('Last name')}
                  error={errors.lastName}
                  {...register('lastName', {
                    required: t('Last name is required'),
                  })}
                />
              </div>
              <Input
                placeholder={t('Address')}
                error={errors.address}
                {...register('address', { required: t('Address is required') })}
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
                  {...register('postalCode', {
                    required: t('Postal code is required'),
                  })}
                />
                <Input
                  placeholder={t('City')}
                  error={errors.city}
                  {...register('city', { required: t('City is required') })}
                />
              </div>
              <Input
                placeholder={t('Phone')}
                error={errors.phone}
                {...register('phone', { required: t('Phone is required') })}
              />
            </div>

            <div className={styles.cardSectionWrapper}>
              <p className="body-bold-xl">{t('Payment')}</p>
              <p className="body-l text-secondary">
                {t('All transactions are secured')}
              </p>
              <RadioAccordion<FormValues>
                name="paymentMethod"
                register={register}
                selectedValue={paymentMethod}
                options={[
                  {
                    value: 'card',
                    label: 'Credit Card',
                    content: (
                      <div className={styles.cardFieldsContainer}>
                        <Input
                          placeholder={t('Card number')}
                          error={errors.cardNumber}
                          {...register('cardNumber', {
                            required:
                              paymentMethod === 'card'
                                ? t('Card number is required')
                                : false,
                            pattern: {
                              value: /^[\d\s-]{13,19}$/,
                              message: t('Invalid card number format'),
                            },
                            validate: validateCardNumber,
                          })}
                        />
                        <div className={styles.cardFieldsRow}>
                          <Input
                            placeholder={t('Expiration date (MM / YY)')}
                            error={errors.cardExp}
                            {...register('cardExp', {
                              required:
                                paymentMethod === 'card'
                                  ? t('Expiration date is required')
                                  : false,
                              pattern: {
                                value: /^(0[1-9]|1[0-2])\s?\/\s?([0-9]{2})$/,
                                message: t('Invalid format, use MM/YY'),
                              },
                              validate: validateCardExp,
                            })}
                          />
                          <Input
                            placeholder={t('Security code')}
                            error={errors.cardCvc}
                            {...register('cardCvc', {
                              required:
                                paymentMethod === 'card'
                                  ? t('Security code is required')
                                  : false,
                              pattern: {
                                value: /^[0-9]{3,4}$/,
                                message: t('Must be 3 or 4 digits'),
                              },
                            })}
                          />
                        </div>
                        <Input
                          placeholder={t('Name on card')}
                          error={errors.cardName}
                          {...register('cardName', {
                            required:
                              paymentMethod === 'card'
                                ? t('Name on card is required')
                                : false,
                          })}
                        />
                        <Checkbox
                          label={t('Use shipping address as billing address')}
                          {...register('billingSameAsShipping')}
                        />
                      </div>
                    ),
                    headerRightContent: (
                      <div className={styles.cardMethodLogosContainer}>
                        <div className={styles.cardMethodLogo}>
                          <svg
                            width="23"
                            height="18"
                            viewBox="0 0 23 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_2600_11167)">
                              <rect
                                width="22.5769"
                                height="17.55"
                                fill="white"
                              />
                              <path
                                d="M8.22852 3.68457H14.3269V14.6424H8.22852V3.68457Z"
                                fill="#FF5F00"
                              />
                              <path
                                d="M8.61529 9.163C8.61529 6.93662 9.6607 4.96185 11.2675 3.68405C10.0867 2.75478 8.59597 2.19336 6.96973 2.19336C3.11693 2.19336 0 5.31029 0 9.163C0 13.0157 3.11693 16.1326 6.96964 16.1326C8.59588 16.1326 10.0866 15.5712 11.2675 14.6419C9.6607 13.3835 8.61529 11.3894 8.61529 9.163Z"
                                fill="#EB001B"
                              />
                              <path
                                d="M22.1679 9.01945C22.1679 12.8721 19.051 15.9891 15.1983 15.9891C13.572 15.9891 12.0814 15.4277 10.9004 14.4983C12.5266 13.2206 13.5527 11.2458 13.5527 9.01945C13.5527 6.79307 12.5072 4.8183 10.9004 3.5405C12.0813 2.61123 13.572 2.0498 15.1983 2.0498C19.051 2.0498 22.1679 5.18614 22.1679 9.01945Z"
                                fill="#F79E1B"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2600_11167">
                                <rect
                                  width="22.5769"
                                  height="17.55"
                                  fill="white"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <div className={styles.cardMethodLogo}>
                          <svg
                            width="30"
                            height="10"
                            viewBox="0 0 30 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0 0H3.6423C3.9494 5.2701e-05 4.24731 0.104812 4.48685 0.296986C4.7264 0.489161 4.89326 0.757265 4.9599 1.05705L6.075 6.075L8.1 0H10.8L7.425 9.45H4.725L2.7 1.35L0 0ZM12.15 0H14.175L12.825 9.45H10.8L12.15 0ZM18.9041 0C19.9841 0 21.0911 0.167401 21.542 0.39285L21.2234 2.31795C20.8143 2.0952 19.8869 1.89945 18.9986 1.89945C18.1103 1.89945 17.8565 2.4597 17.8565 2.7027C17.8565 3.03615 18.306 3.2751 18.8771 3.5775C19.868 4.104 21.2234 4.82355 21.2234 6.57045C21.2234 8.59815 18.6557 9.45 17.3043 9.45C16.2243 9.45 14.904 9.2826 14.4531 9.05715L14.7704 7.13205C15.174 7.2711 16.2864 7.5816 17.1747 7.5816C18.0657 7.5816 18.7232 7.13205 18.7232 6.7473C18.7232 6.1722 18.1535 5.8752 17.4879 5.52825C16.551 5.03955 15.4238 4.4523 15.4238 2.8485C15.4238 0.8208 17.5527 0 18.9041 0ZM20.925 9.45H23.625L24.0881 8.1H27.1796L27.4806 9.45H29.7L27.675 0H24.975L20.925 9.45ZM26.7449 6.0723H24.7468L26.0105 2.66085L26.7449 6.0723Z"
                              fill="black"
                            />
                          </svg>
                        </div>
                        <div className={styles.cardMethodLogo}>
                          <p>+5</p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    value: 'paypal',
                    label: 'PayPal',
                    headerRightContent: (
                      <div>
                        <svg
                          width="33"
                          height="39"
                          viewBox="0 0 33 39"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M27.0733 6.82873C25.6692 5.32388 23.1311 4.67871 19.884 4.67871H10.4603C10.139 4.67866 9.82824 4.78642 9.58391 4.98259C9.33958 5.17875 9.17772 5.45046 9.12742 5.74884L5.20354 29.1494C5.12555 29.6109 5.50554 30.0287 6.00293 30.0287H11.8208L13.282 21.3143L13.2366 21.5872C13.3407 20.9712 13.901 20.5169 14.5644 20.5169H17.3291C22.7602 20.5169 27.0129 18.4426 28.2552 12.442C28.2921 12.2645 28.324 12.0918 28.3516 11.9231C28.1948 11.845 28.1948 11.845 28.3516 11.9231C28.7215 9.7052 28.3491 8.19552 27.0733 6.82873Z"
                            fill="#27346A"
                          />
                          <path
                            d="M15.5081 11.1243C15.6671 11.0529 15.8411 11.016 16.0173 11.0163H23.4053C24.2802 11.0163 25.0962 11.0698 25.8419 11.1826C26.0505 11.214 26.2581 11.2513 26.4643 11.2946C26.7566 11.3553 27.0455 11.4295 27.3299 11.517C27.6965 11.6322 28.0379 11.7662 28.3517 11.9232C28.7215 9.70448 28.3491 8.19561 27.0732 6.82878C25.6684 5.32389 23.131 4.67871 19.884 4.67871H10.4595C9.79591 4.67871 9.23141 5.13296 9.12742 5.74887L5.20354 29.1492C5.12555 29.6114 5.50554 30.0287 6.00212 30.0287H11.8208L14.8522 11.9524C14.882 11.7748 14.9573 11.6066 15.0716 11.4623C15.1858 11.3181 15.3356 11.2021 15.5081 11.1243Z"
                            fill="#27346A"
                          />
                          <path
                            d="M27.8027 13.0019C26.5649 19.0526 22.3274 21.1454 16.9155 21.1454H14.1599C13.4988 21.1454 12.9404 21.6036 12.8377 22.2248L11.0264 33.1522C10.9587 33.5595 11.2897 33.9285 11.7226 33.9285H16.6095C16.8895 33.9284 17.1602 33.8333 17.373 33.6603C17.5859 33.4872 17.7268 33.2475 17.7706 32.9844L17.8182 32.7474L18.7392 27.1921L18.7986 26.8851C18.8423 26.622 18.9832 26.3823 19.1961 26.2093C19.4089 26.0362 19.6796 25.9411 19.9595 25.941H20.6909C25.4249 25.941 29.1317 24.1107 30.2149 18.8172C30.667 16.6051 30.4331 14.7581 29.237 13.4608C28.8742 13.0679 28.4237 12.7434 27.8988 12.4785C27.8704 12.6496 27.8396 12.8229 27.8027 13.0019Z"
                            fill="#2790C3"
                          />
                          <path
                            d="M27.1517 10.9938C26.9527 10.9349 26.7518 10.8828 26.5494 10.8375C26.3374 10.7903 26.1242 10.7493 25.9099 10.7144C25.1429 10.5887 24.3052 10.5293 23.4055 10.5293H15.8159C15.6348 10.529 15.4559 10.5702 15.2927 10.6498C15.1153 10.7356 14.9612 10.8639 14.8438 11.0236C14.7263 11.1833 14.6491 11.3696 14.6188 11.5664L13.0056 21.9273L12.959 22.2293C13.0651 21.5475 13.6407 21.0447 14.3225 21.0447H17.1637C22.7438 21.0447 27.1129 18.7489 28.3892 12.1076C28.4272 11.9112 28.4591 11.7208 28.4884 11.5332C28.1652 11.3605 27.8153 11.211 27.4386 11.0845C27.3435 11.0526 27.2479 11.0223 27.1518 10.9938"
                            fill="#1F264F"
                          />
                        </svg>
                      </div>
                    ),
                  },
                ]}
              />
              <Button
                variant="main"
                type="submit"
                className={styles.checkoutBtn}
              >
                {t('Pay now')}
              </Button>
              <div className={styles.dividerLine} />
              <p className="body-bold-l">
                {t('© 2026 RazDva Fightshop. All rights reserved.')}
              </p>
            </div>
          </div>

          <div className={styles.productsContainer}>
            <div className={styles.productsList}>
              {cartSlice.cartItems.map((cartItem) => {
                const product = getProductById(cartItem.productId);
                const previewImg = getProductPreviewImg(cartItem.productId);

                return (
                  <div key={cartItem.cartItemId} className={styles.productItem}>
                    <div className={styles.productImageContainer}>
                      <img src={previewImg.url} alt={previewImg.alt} />
                      <div className={styles.quantityContainer}>
                        <p>{cartItem.quantity}</p>
                      </div>
                    </div>
                    <div className={styles.productItemContentWrapper}>
                      <div className={styles.productItemContentRow}>
                        <p className={`body-bold-l ${styles.productName}`}>
                          {i18n.language === 'ua'
                            ? product.nameUa
                            : product.name}
                        </p>{' '}
                        <div className={styles.priceWrapper}>
                          <p className="body-bold-m">₴</p>
                          <p className="body-bold-l">{product.price}</p>
                        </div>
                      </div>
                      <p className="body-l text-secondary">
                        {formatSelectedOptions(cartItem.selectedOptions)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.promoWrapper}>
              <div className={styles.promoInputRow}>
                <div className={styles.promoInput}>
                  <Input
                    maxLength={8}
                    placeholder={t('Discount code or gift card')}
                    {...register('promocode')}
                  />
                </div>
                <Button
                  variant="light"
                  className={styles.promoButton}
                  type="button"
                  onClick={handleApplyPromo}
                >
                  <p>{t('Apply')}</p>
                </Button>
              </div>
              <div className={styles.promoTextContainer}>
                <p className="body-l">
                  {t(
                    'If you want to avail the Buy 2 Get 1 Discount offer; applying another code will mean losing the free gift. Thanks',
                  )}
                </p>
              </div>
            </div>
            <div className={styles.totalsContainer}>
              <div className={styles.totalsRow}>
                <p className="body-l">{t('Subtotal')}</p>
                <div className={styles.priceWrapper}>
                  <p className="body-bold-m text-secondary">₴</p>
                  <p className="body-bold-l text-secondary">
                    {cartSlice.cartSubtotal}
                  </p>
                </div>
              </div>
              {discountApplied && (
                <div className={styles.totalsRow}>
                  <p className="body-l">{t('Discount')}</p>
                  <div className={styles.priceWrapper}>
                    <p className="body-bold-m text-secondary">-₴</p>
                    <p className="body-bold-l text-secondary">
                      {discountAmount}
                    </p>
                  </div>
                </div>
              )}
              <div className={styles.totalsRow}>
                <p className="body-l">{t('Shipping')}</p>
                {isShippingEntered ? (
                  <div className={styles.priceWrapper}>
                    <p className="body-bold-m text-secondary">+₴</p>
                    <p className="body-bold-l text-secondary">{shippingCost}</p>
                  </div>
                ) : (
                  <p className="body-l text-secondary">
                    {t('Enter shipping address')}
                  </p>
                )}
              </div>
              <div className={styles.totalsRow}>
                <p className="body-bold-xl">{t('Total')}</p>
                <div className={styles.priceWrapper}>
                  <p className="body-bold-m">₴</p>
                  <p className="body-bold-xl">{finalTotal}</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Checkout;
