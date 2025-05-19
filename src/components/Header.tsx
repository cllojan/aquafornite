'use client'

import { useEffect, useState } from "react";
import { SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { Icon } from "@iconify/react";
import { useSkinCart } from "@/hooks/useSkinCart";
import { useTheme } from "next-themes";
import {ShopCartBold} from "@/components/icons/ShopCartBold"
import {SunIcon} from "@/components/icons/SunIcon"
import {MoonIcon} from "@/components/icons/MoonIcon"

const Header = () => {

    const [theme, setTheme] = useState('dracula');
    const { user } = useUser();
    const { items, removeAll } = useSkinCart()    
    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', theme);
    }, [theme])
    return (
        <div className="navbar  shadow-sm pl-8 pr-8 z-3">
            <div className="flex-1 flex-row items-center">
                <p className="font-bold text-inherit">Aquafornais</p>
            </div>

            <div className="flex items-center">
                <label className="toggle toggle-lg text-base-content">
                    <input type="checkbox" onClick={() => setTheme(theme === "dracula" ? 'winter' : 'dracula')}/>
                    <SunIcon/>
                    <MoonIcon/>
                </label>
                <div className="drawer drawer-end">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle btn btn-ghost btn-circle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost">
                            
                                {
                                items.length === 0 
                                ?
                                <div className=" flex flex-row p-0">
                                    <Icon icon="solar:cart-large-2-outline" fontSize={28} /> 
                                </div>
                                 :
                                 <div className=" flex flex-row items-center">
                                    <ShopCartBold/>
                                    <span className="badge badge-sm badge-secondary">{items.length}</span>
                                </div>
                                 }
                                
                            
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
                                {items.map((item, inx) => (
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
                                                <div className="flex justify-between  font-medium ">
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
                            <button className="btn btn-success btn-block">Comprar<Icon icon="solar:wallet-money-bold" fontSize={25} /></button>
                            <input id="my-drawer-4" type="checkbox" className="drawer-toggle btn btn-ghost btn-circle" />

                        </div>

                    </div>
                </div>

                {
                    user ? <div className=" dropdown dropdown-end">
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
