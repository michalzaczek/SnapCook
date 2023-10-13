import { useState } from "react";
import styles from "./ingredient.module.scss";
import { IProps } from "./props.interface";

export default function Ingredient({ name, percentage }: IProps) {
    const [confirmed, setConfirmed] = useState(false);

    const handleClick = () => setConfirmed(!confirmed);

    return (
        <div className={styles.ingredient} onClick={handleClick}>
            <div className={styles.overlay} style={{ width: `${percentage}%` }}></div>
            <p className={styles.name}>{name}</p>
            <div className={styles.checkbox}>
                {confirmed && <p className={styles.tick}>X</p>}
            </div>
        </div>
    )
}