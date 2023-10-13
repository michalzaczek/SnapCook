import { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import snapCookLogo from "../../assets/logo.png";
import styles from "./camera.module.scss";
import { ingredientsService } from "../../services/ingredients.service";
import Loader from "../loader/loader";

export default function Camera() {
    const navigate = useNavigate();
    const ref = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleUpload(e: ChangeEvent<HTMLInputElement>): Promise<void> {
        setIsLoading(true);

        const ingredients = await ingredientsService();

        setIsLoading(false);

        navigate("ingredients", { state: ingredients });
    }

    function handleClick() {
        (ref.current as any).click();
    }

    return (
        <div className={styles.camera}>
            {isLoading && <Loader />}
            {!isLoading &&
                <img onClick={handleClick} className={styles.logo} src={snapCookLogo} alt="" />
            }
            <input ref={ref} type="file" accept="image/*" capture="environment" onChange={e => handleUpload(e)} />
        </div>
    )
}