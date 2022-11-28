import React from "react";
import ingredientDetails from './IngredientDetails.module.css';
import PropTypes from "prop-types";
import dataPropTypes from "../../../utils/prop-types";

const IngredientDetails = ({modalIngredient}) => {
    const Detail = ({name, value}) => {
        return (
            <span className='text text_type_main-default text_color_inactive mr-5'>
                <div className='mb-2'>{name}</div>
                <div>{value}</div>
            </span>
        );
    }

    return (
        <section>
            <div className={`${ingredientDetails.heading} text text_type_main-large mt-10 ml-10`}>Детали ингредиента</div>
            <div className='mb-4'><img src={modalIngredient.image_large} alt=""/></div>
            <div className='text text_type_main-medium mb-8'>{modalIngredient.name}</div>
            <div className={`${ingredientDetails.list} mb-15`}>
                <Detail name='Калории,ккал' value={modalIngredient.calories}/>
                <Detail name='Белки, г' value={modalIngredient.proteins}/>
                <Detail name='Жиры, г' value={modalIngredient.fat}/>
                <Detail name='Углеводы, г' value={modalIngredient.carbohydrates}/>
            </div>
        </section>
    );
}

IngredientDetails.propTypes = {
    modalIngredient: PropTypes.objectOf(dataPropTypes.isRequired).isRequired
}

export default IngredientDetails;