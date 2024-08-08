import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {

    return (
        <button
            {...rest}
            className={clsx(
                'flex h-12 items-center rounded-lg px-8 text-sm font-bold',
                className,
            )}
        >
            {children}
        </button>
    );
}
