'use client'

import { useEffect, useState } from "react";
import { SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { Icon } from "@iconify/react";
import { useSkinCart } from "@/hooks/useSkinCart";
import { ShopCartBold } from "@/components/icons/ShopCartBold"
import { saveHistory } from "@/utils/supabase/history";

import {loadStripe} from "@stripe/stripe-js"
import Image from "next/image";


const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY as string)
const Header = () => {

    const [theme, setTheme] = useState('corporate');
    const { user } = useUser();
    const { items, removeAll, removeItem } = useSkinCart()
    const skins = items.map(skin => skin.discount)
    const total = skins.reduce((total, price) => total + price, 0)
    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', theme);
    }, [theme])
    const handlesave = async () => {
        try {
            await saveHistory()
            alert("aaa");
        } catch (e) {
            console.log(e);
        }
    }
    console.log(items)
    const handlePay = async () => {
        const stripe = await stripePromise;
        const formatedItems = items.map(item => ({
            name: item.displayName,
            price: item.discount,
            images: item.displayAssets[0].url,
            quantity: 1,
        }))
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: formatedItems,
            }),
        })
        const { url } = await response.json();
        window.location.href = url
    }
    return (
        <div className="navbar  shadow-sm pl-8 pr-8 z-3">
            <div className="flex-1 flex-row items-center justify-center mt-2">
                <Image src={"/images/img.png"} alt="icon" width={150} height={50} />
            </div>

            <div className="flex items-center">
                <div className="drawer drawer-end">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle btn btn-ghost btn-circle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-4" className="drawer-button border-none btn btn-ghost hover:bg-transparent hover:border-none ">

                            {
                                items.length === 0
                                    ?
                                    <div className=" flex flex-row ">
                                        <Icon icon="solar:cart-large-2-outline" fontSize={28} />
                                    </div>
                                    :
                                    <div className=" flex flex-row items-center">
                                        <ShopCartBold />
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
                                {
                                    items.length === 0
                                        ?
                                        (<div className="flex flex-col justify-center gap-7 items-center">
                                            <Icon icon="bi:cart-x" fontSize={75} />
                                            <h1 className="text-lg text-center">Carrito de compras <span className="text-error text-center text-bold">vacio!</span></h1>
                                            <p className="text-center">Agrega algunos productos antes de proceder con la compra </p>
                                        </div>) :
                                        items.map((item, inx) => (
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
                                                            <p className="ml-4">{item.discount}</p>
                                                        </div>
                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                            <p className="text-gray-500"></p>
                                                            <span className="group cursor-pointer" onClick={e => removeItem(item.mainId)}><Icon className="group-hover:text-error" icon="solar:trash-bin-2-bold" fontSize={25} /></span>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className=" divider"></div>
                                            </div>
                                        ))

                                }

                            </div>
                            {
                                items.length == 0 ? 
                                
                                    ''
                                    :
                                    (
                                        <>
                                        
                            <span className="text-lg font-bold">{items.length} skins</span>
                            <span className="text-info text-base ">Total: {total.toFixed(2)}</span>
                            <button className="mt-5 btn btn-success btn-block" onClick={handlePay}>Comprar<Icon icon="solar:wallet-money-bold" fontSize={25} /></button>
                            <input id="my-drawer-4" type="checkbox" className="drawer-toggle btn btn-ghost btn-circle" />
                            </>
                                    )
                                
                            }

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
                            <li>
                                <button
                                    onClick={() => setTheme(theme === 'corporate' ? 'dark' : 'corporate')}
                                >
                                    Dark/Light
                                </button>
                            </li>
                            <li><SignOutButton >
                                Cerrar Sesion
                            </SignOutButton >
                            </li>
                        </ul>
                    </div> :
                        <div className=" dropdown dropdown-end">
                            <SignInButton>
                                <button className="btn btn-primary m-0 p-0 w-30 ">
                                    Iniciar Sesión
                                </button>
                            </SignInButton>
                        </div>
                }

            </div>

        </div>
    );
};

export default Header;
