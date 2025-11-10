import { useState } from "react";
import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Header from "../Header";

import Header from "../Header";
import { CartContext } from "../context";
import PizzaOfTheDay from "../PizzaOfTheDay";

export const Route = createRootRoute({
    component: () => {
        return (
            <>
                <CartContext.Provider value={cartHook}>
                    <div>
                        <Header />
                        <Outlet />
                        <PizzaOfTheDay />
                    </div>
                </CartContext.Provider>
                <TanStackRouterDevtools />
            </>
        )
    }
})