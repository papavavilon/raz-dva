import styles from './Product.module.css';
import { useParams } from 'react-router-dom';
import { getProductBySlug } from '../../db.ts';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button/Button.tsx';
import type { ProductColor, SizeOption, WeightOz } from '../../types';
import { Controller, useForm } from 'react-hook-form';
import Select from '../../components/Select/Select.tsx';
import { notify } from '../../utils/notify.ts';
import { useCartSlice, useFavouritesSlice, useUserSlice } from '../../store';
import toTitleCase from '../../utils/toTitleCase.ts';
import { getProductImages } from '../../utils';

type FormValues = {
  color?: ProductColor;
  size?: SizeOption;
  weight?: WeightOz;
};

const Product = () => {
  const { slug } = useParams();
  const { t } = useTranslation();

  const cartSlice = useCartSlice();
  const userSlice = useUserSlice();
  const favouriteSlice = useFavouritesSlice();

  const product = getProductBySlug(slug ?? '');
  const isFavourite = favouriteSlice.isFavourite(product.id);

  const productImages = getProductImages(product.id);

  const isInCart = cartSlice.isInCart(product.id);

  const [currentImageIdx, setCurrentImageIdx] = useState<number>(0);

  const hasNextImage = currentImageIdx < productImages.length - 1;
  const hasPreviousImage = currentImageIdx > 0;

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      size: product.availableSizes[0] ?? null,
      color: product.availableColors[0] ?? null,
      weight: product.availableWeights?.[0],
    },
  });

  const canChangeSize = product.availableSizes.length > 0;
  const canChangeColor = product.availableColors.length > 0;
  const canChangeWeight = product.availableWeights
    ? product.availableWeights.length > 0
    : false;

  const handleNextImage = () => {
    setCurrentImageIdx(Math.min(currentImageIdx + 1, productImages.length - 1));
  };

  const handlePrevImage = () => {
    setCurrentImageIdx(Math.max(currentImageIdx - 1, 0));
  };

  const handleFavourite = () => {
    if (isFavourite) {
      favouriteSlice.removeFromFavourites(product.id);
      notify.success('Removed from favourites!');
    } else {
      favouriteSlice.addToFavourites(product.id);
      notify.success('Successfully added to favourites!');
    }
  };

  const onSubmit = (data: FormValues) => {
    if (!cartSlice.isInCart(product.id)) {
      cartSlice.addToCart({
        product,
        selectedOptions: data,
        quantity: 1,
      });
      notify.success('Successfully added to cart!');
      return;
    }
    notify.warning('Product already in cart!');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <div
          className={styles.sliderTrack}
          style={{ transform: `translateX(-${currentImageIdx * 100}%)` }}
        >
          {productImages.map((image, index) => (
            <img key={index} src={image.url} alt={image.alt} />
          ))}
        </div>
        {!!userSlice.user && (
          <button className={styles.favouriteButton} onClick={handleFavourite}>
            {isFavourite ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0004 17.6912L17.3671 10.3246C17.7929 9.89894 18.1307 9.39358 18.3612 8.83736C18.5917 8.28115 18.7103 7.68497 18.7103 7.0829C18.7103 6.48083 18.5917 5.88465 18.3612 5.32844C18.1307 4.77222 17.7929 4.26686 17.3671 3.84123C16.9415 3.41541 16.4361 3.07761 15.8799 2.84714C15.3237 2.61667 14.7275 2.49805 14.1254 2.49805C13.5234 2.49805 12.9272 2.61667 12.371 2.84714C11.8147 3.07761 11.3094 3.41541 10.8838 3.84123L10.0004 4.72457L9.11709 3.84123C8.25735 2.98149 7.09129 2.49849 5.87542 2.49849C4.65956 2.49849 3.4935 2.98149 2.63376 3.84123C1.77401 4.70098 1.29102 5.86704 1.29102 7.0829C1.29102 8.29876 1.77401 9.46482 2.63376 10.3246L10.0004 17.6912Z"
                  fill="#F5F5F5"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.3671 3.84123C16.9415 3.41541 16.4361 3.07761 15.8799 2.84714C15.3237 2.61667 14.7275 2.49805 14.1254 2.49805C13.5234 2.49805 12.9272 2.61667 12.371 2.84714C11.8147 3.07761 11.3094 3.41541 10.8838 3.84123L10.0004 4.72457L9.11709 3.84123C8.25735 2.98149 7.09129 2.49849 5.87542 2.49849C4.65956 2.49849 3.4935 2.98149 2.63376 3.84123C1.77401 4.70098 1.29102 5.86704 1.29102 7.0829C1.29102 8.29876 1.77401 9.46482 2.63376 10.3246L10.0004 17.6912L17.3671 10.3246C17.7929 9.89894 18.1307 9.39358 18.3612 8.83736C18.5917 8.28115 18.7103 7.68497 18.7103 7.0829C18.7103 6.48083 18.5917 5.88465 18.3612 5.32844C18.1307 4.77222 17.7929 4.26686 17.3671 3.84123Z"
                  stroke="#F5F5F5"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        )}
        <button
          className={`${styles.imageButton} ${styles.leftArrow} ${hasPreviousImage && styles.visible}`}
          onClick={handlePrevImage}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8337 10.0003H4.16699M4.16699 10.0003L10.0003 15.8337M4.16699 10.0003L10.0003 4.16699"
              stroke="#F5F5F5"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          className={`${styles.imageButton} ${styles.rightArrow} ${hasNextImage && styles.visible}`}
          onClick={handleNextImage}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.16602 10.0003H15.8327M15.8327 10.0003L9.99935 4.16699M15.8327 10.0003L9.99935 15.8337"
              stroke="#F5F5F5"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <form className={styles.productInfo} onSubmit={handleSubmit(onSubmit)}>
        <h1 className="title-page-l">{product.name}</h1>
        <div className={styles.priceWrapper}>
          <div className={styles.stockTag}>
            <p className="body-l">{t('In stock')}</p>
          </div>
          <div className={styles.priceContainer}>
            <p className="body-bold-24">₴</p>
            <p className="text-title-hero-l">{product.price}</p>
          </div>
        </div>
        <div className={styles.variantsContainer}>
          {canChangeSize && (
            <div className={styles.variantSelectContainer}>
              <p className="body-l">{t('Size')}</p>
              <Controller
                name="size"
                control={control}
                render={({ field }) => (
                  <Select
                    options={product.availableSizes}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    getLabel={(s) => s.label}
                    getValue={(s) => `${s.type}-${s.value}`}
                  />
                )}
              />
            </div>
          )}
          {canChangeColor && (
            <div className={styles.variantSelectContainer}>
              <p className="body-l">{t('Color')}</p>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <Select
                    options={product.availableColors}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    getLabel={(s) => toTitleCase(s)}
                  />
                )}
              />
            </div>
          )}
          {canChangeWeight && (
            <div className={styles.variantSelectContainer}>
              <p className="body-l">{t('Weight')}</p>
              <Controller
                name="weight"
                control={control}
                render={({ field }) => (
                  <Select
                    options={product.availableWeights ?? []}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    getLabel={(w) => `${w} oz`}
                    getValue={(w) => String(w)}
                  />
                )}
              />
            </div>
          )}
        </div>
        <Button
          variant={isInCart ? 'success' : 'secondary'}
          disabled={isInCart}
        >
          <p className="body-l">{isInCart ? t('In Cart') : t('Buy')}</p>
        </Button>
      </form>
    </div>
  );
};

export default Product;
