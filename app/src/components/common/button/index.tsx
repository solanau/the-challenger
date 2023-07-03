import type { MouseEvent } from 'react';
import React from 'react';
import { IconType } from 'react-icons';
import { cn } from 'utils';
import Text from '../text';

type ButtonProps = {
    className?: string;
    disabled?: boolean;
    reversed?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    variant: 'black' | 'orange' | 'transparent' | 'danger' | 'label' | 'none' | 'purple';
    text?: string;
    icon?: IconType;
    children?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    tabIndex?: number;
};


const variants = {
    black: 'border-transparent bg-black',
    orange: 'border-transparent bg-primary text-black',
    transparent: 'text-white',
    danger: 'border-secondary text-danger hover:text-white hover:bg-secondary',
    label: 'text-secondary hover:text-white !p-0 border-none',
    purple: 'border-transparent bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white',
    none: '',
};


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            disabled = false,
            reversed = false,
            onClick,
            type = 'button',
            variant = 'black',
            text: value,
            children,
            tabIndex,
            icon,
        },
        ref
    ) => (
        <button
            className={cn(
                variants[variant],
                'flex items-center justify-center gap-3 whitespace-nowrap rounded-full border transition-all disabled:cursor-not-allowed disabled:opacity-50 hover:from-white hover:to-white',
                !disabled && variant !== 'danger' && variant !== 'label' && 'hover:bg-white hover:!text-black',
                !disabled && variant !== 'label' && 'hover:-translate-y-[0.15rem] active:translate-y-[0.025rem] active:scale-[0.975]',
                icon && !value && !children ? 'aspect-square p-3' : 'px-5 py-3',
                reversed && 'flex-row-reverse',
                className
            )}
            disabled={disabled}
            onClick={!disabled ? onClick : undefined}
            ref={ref}
            type={type}
            tabIndex={tabIndex}
        >
            {icon && React.createElement(icon, { size: 20 })}
            {value && (
                <Text variant={variant === 'label' ? 'label' : 'input'}>{value}</Text>
            )}
            {children}
        </button>
    )
);

Button.displayName = 'Button';

export default Button;

