import styles from './Home.module.css';
import { Trans, useTranslation } from 'react-i18next';
import LogoLight from '../../assets/logo-light.svg';
import LogoSlimLight from '../../assets/logo-slim-light.svg';
import HeroBoxer from '../../assets/home/hero-boxer.png';
import RDXBack from '../../assets/home/rdx-back.png';
import RDXFront from '../../assets/home/rdx-front.png';
import PromoBanner from '../../assets/home/promo-banner.png';
import Testimonial1 from '../../assets/home/testimonial-1.png';
import Testimonial2 from '../../assets/home/testimonial-2.png';
import Testimonial3 from '../../assets/home/testimonial-3.png';
import Testimonial4 from '../../assets/home/testimonial-4.png';
import { productService } from '../../services/products.service.ts';
import { useEffect, useRef, useState } from 'react';
import { getProductPreviewImg, prettifyCategory } from '../../utils';
import { Button } from '../../components/Button/Button.tsx';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { notify } from '../../utils';
import Accordion from '../../components/Accordion/Accordion.tsx';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard.tsx';
import { useCartSlice } from '../../store';
import { getProductById } from '../../db.ts';

type FormValues = {
  feedback: string;
};

const Home = () => {
  const { t, i18n } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, submitCount },
  } = useForm<FormValues>();

  const scrollRef = useRef<HTMLDivElement>(null);

  const allProducts = productService.getAll();
  const cartSlice = useCartSlice();

  const [randomProduct] = useState(() => {
    return allProducts[Math.floor(Math.random() * allProducts.length)];
  });

  const randomProductPreviewImg = getProductPreviewImg(randomProduct.id);

  const [bestSellers] = useState(() => {
    return [...allProducts].sort(() => Math.random() - 0.5).slice(0, 6);
  });

  const handleAddAllSetClick = () => {
    const gloves = getProductById('prod-012');
    cartSlice.addToCart({
      product: gloves,
      selectedOptions: {
        color: gloves.availableColors[0],
        size: gloves.availableSizes[0],
      },
    });

    const rashguard = getProductById('prod-013');
    cartSlice.addToCart({
      product: rashguard,
      selectedOptions: {
        color: rashguard.availableColors[0],
        size: rashguard.availableSizes[0],
      },
    });

    const shorts = getProductById('prod-014');
    cartSlice.addToCart({
      product: shorts,
      selectedOptions: {
        color: shorts.availableColors[0],
        size: shorts.availableSizes[0],
      },
    });

    notify.success(t('Added to cart!'));
  };

  const scroll = (direction: number) => {
    scrollRef.current?.scrollBy({ left: direction * 300, behavior: 'smooth' });
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    notify.success(t('Feedback sent!'));
    reset();
  };

  useEffect(() => {
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      notify.error(firstError.message as string);
    }
  }, [submitCount, errors]);

  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <img className={styles.heroBoxer} src={HeroBoxer} alt="" />
        <div className={styles.heroTextContainer}>
          <div className={styles.heroSloganContainer}>
            <div>
              <h1 className="text-title-hero-l">
                {t('Your gear')}
                <br />
                {t('Your level')}
                <br />
                {t('Your fight')}
              </h1>
              <h3 className="heading-l">
                {t('Choose gear that works with you')}
              </h3>
            </div>
            <div className={styles.heroDividerLine}></div>
            <div className={styles.heroSloganCardWrapper}>
              <div className={styles.card}>
                <div className={styles.productCardContentWrapper}>
                  <div className={styles.productCardImgWrapper}>
                    <img
                      src={randomProductPreviewImg.url}
                      alt={randomProductPreviewImg.alt}
                    />
                  </div>
                  <div className={styles.productCardContent}>
                    <div className={styles.productCardTextContainer}>
                      <p className="caption-l">
                        {prettifyCategory(t(randomProduct.category))}
                      </p>
                      <p className="button-l">
                        {i18n.language === 'ua'
                          ? randomProduct.nameUa
                          : randomProduct.name}
                      </p>
                      <p className="caption-l">{randomProduct.brand}</p>
                    </div>
                    <div className={styles.productCardButtonsContainer}>
                      <div
                        className={`${styles.productCardButton} ${styles.productCardButtonShop}`}
                      >
                        <Link
                          to={`/catalog/${randomProduct.slug}`}
                          className="button-m"
                        >
                          {t('Shop Now')}
                        </Link>
                      </div>
                      <Link to={`/catalog/${randomProduct.slug}`}>
                        <div className={styles.productCardButton}>
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.67171 2.02489C9.74209 1.6167 9.46824 1.22874 9.06005 1.15837L2.40819 0.0114938C2 -0.058884 1.61204 0.214968 1.54167 0.623159C1.47129 1.03135 1.74514 1.41931 2.15333 1.48968L8.06609 2.50913L7.04665 8.42189C6.97627 8.83008 7.25012 9.21803 7.65832 9.28841C8.06651 9.35879 8.45446 9.08494 8.52484 8.67675L9.67171 2.02489ZM0.432617 7.89746L0.86513 8.51019L9.36513 2.51019L8.93262 1.89746L8.50011 1.28474L0.000104815 7.28474L0.432617 7.89746Z"
                              fill="#23517A"
                            />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.heroParagraphWrapper}>
            <p className={styles.heroParagraph}>
              <Trans i18nKey="heroSubtitle">
                High-quality equipment for <b>MMA</b>, <b>boxing</b>, and{' '}
                <b>wrestling for athletes</b> who value <b>protection</b>,{' '}
                <b>comfort</b>, and the right choice without compromise.
              </Trans>
            </p>
            <div className={styles.heroLogosContainer}>
              <img src={LogoSlimLight} alt="" />
              <img src={LogoSlimLight} alt="" />
              <img src={LogoSlimLight} alt="" />
              <img src={LogoSlimLight} alt="" />
              <img src={LogoSlimLight} alt="" />
              <img src={LogoSlimLight} alt="" />
            </div>
            <div className={styles.heroDividerLine}></div>
            <div className={styles.ratingCardsWrapper}>
              <div className={styles.card}>
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 0C6.73762 -3.90978e-09 6.47781 0.0516797 6.2354 0.152089C5.99299 0.252498 5.77273 0.399669 5.5872 0.585201C5.40167 0.770732 5.2545 0.99099 5.15409 1.2334C5.05368 1.47581 5.002 1.73562 5.002 1.998C5.002 2.26038 5.05368 2.52019 5.15409 2.7626C5.2545 3.00501 5.40167 3.22527 5.5872 3.4108C5.77273 3.59633 5.99299 3.7435 6.2354 3.84391C6.47781 3.94432 6.73762 3.996 7 3.996C7.5299 3.996 8.0381 3.7855 8.4128 3.4108C8.7875 3.0361 8.998 2.5279 8.998 1.998C8.998 1.4681 8.7875 0.959898 8.4128 0.585201C8.0381 0.210503 7.5299 0 7 0ZM11.5 0.998C11.1022 0.998 10.7206 1.15604 10.4393 1.43734C10.158 1.71864 10 2.10018 10 2.498C10 2.89582 10.158 3.27736 10.4393 3.55866C10.7206 3.83996 11.1022 3.998 11.5 3.998C11.8978 3.998 12.2794 3.83996 12.5607 3.55866C12.842 3.27736 13 2.89582 13 2.498C13 2.10018 12.842 1.71864 12.5607 1.43734C12.2794 1.15604 11.8978 0.998 11.5 0.998ZM2.5 0.998C2.10218 0.998 1.72064 1.15604 1.43934 1.43734C1.15804 1.71864 1 2.10018 1 2.498C1 2.89582 1.15804 3.27736 1.43934 3.55866C1.72064 3.83996 2.10218 3.998 2.5 3.998C2.89783 3.998 3.27936 3.83996 3.56066 3.55866C3.84197 3.27736 4 2.89582 4 2.498C4 2.10018 3.84197 1.71864 3.56066 1.43734C3.27936 1.15604 2.89783 0.998 2.5 0.998ZM4 5.991C4.00185 5.727 4.10802 5.47444 4.29536 5.28841C4.48269 5.10239 4.73599 4.99799 5 4.998H9C9.26522 4.998 9.51957 5.10336 9.70711 5.29089C9.89464 5.47843 10 5.73278 10 5.998V8.998C10.0003 9.31275 9.95099 9.62557 9.854 9.925C9.63257 10.6037 9.17644 11.1812 8.56751 11.5539C7.95859 11.9266 7.23675 12.0699 6.53163 11.9583C5.8265 11.8466 5.18428 11.4872 4.72028 10.9447C4.25628 10.4021 4.0009 9.71191 4 8.998V5.991ZM3 5.998C3 5.633 3.097 5.292 3.268 4.998H1C0.734784 4.998 0.48043 5.10336 0.292893 5.29089C0.105357 5.47843 1.38413e-07 5.73278 1.38413e-07 5.998V8.498C-0.000136048 8.9073 0.100226 9.31038 0.292273 9.67184C0.48432 10.0333 0.762177 10.3421 1.10144 10.571C1.44071 10.8 1.831 10.9422 2.23806 10.9851C2.64511 11.028 3.05646 10.9702 3.436 10.817C3.14879 10.2533 2.99937 9.62961 3 8.997V5.998ZM11 5.998V8.998C11 9.653 10.843 10.271 10.564 10.817C10.9435 10.9702 11.3549 11.028 11.7619 10.9851C12.169 10.9422 12.5593 10.8 12.8986 10.571C13.2378 10.3421 13.5157 10.0333 13.7077 9.67184C13.8998 9.31038 14.0001 8.9073 14 8.498V5.998C14 5.73278 13.8946 5.47843 13.7071 5.29089C13.5196 5.10336 13.2652 4.998 13 4.998H10.732C10.902 5.292 11 5.633 11 5.998Z"
                    fill="white"
                  />
                </svg>
                <div className={styles.ratingCardContent}>
                  <p className="text-title-hero-s">100+</p>
                  <p className="caption-l">Satisfied customers</p>
                </div>
              </div>
              <div className={styles.card}>
                <svg
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.40459 0.431666C6.48113 0.300323 6.59077 0.191345 6.72257 0.115602C6.85438 0.0398594 7.00374 0 7.15575 0C7.30777 0 7.45713 0.0398594 7.58893 0.115602C7.72074 0.191345 7.83038 0.300323 7.90692 0.431666L9.8509 3.76878L13.6262 4.58672C13.7747 4.61899 13.9122 4.68962 14.0248 4.79157C14.1375 4.89352 14.2215 5.02323 14.2685 5.16777C14.3154 5.31231 14.3236 5.46663 14.2923 5.61534C14.2611 5.76405 14.1913 5.90196 14.0901 6.01532L11.5167 8.89548L11.9062 12.7382C11.9215 12.8896 11.8969 13.0423 11.8348 13.1811C11.7727 13.3199 11.6753 13.44 11.5522 13.5294C11.4292 13.6188 11.2848 13.6744 11.1336 13.6906C10.9824 13.7067 10.8296 13.6829 10.6904 13.6216L7.15575 12.0636L3.62111 13.6216C3.48195 13.6829 3.32912 13.7067 3.17789 13.6906C3.02666 13.6744 2.88231 13.6188 2.75927 13.5294C2.63622 13.44 2.53878 13.3199 2.47667 13.1811C2.41457 13.0423 2.38997 12.8896 2.40534 12.7382L2.79483 8.89548L0.221395 6.01602C0.120007 5.90266 0.0501267 5.7647 0.0187297 5.61589C-0.0126673 5.46709 -0.00448227 5.31265 0.0424678 5.168C0.0894178 5.02335 0.17349 4.89355 0.286292 4.79155C0.399093 4.68955 0.536677 4.61892 0.685309 4.58672L4.4606 3.76878L6.40459 0.431666Z"
                    fill="white"
                  />
                </svg>
                <div className={styles.ratingCardContent}>
                  <p className="text-title-hero-s">4.8</p>
                  <p className="caption-l">Average rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="best-sellers" className={styles.bestSellersSection}>
        <p className="body-l">{t('Products')}</p>
        <div className={styles.bestSellersNav}>
          <h2 className="title-page-l">{t('Best Sellers')}</h2>
          <div className={styles.bestSellersControlsWrapper}>
            <div
              className={styles.bestSellersControlButton}
              onClick={() => scroll(-1)}
            >
              <svg
                width="25"
                height="8"
                viewBox="0 0 25 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.146446 4.03519C-0.0488148 3.83993 -0.0488148 3.52335 0.146446 3.32809L3.32843 0.146107C3.52369 -0.0491555 3.84027 -0.0491555 4.03553 0.146107C4.2308 0.341369 4.2308 0.657951 4.03553 0.853214L1.20711 3.68164L4.03553 6.51007C4.2308 6.70533 4.2308 7.02191 4.03553 7.21717C3.84027 7.41244 3.52369 7.41244 3.32843 7.21717L0.146446 4.03519ZM24.5 3.68164V4.18164H0.5V3.68164V3.18164H24.5V3.68164Z"
                  fill="black"
                />
              </svg>
            </div>
            <div
              className={styles.bestSellersControlButton}
              onClick={() => scroll(1)}
            >
              <svg
                width="25"
                height="8"
                viewBox="0 0 25 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.3536 4.03519C24.5488 3.83993 24.5488 3.52335 24.3536 3.32809L21.1716 0.146107C20.9763 -0.0491555 20.6597 -0.0491555 20.4645 0.146107C20.2692 0.341369 20.2692 0.657951 20.4645 0.853214L23.2929 3.68164L20.4645 6.51007C20.2692 6.70533 20.2692 7.02191 20.4645 7.21717C20.6597 7.41244 20.9763 7.41244 21.1716 7.21717L24.3536 4.03519ZM0 3.68164V4.18164H24V3.68164V3.18164H0V3.68164Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className={styles.productsContainer} ref={scrollRef}>
          {bestSellers.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              animationDelay={i * 70}
              className={styles.bestSellerCard}
            />
          ))}
        </div>
      </section>
      <section className={styles.setSection}>
        <img className={styles.setFront} src={RDXFront} alt="" />
        <div className={styles.setSectionContent}>
          <div className={styles.setTextContainer}>
            <h2 className="text-title-hero-m">
              {t('Your complete training kit')}
            </h2>
            <p className="body-l">
              {t(
                'One complect. One style. One ready-to-go setup for serious training.',
              )}
            </p>
          </div>
          <Button variant="main" onClick={handleAddAllSetClick}>
            <p className="button-l">{t('Buy the Full Set')}</p>
          </Button>
        </div>
        <img className={styles.setBack} src={RDXBack} alt="" />
      </section>
      <section className={styles.reasonsSection}>
        <h2 className="title-page-l">
          <Trans i18nKey="heroSlogan">
            WHY PEOPLE TRUST
            <br />
            RAZDVA FIGHTSHOP
          </Trans>
        </h2>
        <div className={styles.reasonWrapper}>
          <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.7778 33.7778H4.22222V4.22222H25.3333V0H4.22222C1.87889 0 0 1.87889 0 4.22222V33.7778C0 34.8976 0.44484 35.9715 1.23666 36.7633C2.02848 37.5552 3.10242 38 4.22222 38H33.7778C34.8976 38 35.9715 37.5552 36.7633 36.7633C37.5552 35.9715 38 34.8976 38 33.7778V16.8889H33.7778M10.3656 14.9467L7.38889 17.9444L16.8889 27.4444L38 6.33333L35.0233 3.33556L16.8889 21.47L10.3656 14.9467Z"
              fill="black"
            />
          </svg>
          <div className={styles.reasonTextContainer}>
            <h3 className="body-bold-l">{t('ORIGINAL PRODUCTS')}</h3>
            <p className="body-l">
              {t(
                'A specialized selection of original fight gear sourced for MMA, boxing, and wrestling.',
              )}
            </p>
          </div>
        </div>
        <div className={styles.reasonWrapper}>
          <svg
            width="32"
            height="39"
            viewBox="0 0 32 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.4286 14.5562C27.4286 17.9603 25.6343 20.9817 22.848 22.8803L25.5909 26.2074C27.5819 24.8529 29.1981 23.0944 30.3107 21.0717C31.4233 19.049 32.0018 16.818 32 14.5562H27.4286ZM16 4.15891C19.031 4.15891 21.9379 5.25434 24.0812 7.20421C26.2245 9.15408 27.4286 11.7987 27.4286 14.5562H32C32 10.6957 30.3143 6.99323 27.3137 4.26341C24.3131 1.5336 20.2435 0 16 0V4.15891ZM4.57143 14.5562C4.57143 11.7987 5.77551 9.15408 7.91878 7.20421C10.0621 5.25434 12.969 4.15891 16 4.15891V0C11.7565 0 7.68688 1.5336 4.68629 4.26341C1.68571 6.99323 4.10063e-06 10.6957 4.10063e-06 14.5562H4.57143ZM9.152 22.8803C7.72869 21.9132 6.57337 20.6569 5.77811 19.2118C4.98285 17.7666 4.56965 16.1724 4.57143 14.5562H4.10063e-06C-0.00177697 16.818 0.576661 19.049 1.6893 21.0717C2.80194 23.0944 4.41808 24.8529 6.40915 26.2074L9.152 22.8803ZM13.7074 34.8164C13.6349 31.6456 12.9149 28.5148 11.584 25.5836L7.36 27.1743C8.47086 29.6219 9.07657 32.242 9.13829 34.9037L13.7074 34.8164ZM19.0674 33.7101C18.1151 34.1434 17.0648 34.3691 16 34.3691C14.9352 34.3691 13.8849 34.1434 12.9326 33.7101L10.8891 37.4302C12.476 38.152 14.2258 38.5278 16 38.5278C17.7742 38.5278 19.524 38.152 21.1109 37.4302L19.0674 33.7101ZM20.416 25.5856C19.0846 28.5161 18.3638 31.6462 18.2903 34.8164L22.8617 34.9037C22.9234 32.242 23.5291 29.6219 24.64 27.1743L20.416 25.5856ZM21.1109 37.4302C21.6279 37.194 22.0642 36.8339 22.3728 36.3886C22.6813 35.9434 22.8504 35.4299 22.8617 34.9037L18.2903 34.8164C18.2966 34.585 18.3723 34.3596 18.5093 34.1646C18.6463 33.9696 18.8393 33.8124 19.0674 33.7101L21.1109 37.4302ZM9.13829 34.9037C9.16115 35.9517 9.81029 36.9395 10.8891 37.4302L12.9326 33.7101C13.1607 33.8124 13.3537 33.9696 13.4907 34.1646C13.6277 34.3596 13.7034 34.585 13.7097 34.8164L9.13829 34.9037ZM6.40915 26.2074C6.752 26.4445 6.95543 26.5817 7.09714 26.6857C7.24114 26.7938 7.21372 26.7896 7.14972 26.7148L10.7611 24.1654C10.3337 23.6621 9.67086 23.2338 9.152 22.8803L6.40915 26.2074ZM11.584 25.5836C11.4057 25.1905 11.1794 24.654 10.7611 24.1654L7.14972 26.7148C7.12 26.6774 7.11315 26.6586 7.14286 26.7148L7.22286 26.877L7.36 27.1743L11.584 25.5836ZM22.848 22.8803C22.3291 23.2338 21.664 23.6642 21.2366 24.1654L24.8503 26.7148C24.7886 26.7876 24.7589 26.7938 24.9029 26.6878C25.0446 26.5817 25.2457 26.4445 25.5909 26.2095L22.848 22.8803ZM24.64 27.1743L24.7771 26.877L24.8571 26.7148C24.8869 26.6586 24.88 26.6774 24.8503 26.7148L21.2366 24.1654C20.8183 24.6561 20.5943 25.1905 20.416 25.5856L24.64 27.1743Z"
              fill="black"
            />
            <path
              d="M22.8379 27.0332C20.8142 28.2652 18.434 28.9229 15.999 28.9229C13.564 28.9229 11.1839 28.2652 9.16016 27.0332"
              stroke="black"
              stroke-width="2"
            />
          </svg>
          <div className={styles.reasonTextContainer}>
            <h3 className="body-bold-l">{t('SMARTER CHOICE')}</h3>
            <p className="body-l">
              {t(
                'Our range is built to help athletes find the right equipment without guesswork.',
              )}
            </p>
          </div>
        </div>
        <div className={styles.reasonWrapper}>
          <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.44264 10.0489V27.9722H17.0541L18.3205 26.0511C20.7689 22.2722 25.1802 20.5833 28.4306 20.5833C29.5493 20.5833 30.4991 20.7733 31.2167 21.1111C33.1374 21.9767 33.665 23.6022 33.7706 24.7844C33.9394 27.17 32.7152 29.6189 30.6046 31.0544C28.705 32.3633 24.146 33.7778 18.7216 33.7778C15.0279 33.7778 9.73015 33.1233 4.4746 30.1889C5.08669 25.0167 6.33198 16.6356 8.44264 10.0489ZM8.44264 0C2.11066 8.63445 0 32.3844 0 32.3844C6.12092 36.5433 12.8328 38 18.7216 38C25.0324 38 30.3724 36.3322 33.0107 34.5378C39.3427 30.2311 39.9759 20.4989 33.0107 17.2689C31.6599 16.6567 30.098 16.3611 28.4306 16.3611C23.5761 16.3611 17.9406 18.9156 14.7746 23.75H12.664V8.63445H16.8853L18.9959 2.11111L8.44264 0Z"
              fill="black"
            />
          </svg>
          <div className={styles.reasonTextContainer}>
            <h3 className="body-bold-l">{t('SERIOUS TRAINING FOCUS')}</h3>
            <p className="body-l">
              {t(
                'We focus on gear that supports comfort, protection, and performance in every session.',
              )}
            </p>
          </div>
        </div>
      </section>
      <section className={styles.promoSection}>
        <img src={PromoBanner} alt="" />
        <div className={styles.promoContentWrapper}>
          <div className={styles.promoTextWrapper}>
            <h2 className="text-title-hero-l">{t('10 % OFF')}</h2>
            <span className={styles.promoText}>
              <b>{t('Promo code:')}</b> udar
            </span>
          </div>
          <img className={styles.promoLogo} src={LogoLight} alt="" />
        </div>
      </section>
      <section id="reviews" className={styles.testimonialsSection}>
        <div>
          <p className="body-l">{t('Reviews')}</p>
          <h2 className="title-page-l">{t('Our customers speak')}</h2>
        </div>
        <div className={styles.testimonialsContainer}>
          <div className={styles.testimonial}>
            <p className={styles.testimonialSign}>“</p>
            <div className={styles.testimonialContent}>
              <p className="body-l">
                {t(
                  'I’m very happy with the gloves  the fit is perfect and training in them feels great.',
                )}
              </p>
              <div className={styles.testimonialAuthorContainer}>
                <img src={Testimonial1} alt="" />
                <p className="body-m">{t('Andrii Misiuk')}</p>
              </div>
            </div>
          </div>
          <div className={styles.testimonial}>
            <p className={styles.testimonialSign}>“</p>
            <div className={styles.testimonialContent}>
              <p className="body-l">
                {t(
                  'Everything was exactly right. My order was shipped the same day, and the gloves are excellent.',
                )}
              </p>
              <div className={styles.testimonialAuthorContainer}>
                <img src={Testimonial2} alt="" />
                <p className="body-m">{t('Bohdan Trainych')}</p>
              </div>
            </div>
          </div>
          <div className={styles.testimonial}>
            <p className={styles.testimonialSign}>“</p>
            <div className={styles.testimonialContent}>
              <p className="body-l">
                {t(
                  'Highly recommend RazDva Fightshop great prices, quality service, and fast delivery.',
                )}
              </p>
              <div className={styles.testimonialAuthorContainer}>
                <img src={Testimonial3} alt="" />
                <p className="body-m">{t('Chaika')}</p>
              </div>
            </div>
          </div>
          <div className={styles.testimonial}>
            <p className={styles.testimonialSign}>“</p>
            <div className={styles.testimonialContent}>
              <p className="body-l">
                {t(
                  'Everything is great. Thank you, and best of luck with your sales!',
                )}
              </p>
              <div className={styles.testimonialAuthorContainer}>
                <img src={Testimonial4} alt="" />
                <p className="body-m">{t('Ivan Poremchuk')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.feedbackWrapper}>
          <div className={styles.feedbackTextWrapper}>
            <h3 className="title-page-m">
              <Trans i18nKey="experienceTitle">
                Tell Us About
                <br />
                Your Experience
              </Trans>
            </h3>
            <p className="text-secondary">{t('Leave Your Comment')}</p>
          </div>
          <form
            className={styles.feedbackInputWrapper}
            onSubmit={handleSubmit(onSubmit)}
          >
            <textarea
              className={styles.feedbackInput}
              {...register('feedback', {
                required: 'Feedback is required',
                minLength: {
                  value: 10,
                  message: 'At least 10 characters',
                },
              })}
            ></textarea>
            <button className={styles.feedbackButton}>
              <p className="button-l">SEND</p>
            </button>
          </form>
        </div>
      </section>
      <section id="faq" className={styles.faqSection}>
        <h2 className={styles.faqTitle}>{t('FAQs')}</h2>
        <div className={styles.faqHeaderContainer}>
          <p className={styles.faqText}>
            <Trans i18nKey="faqText">
              Everything you may need to know about
              <br />
              ordering, delivery, products, and customer
              <br />
              support. Can’t find what you’re looking for?
            </Trans>
          </p>
          <Button variant="main">
            <p className="button-l">{t('Contact our team')}</p>
          </Button>
        </div>
        <div className={styles.faqsContainer}>
          <Accordion
            index={1}
            question={t('Do you sell original products?')}
            answer={t(
              'Yes, we focus on original fight gear for MMA, boxing, and wrestling. Our selection is built around quality, authenticity, and equipment that meets real training needs.',
            )}
          />
          <Accordion
            index={2}
            question={t('How do I choose the right size?')}
            answer={t(
              'Sizing may vary depending on the product type and brand. If you are unsure, contact us before ordering and we will help you choose the right option.',
            )}
          />
          <Accordion
            index={3}
            question={t('How fast do you ship orders?')}
            answer={t(
              'We aim to process and ship orders as quickly as possible. In many cases, orders are dispatched the same day or within a short time after confirmation.',
            )}
          />
          <Accordion
            index={4}
            question={t('Can I ask for help before placing an order?')}
            answer={t(
              'Yes. If you are not sure which gloves, apparel, or protection you need, you can contact us and we will help you choose the most suitable option.',
            )}
          />
          <Accordion
            index={5}
            question={t('Do you offer delivery across Ukraine?')}
            answer={t(
              'Yes, we provide delivery for customers across Ukraine. Shipping details and timing may depend on your location and the delivery service.',
            )}
          />
          <Accordion
            index={6}
            question={t('What if the product does not fit?')}
            answer={t(
              'If there is a problem with sizing, fit, or the order itself, contact us and we will help resolve the issue as quickly as possible.',
            )}
          />
          <Accordion
            index={7}
            question={t('What types of gear do you offer?')}
            answer={t(
              'We offer equipment and apparel for MMA, boxing, and wrestling, including gloves, rashguards, shorts, protection, and accessories.',
            )}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
