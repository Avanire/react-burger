import ingredientDetails from './IngredientDetails.module.css';
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

const Detail = ({name, value}) => {
    return (
        <span className='text text_type_main-default text_color_inactive mr-5'>
                <div className='mb-2'>{name}</div>
                <div>{value}</div>
            </span>
    );
}

Detail.prototype = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
}

const IngredientDetails = () => {
    const ingredient = useSelector(state => state.burgerIngredients.modalIngredient);

    return (
        <section>
            <div className={`${ingredientDetails.heading} text text_type_main-large mt-10 ml-10`}>Детали ингредиента
            </div>
            <div className='mb-4'><img src={ingredient.image_large} alt=""/></div>
            <div className='text text_type_main-medium mb-8'>{ingredient.name}</div>
            <div className={`${ingredientDetails.list} mb-15`}>
                <Detail name='Калории,ккал' value={ingredient.calories}/>
                <Detail name='Белки, г' value={ingredient.proteins}/>
                <Detail name='Жиры, г' value={ingredient.fat}/>
                <Detail name='Углеводы, г' value={ingredient.carbohydrates}/>
            </div>
        </section>
    );
}

export default IngredientDetails;