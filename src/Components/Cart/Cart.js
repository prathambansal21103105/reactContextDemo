import React,{ useState,useContext } from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart=(props)=>{
    const ctx=useContext(CartContext);
    const totalAmount=`$${ctx.totalAmount.toFixed(2)}`;
    const hasItems=ctx.items.length>0;
    const [showForm,setShowForm]=useState(false);
    const [isSubmitting,setIsSubmitting]=useState(false);
    const [didSubmit,setDidSubmit]=useState(false);

    const cartItemRemoveHandler=(id)=>{
        ctx.removeItem(id);
    };

    const cartItemAddHandler=(item)=>{
        ctx.addItem(item);
    };

    const orderHandler=()=>{
        setShowForm(true);
    }

    const fetchDetails=async(data)=>{
        setIsSubmitting(true);
        console.log("in cart side");
        console.log(data);
        await fetch('https://react-http-1df71-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:data,
                orderedItems:ctx.items,
            }),
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        ctx.clearCart();
    }

    const cartItems=
        <ul className={classes['cart-items']}>
            {ctx.items.map((item)=>(
                <CartItem 
                    key={item.id} 
                    name={item.name} 
                    amount={item.amount} 
                    price={item.price} 
                    onRemove={cartItemRemoveHandler.bind(null,item.id)} 
                    onAdd={cartItemAddHandler.bind(null,item)} 
                />
            ))}
        </ul>;
    const modalActions=
        <div className={classes.actions}>
            <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>;
    const cartModalContent=
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {showForm && <Checkout onCancel={props.onClose} onConfirm={fetchDetails}/>}
            {!showForm && modalActions}
        </React.Fragment>;
    const isSubmittingModalContent=<p>Sending order data...</p>;
    const didSubmitModalContent=<p>Successfully sent the order!</p>;
    return(
        <Modal onClick={props.onClose}>    
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {didSubmit && didSubmitModalContent}
        </Modal>
    );
}
export default Cart;