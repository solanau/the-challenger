import { IconType } from 'react-icons';
import type { MouseEvent } from 'react';
import React from 'react';
import Text from '../text';
import { cn } from 'utils';

/**
 * Properties for an interactable button component.
 */
type ButtonProps = {
    className?: string;
    disabled?: boolean;
    reversed?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    variant: 'black' | 'orange' | 'transparent' | 'danger' | 'label' | 'none';
    text?: string;
    icon?: IconType;
    children?: React.ReactNode;
    buttonRef?: React.Ref<HTMLButtonElement>;
    type?: 'button' | 'submit' | 'reset';
    tabIndex?: number;
};

/**
 * Pre-defined styling, according to agreed-upon design-system.
 */
const variants = {
    black: 'border-transparent bg-black',
    orange: 'border-transparent bg-primary text-black', // TODO: Change name of variant to `highlight`.
    transparent: 'text-white', // TODO: Change name of variant to `outlined`.
    danger: 'border-secondary text-danger hover:text-white hover:bg-secondary',
    label: 'text-secondary hover:text-white !p-0 border-none',
    none: '',
};

/**
 * Definition of an interactable button component.
 *
 * @param type `type` Attribute of the `<button>` element.
 * @param variant Variations relating to pre-defined styling of the element
 * @param text Text to display in the button.
 */
const Button = ({
    className,
    disabled = false,
    reversed = false,
    onClick,
    buttonRef,
    type = 'button',
    variant = 'black',
    text: value,
    children,
    tabIndex,
    icon,
}: ButtonProps) => (
    <button
        className={cn(
            variants[variant],
            'flex h-11 max-h-full w-fit items-center justify-center gap-3 whitespace-nowrap rounded-full border transition-all disabled:cursor-not-allowed disabled:opacity-50',
            !disabled &&
                variant !== 'danger' &&
                variant !== 'label' &&
                'hover:bg-white hover:!text-black',
            !disabled &&
                variant !== 'label' &&
                'hover:-translate-y-[0.15rem] active:translate-y-[0.025rem] active:scale-[0.975]',
            icon && !value && !children ? 'aspect-square p-3' : 'px-5 py-3',
            reversed && 'flex-row-reverse',
            className,
        )}
        disabled={disabled}
        onClick={!disabled ? onClick : undefined}
        ref={buttonRef}
        type={type}
        tabIndex={tabIndex}
    >
        {icon && React.createElement(icon, { size: 20 })}
        {value && (
            <Text variant={variant === 'label' ? 'label' : 'input'}>
                {value}
            </Text>
        )}
        {children}
    </button>
);

export default Button;
