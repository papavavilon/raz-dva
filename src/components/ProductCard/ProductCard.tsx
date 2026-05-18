import { useNavigate } from 'react-router-dom';
import type { ProductCard as IProductCard } from '../../types';
import styles from './ProductCard.module.css';
import { getProductPreviewImg } from '../../utils';

interface ProductCardProps {
  product: IProductCard;
  animationDelay?: number;
  className?: string;
  onClick?: () => void;
}

const ProductCard = ({
  product,
  animationDelay = 0,
  className,
  onClick,
}: ProductCardProps) => {
  const navigate = useNavigate();

  const previewImg = getProductPreviewImg(product.id);

  const handleClick = () => {
    onClick?.();
    navigate('/catalog/' + product.slug);
  };

  return (
    <div
      className={`${styles.card}${className ? ` ${className}` : ''}`}
      style={{ animationDelay: `${animationDelay}ms` }}
      onClick={handleClick}
    >
      <div className={styles.imgWrap}>
        <img src={previewImg.url} alt={previewImg.alt} />
      </div>
      <div className={styles.info}>
        <p className="body-l">{product.name}</p>
        <p className="body-bold-l">₴{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
