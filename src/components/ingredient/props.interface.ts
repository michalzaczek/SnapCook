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
   * Index.
   */
  index: number;

  /**
   * Callback executed on selection.
   */
  onSelect: () => void;
}
