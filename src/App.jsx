import { createRoot } from "react-dom/client"
// import Order from "./order"
// import PizzaOfTheDay from "./PizzaOfTheDay"
// import Header from "./Header"
// import { CartContext } from "./context"
import { StrictMode, useState } from "react"

import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"

const router = createRouter({ routeTree })

const App = () => {
    return (
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    )
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)
