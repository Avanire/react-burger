import ingredientDetails from './IngredientDetails.module.css';
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {getBurgerIngredients} from "../../services/actions/BurgerIngredients";
import {GridLoader} from "react-spinners";

const Detail = ({name, value}) => {
    return (
        <span className='text text_type_main-default text_color_inactive mr-5'>
                <div className='mb-2'>{name}</div>
                <div>{value}</div>
            </span>
    );
}

Detail.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
}

const IngredientDetails = () => {
    const {ingredients, modalIngredient, ingredientsRequest} = useSelector(state => state.burgerIngredients);
    const {id} = useParams();
    const dispatch = useDispatch();
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
                            <Detail name='Калории,ккал' value={ingredient?.calories}/>
                            <Detail name='Белки, г' value={ingredient?.proteins}/>
                            <Detail name='Жиры, г' value={ingredient?.fat}/>
                            <Detail name='Углеводы, г' value={ingredient?.carbohydrates}/>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}

export default IngredientDetails;