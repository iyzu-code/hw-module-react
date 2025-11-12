import { useEffect, useState } from "react";

export const usePizzaOfTheDay = () => {
    const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null)

    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        async function fetchPizzaOfTheDay() {
            const response = await fetch(`${apiUrl}api/pizza-of-the-day`)
            const pizza = await response.json()
            setPizzaOfTheDay(pizza)
        }

        fetchPizzaOfTheDay()
    }, [])

    return pizzaOfTheDay
}