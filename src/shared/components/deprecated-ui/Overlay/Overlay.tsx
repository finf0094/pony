import {classNames} from "@/shared/components";
import styles from './Overlay.module.scss';

interface OverlayProps {
    className?: string;
    onClick?: () => void;
}

export const Overlay = (props: OverlayProps) => {
    const {className, onClick} = props;

    return <div onClick={onClick} className={classNames(styles.Overlay, className)}/>;
};
