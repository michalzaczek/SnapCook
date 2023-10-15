import { Dispatch, SetStateAction } from "react";

export interface IPageProps {
    setPageTitle: Dispatch<SetStateAction<string>>;
}