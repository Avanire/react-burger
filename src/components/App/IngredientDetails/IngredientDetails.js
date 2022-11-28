import React from "react";
import ingredientDetails from './IngredientDetails.module.css';

const IngredientDetails = ({modalIngredient}) => {
    const Detail = ({name, value}) => {
        return (
            <span className='text text_type_main-default text_color_inactive mr-5'>
                <div>{name}</div>
                <div>{value}</div>
            </span>
        );
    }

    return (
        <section>
            <div className='text text_type_main-large mt-10'>Детали ингредиента</div>
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

export default IngredientDetails;