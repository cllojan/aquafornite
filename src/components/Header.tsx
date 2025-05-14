'use client'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem

} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button, ButtonGroup } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Icon } from "@iconify/react";
import { useState } from "react";


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
    return (
        <Navbar 
        shouldHideOnScroll 
        isBordered 
        classNames={{
            
        }}
        >
            <NavbarContent>

                <NavbarBrand >
                    <AcmeLogo />
                    <p className="font-bold text-inherit">ACME</p>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent justify="end">

                <NavbarItem>
                    <Badge content={cartItems} color="primary" size="lg">
                        <Button
                            isIconOnly
                            variant="light"
                            aria-label="Shopping Cart"
                            className="text-default-600"
                        >
                            <Icon icon="solar:cart-large-2-bold" width={30} />
                        </Button>
                    </Badge>
                </NavbarItem>
                
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="solid" radius="full">
                        Iniciar sesión
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default Header;
