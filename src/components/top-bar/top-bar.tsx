import styles from "./top-bar.module.scss";

export default function TopBar() {
    return(
        <div className={styles["top-bar"]}>
            <h1>SnapCook</h1>
        </div>
    )
}