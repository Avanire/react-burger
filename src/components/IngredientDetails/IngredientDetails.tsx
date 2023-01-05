import ingredientDetails from './IngredientDetails.module.css';
import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {getBurgerIngredients} from "../../services/actions/BurgerIngredients";
import {GridLoader} from "react-spinners";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

const Detail = ({name, value}: {name: string, value: number}) => {
    return (
        <span className='text text_type_main-default text_color_inactive mr-5'>
                <div className='mb-2'>{name}</div>
                <div>{value}</div>
            </span>
    );
}

const IngredientDetails = () => {
    const {ingredients, modalIngredient, ingredientsRequest} = useAppSelector(state => state.burgerIngredients);
    const {id}: {id: string} = useParams();
    const dispatch = useAppDispatch();
    const ingredient = modalIngredient ? modalIngredient : ingredients.find(item => item._id === id);

    useEffect(() => {
        if (!ingredients.length) {
            dispatch(getBurgerIngredients());
        }
    }, [dispatch, ingredients]);

    return (
        <section className={ingredientDetails.productWrapper}>
            <div className={ingredientDetails.product}>
                {ingredientsRequest ? (
                    <div className='mt-10'>
                        <GridLoader color="#8a37d1" />
                    </div>
                ) : (
                    <div className='mt-10'>
                        <div className={`${ingredientDetails.heading} text text_type_main-large`}>
                            Детали ингредиента
                        </div>
                        <div className='mb-4'><img src={ingredient?.image_large} alt=""/></div>
                        <div className='text text_type_main-medium mb-8'>{ingredient?.name}</div>
                        <div className={`${ingredientDetails.list} mb-15`}>
                            <Detail name='Калории,ккал' value={ingredient ? ingredient.calories : 0}/>
                            <Detail name='Белки, г' value={ingredient ? ingredient.proteins : 0}/>
                            <Detail name='Жиры, г' value={ingredient ? ingredient.fat : 0}/>
                            <Detail name='Углеводы, г' value={ingredient ? ingredient.carbohydrates : 0}/>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}

export default IngredientDetails;