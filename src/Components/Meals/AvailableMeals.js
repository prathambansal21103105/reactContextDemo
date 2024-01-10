import { useState,useEffect } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals=()=>{
  const [availableMeals,setAvailableMeals]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  const [httpError,setHttpError]=useState();
  useEffect(()=>{
    const fetchmeals=async()=>{
      const response=await fetch('https://react-http-1df71-default-rtdb.firebaseio.com/meals.json');
      if(!response.ok){
        throw new Error('Failed to fetch');
      }
      const data=await response.json();
      const meals=[];
      for(const key in data){
        meals.push(
          {
            id:key,
            name:data[key].name,
            description:data[key].description,
            price:data[key].price,
          }
        )
      }
      setAvailableMeals(meals);
      setIsLoading(false);
    };
    fetchmeals().catch(error=>{
      setIsLoading(false);
      setHttpError(error.message);
    });
  },[]);
    console.log("availableMeals",availableMeals);
    const mealsList = availableMeals.map((meal)=>(<MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price}/>));
    if(isLoading){
      return (
            <section className={classes.MealsLoading}>
              <p>Loading...</p>
            </section>
      );
    }
    if(httpError){
      return(
        <section className={classes.MealsError}>
          <p>{httpError}</p>
        </section>
      );
    }
    return (
      <section className={classes.meals}>
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      </section>
    );
};
export default AvailableMeals;