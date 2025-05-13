import { Listbox } from '@headlessui/react'
import { useState } from 'react';

interface CustomProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;

}

export const Select: React.FC<CustomProps> = ({ className, children, ...props }) => {

    return (
        <select></select>
    )
}
