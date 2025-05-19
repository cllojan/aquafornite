'use client'

import { useState } from "react";
import { SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { Icon } from "@iconify/react";
import { useSkinCart } from "@/hooks/useSkinCart";
export const AcmeLogo = () => {


    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};
const Header = () => {
    const [cartItems, setCartItems] = useState(3);
    const { user } = useUser();
    const { items, removeAll } = useSkinCart()
    return (
        <div
            className="navbar bg-base-100 shadow-sm pl-8 pr-8"
        >

            <div className="flex-1 flex-row items-center">

                <p className="font-bold text-inherit">Aquafornite</p>
            </div>


            <div className="flex">
                <div className="drawer drawer-end">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle btn btn-ghost btn-circle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                                <span className="badge badge-sm indicator-item">{items.length}</span>
                            </div>
                        </label>
                    </div>
                    <div className="drawer-side z-100">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                            {/* Sidebar content here */}
                            <div className="flex items-center mb-10">
                                <h1 className="flex-1 text-lg">Carrito de compras</h1>
                                <div className="drawer-content">
                                    {/* Page content here */}
                                    <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost">
                                        <Icon icon="solar:exit-bold" fontSize={25} />
                                    </label>
                                </div>
                            </div>
                            <div className="flex w-full flex-col">
                                {items.map((item,inx) => (
                                    <div className="" key={inx}>
                                        <div className="w-full flex flex-row ">
                                            <div
                                            className="size-24 shrink-0 overflow-hidden rounded-md "
                                            style={{
                                                background: item.colors.color1,
                                                backgroundImage: `linear-gradient(180deg, ${item.colors.color1} 0%, ${item.colors.color2} 50%, ${item.colors.color3})`
                                            }}
                                            >
                                                <img className="size-full object-cover" src={item.displayAssets[0].url} alt="" />
                                            </div>
                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div className="flex justify-between text-bae font-medium text-white">
                                                    <h3 >{item.displayName}</h3>
                                                    <p className="ml-4">$90.00</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <p className="text-gray-500"></p>
                                                    <span><Icon icon="solar:trash-bin-2-bold" fontSize={25} /></span>
                                                </div>
                                            </div>

                                        </div>
                                        <div className=" divider"></div>
                                    </div>
                                ))}

                            </div>

                            <span className="text-lg font-bold">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <button className="btn btn-primary btn-block">Comprar<Icon icon="solar:wallet-money-bold" fontSize={25} /></button>
                            <input id="my-drawer-4" type="checkbox" className="drawer-toggle btn btn-ghost btn-circle" />

                        </div>

                    </div>
                </div>

                {
                    user ? <div className="ml-5 dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between" href="/user">
                                    Perfil
                                </a>
                            </li>
                            <li><SignOutButton >
                                Cerrar Sesion
                            </SignOutButton >
                            </li>
                        </ul>
                    </div> :
                        <div className="ml-5 dropdown dropdown-end">
                            <a href="/sign-in"><button className="btn btn-primary">Iniciar Sesion  <Icon icon="solar:arrow-right-linear" /></button></a>
                        </div>
                }

            </div>

        </div>
    );
};

export default Header;
