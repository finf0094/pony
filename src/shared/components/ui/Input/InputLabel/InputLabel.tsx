import { classNames } from '../../../core/lib/classNames';
import { factory } from '../../../core/lib/factory';
import styles from '../Input.module.scss';
import { useInputWrapperContext } from '../InputWrapper.context';

interface InputLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
}

export const InputLabel = factory<'label', InputLabelProps>(
    (
        { as: Component = 'label', required, className, children, ...rest },
        ref,
    ) => {
        const ctx = useInputWrapperContext();

        return (
            <Component
                {...rest}
                ref={ref}
                htmlFor={ctx?.inputId}
                className={classNames(styles.InputLabel, className)}
            >
                {children}
                {required && (
                    <span
                        className={classNames(styles['InputLabel__required'])}
                        aria-hidden
                    >
                        {' *'}
                    </span>
                )}
            </Component>
        );
    },
);
