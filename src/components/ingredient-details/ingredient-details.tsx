import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { ingredientsSelector } from '../../services/slices/ingredients/slice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC<{ isModal?: boolean }> = ({
  isModal = false
}) => {
  /** TODO: взять переменную из стора */
  const ingredients = useSelector(ingredientsSelector);
  const { id } = useParams();
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <IngredientDetailsUI ingredientData={ingredientData} isModal={isModal} />
  );
};
