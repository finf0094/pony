import { classNames } from '../../../core/lib/classNames';
import { factory } from '../../../core/lib/factory';
import styles from '../Input.module.scss';

interface InputErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const InputError = factory<'p', InputErrorProps>(
    ({ as: Component = 'p', children, className, ...rest }, ref) => {
        return (
            <Component
                {...rest}
                ref={ref}
                className={classNames(styles.InputError, className)}
            >
                {children}
            </Component>
        );
    },
);
