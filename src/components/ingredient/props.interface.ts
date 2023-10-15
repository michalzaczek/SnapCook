export interface IProps {
    /**
     * Whether it's selected.
     */
    selected: boolean;

    /**
     * Ingredient name.
     */
    name: string;

    /**
     * Callback executed on selection.
     */
    onSelect: () => void;
}