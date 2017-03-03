import React from 'react';
import '../Products.scss';

export const ProductCard = ({ img, onClick}) => (
  <div className="productCard" onClick={() => onClick && onClick()}>
    <div>
      <img src={img}/>
    </div>
  </div>
);

ProductCard.propTypes = {
  img : React.PropTypes.string,
  onClick : React.PropTypes.func,
};

export default ProductCard;
