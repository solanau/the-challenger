import React from 'react';
import { BaseChallenge } from 'types/challenge';
import { cn } from 'utils';

/**
 * Properties for a card component.
 */
type CardProps = {
    className?: string;
    children?: React.ReactNode;
    tabIndex?: number;
    baseChallenge?: BaseChallenge;
    blur?: boolean;
    border?: boolean;
};

/**
 * Definition of a card component,the main purpose of
 * which is to neatly display information. Can be both
 * interactive and static.
 *
 * @param className Custom classes to be applied to the element.
 * @param children Child elements to be rendered within the component.
 * @param blur Whether or not to apply a blur-effect.
 */

const Card = ({
    className,
    children,
    tabIndex,
    border = true,
    blur = true,
}: CardProps) => (
    // const renderCurrentSelection = (g: BaseChallenge) => {
    //     console.log(`baseChallenge ggd: `, g)
    //     if (!baseChallenge) {
    //         return (
    //             <div
    //                 className={cn(
    //                     className,
    //                     border && 'border border-white',
    //                     blur &&
    //         ' bg-base bg-opacity-70 backdrop-blur-lg firefox:bg-opacity-90',
    //                     'rounded-3xl',
    //                 )}
    //                 tabIndex={tabIndex}
    //             >
    //                 {children}
    //             </div>
    //         );
    //     }
    //     switch (baseChallenge?.type) {
    //         case 'Game':
    //             return (
    //                 <div
    //                     className={cn(
    //                         className,
    //                         border && 'border border-white',
    //                         blur &&
    //                         ' bg-[#4bb7f6] bg-opacity-100 backdrop-blur-lg firefox:bg-opacity-90',
    //                         'rounded-3xl',
    //                     )}
    //                     tabIndex={tabIndex}
    //                 >
    //                     {children}
    //                 </div>
    //             );
    //         case 'SDK':
    //             return (
    //                 <div
    //                     className={cn(
    //                         className,
    //                         border && 'border border-white',
    //                         blur &&
    //                             ' bg-[#f64bbd] bg-opacity-100 backdrop-blur-lg firefox:bg-opacity-90',
    //                         'rounded-3xl',
    //                     )}
    //                     tabIndex={tabIndex}
    //                 >
    //                     {children}
    //                 </div>
    //             );
    //         default:
    //             return (
    //                 <div
    //                     className={cn(
    //                         className,
    //                         border && 'border border-white',
    //                         blur &&
    //             ' bg-base bg-opacity-70 backdrop-blur-lg firefox:bg-opacity-90',
    //                         'rounded-3xl',
    //                     )}
    //                     tabIndex={tabIndex}
    //                 >
    //                     {children}
    //                 </div>
    //             );
    //     }
    // };

    // return (

    //     <a className="">

    //         {renderCurrentSelection(baseChallenge)}
    //     </a>
    // );
    <div
        className={cn(
            className,
            border && 'border border-white',
            blur &&
                ' bg-base bg-opacity-70 backdrop-blur-lg firefox:bg-opacity-90',
            'rounded-3xl',
        )}
        tabIndex={tabIndex}
    >
        {children}
    </div>
);
// <div
//     className={cn(
//         className,
//         border && 'border border-white',
//         blur &&
//         ' bg-[#4bb7f6] bg-opacity-100 backdrop-blur-lg firefox:bg-opacity-90',
//         'rounded-3xl',
//     )}
//     tabIndex={tabIndex}
// >
//     {children}
// </div>
// <div
//     className={cn(
//         className,
//         border && 'border border-white',
//         blur &&
//         ' bg-[#4bb7f6] bg-opacity-100 backdrop-blur-lg firefox:bg-opacity-90',
//         'rounded-3xl',
//     )}
//     tabIndex={tabIndex}
// >
//     {children}
// </div>
//     <div
//     className={cn(
//         className,
//         border && 'border border-white',
//         blur &&
//         ' bg-[#0606ecd8] bg-opacity-70 backdrop-blur-lg firefox:bg-opacity-90',
//         'rounded-3xl',
//     )}
//     tabIndex={tabIndex}
// >
//     {children}
// </div>
export default Card;
