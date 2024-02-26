import { Dispatch, SetStateAction } from 'react';

export interface IUIStateContext {
  /**
   * Whether to animate the ingridient elements.
   */
  animateIngredients: boolean;

  /**
   * Toggle ingredient elements animation.
   */
  setAnimateIngredients: Dispatch<SetStateAction<boolean>>;

  /**
   * Whether to set a delay on ingredients animation.
   */
  delayIngredientsAnimation: boolean;

  /**
   * Toggle delay on ingredients animation.
   */
  setDelayIngredientsAnimation: Dispatch<SetStateAction<boolean>>;
}
