import { useContext, useEffect, useState } from "react"
import Pizza from "../Pizza"
import Cart from "../Cart"
import { CartContext } from "../context"

import { createLazyFileRoute } from "@tanstack/react-router"

const apiUrl = import.meta.env.VITE_API_URL;

export const Route = createLazyFileRoute("/order")({
    component: Order,
})

const kurs = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
})

export default function Order() {
    const [cart, setCart] = useContext(CartContext)

    const [pizzaType, setPizzaType] = useState("pepperoni")
    const [pizzaSize, setPizzaSize] = useState("M")

    const [pizzaTypes, setPizzaTypes] = useState([])
    const [loading, setLoading] = useState(true)

    // const [cart, setCart] = useState([])

    let price, selectedPizza
    if (!loading) {
        selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id)
        price = kurs.format(
            selectedPizza.sizes ? selectedPizza.sizes[pizzaSize] : "",
        )
    }

    useEffect(() => {
        fetchPizzaTypes()
    }, [])

    async function fetchPizzaTypes() {
        await new Promise((resolve) => setTimeout(resolve, 3000))
        const response = await fetch(`${apiUrl}/api/pizzas`)
        const json = await response.json()
        // await console.log(json)
        setPizzaTypes(json)
        setLoading(false)
    }

    async function checkout() {
        setLoading(false)
        await fetch(`${apiUrl}/api/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cart,
            }),
        })

        setCart([])
        setLoading(false)
    }

    return (
        <div className="order">
            <h2>Create Order</h2>
            <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setCart([
                    ...cart,
                    { pizza: selectedPizza, size: pizzaSize, price: price },
                  ])
                }}
            >
                <div>
                    <div>
                        <label htmlFor="pizza-type">Pizza Type</label>
                        <select
                            name="pizza-type"
                            value={pizzaType}
                            onChange={(e) => setPizzaType(e.target.value)}
                            onBlur={(e) => setPizzaType(e.target.value)}
                        >
                            {pizzaTypes.map((pizza) => (
                                <option value={pizza.id} key={pizza.id}>
                                    {pizza.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="pizza-size">Pizza Size</label>
                        <div>
                            <span>
                                <input
                                    type="radio"
                                    name="pizza-size"
                                    id="pizza-s"
                                    value="S"
                                    checked={pizzaSize === "S"}
                                    onChange={(e) => {
                                        setPizzaSize(e.target.value)
                                    }}
                                />
                                <label htmlFor="pizza-s">Small</label>
                            </span>
                            <span>
                                <input
                                    type="radio"
                                    name="pizza-size"
                                    id="pizza-m"
                                    value="M"
                                    checked={pizzaSize === "M"}
                                    onChange={(e) => {
                                        setPizzaSize(e.target.value)
                                    }}
                                />
                                <label htmlFor="pizza-m">Medium</label>
                            </span>
                            <span>
                                <input
                                    type="radio"
                                    name="pizza-size"
                                    id="pizza-l"
                                    value="L"
                                    checked={pizzaSize === "L"}
                                    onChange={(e) => {
                                        setPizzaSize(e.target.value)
                                    }}
                                />
                                <label htmlFor="pizza-l">Large</label>
                            </span>
                        </div>
                    </div>
                    <button type="submit">Tambahkan ke keranjang</button>
                </div>
                {loading ? (
                    <h3>Loading ...</h3>
                ) : (
                    <div className="order-pizza">
                        <Pizza
                            name={selectedPizza.name}
                            description={selectedPizza.description}
                            image={selectedPizza.image}
                        />
                        <p>{price}</p>
                    </div>
                )}
            </form>
            {loading ? (
                <h2>Loading ...</h2>
            ) : (
                <Cart checkout={checkout} cart={cart} />
            )}
        </div>
    )
}
