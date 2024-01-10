import classes from './Checkout.module.css';
import { useRef,useState } from 'react';

const isEmpty = value => value.trim()==='';

const isFiveChars = value => value.trim().length===5;

const Checkout = (props) => {
  const [formInputsValidity,setFormInputsValidity]=useState({
    name:true,
    street:true,
    city:true,
    postalCode:true,
  });

  const name=useRef();
  const street=useRef();
  const postal=useRef();
  const city=useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    console.log(event);
    console.log(event.target[0].value);
    const enteredName=name.current.value;
    const enteredStreet=street.current.value;
    const enteredPostal=postal.current.value;
    const enteredCity=city.current.value;

    const enteredNameIsValid=!isEmpty(enteredName);
    const enteredStreetIsValid=!isEmpty(enteredStreet);
    const enteredCityIsValid=!isEmpty(enteredCity);
    const enteredPostalIsValid=isFiveChars(enteredPostal);

    setFormInputsValidity({
        name:enteredNameIsValid,
        street:enteredStreetIsValid,
        city:enteredCityIsValid,
        postalCode:enteredPostalIsValid,
    })

    const formIsValid=enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid;
    if(!formIsValid){
        return;
    }
    const details={
        name:name.current.value.trim(),
        street:street.current.value.trim(),
        postal:postal.current.value.trim(),
        city:city.current.value.trim(),
    }
    props.onConfirm(details);
  };

  const nameControlClasses=`${classes.control} ${formInputsValidity.name ? '':classes.invalid}`;
  const streetControlClasses=`${classes.control} ${formInputsValidity.street ? '':classes.invalid}`;
  const postalControlClasses=`${classes.control} ${formInputsValidity.postalCode ? '':classes.invalid}`;
  const cityControlClasses=`${classes.control} ${formInputsValidity.city ? '':classes.invalid}`;
  
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={name}/>
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={street}/>
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postal}/>
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code (5 letters long)!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={city}/>
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;