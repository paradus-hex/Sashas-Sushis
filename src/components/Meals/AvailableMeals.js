import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-order-app-a8939-default-rtdb.asia-southeast1.firebasedatabase.app/food-order-app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      const responseDta = await response.json();

      const loadedMeals = [];

      for (const key in responseDta) {
        console.log(key);
        loadedMeals.push({
          id: key,
          name: responseDta[key].name,
          description: responseDta[key].description,
          price: +responseDta[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error) => {
      setError(error.message);
      setIsLoading(false);
    });

    // return () => {
    //   cleanup;
    // };
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      foodName={meal.name}
      foodDescription={meal.description}
      foodPrice={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <h1 style={{ textAlign: "center" }}>LOADING...</h1>}
        {error && <h1 style={{ textAlign: "center" }}>{error}</h1>}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
