import { useContext} from 'react';
import './product-card.styles.scss'
import Button from '../button/button.component'
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({product}) => {
    const {name,price,imageUrl} = product;
    const {addItemToCart} = useContext(CartContext)

    const addProductToCart = () => { console.log("clic");addItemToCart(product)}

    return(<div className='product-card-container'>
        <img src={imageUrl} alt={`${name}`}>
        </img>
        <div className='footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <><Button buttonType='inverterd' onClick={addProductToCart}>Add to card</Button></>

    </div>);
}

export default ProductCard