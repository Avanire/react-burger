import React, {useEffect} from "react";
import burgerIngredients from './BurgerIngredients.module.css';
import {Counter, CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import dataPropTypes from '../../utils/prop-types';
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {useDispatch, useSelector} from "react-redux";
import {
    getBurgerIngredients,
    addModalIngredient,
    removeModalIngredient
} from "../../services/actions/BurgerIngredients";
import {useDrag} from "react-dnd";

const Card = ({ingredient, openModal}) => {
    const [{isDrag}, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        !isDrag && (<section
            className={`${burgerIngredients.product} mb-8`}
            onClick={() => openModal(ingredient)}
            ref={dragRef}
        >
            <span className="counter">{ingredient.count > 0 &&
                <Counter count={ingredient.count} size="default" extraClass="m-1"/>}</span>
            <div className={burgerIngredients.image}>
                <picture>
                    <source srcSet={ingredient.imageMobile} media="(max-width: 375px)"/>
                    <source srcSet={ingredient.imageLarge} media="(max-width: 1920px)"/>
                    <img src={ingredient.image} alt={ingredient.name}/>
                </picture>
            </div>
            <div className={burgerIngredients.price}>
                <span className='text text_type_digits-default pr-2 mt-1 mb-1'>{ingredient.price}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <div className={`text text_type_main-default ${burgerIngredients.name}`}>{ingredient.name}</div>
        </section>)
    );
}

Card.propTypes = {
    ingredient: dataPropTypes.isRequired,
    openModal: PropTypes.func.isRequired
}

const Category = React.forwardRef((props, ref) => {
    return (
        <section ref={ref}>
            <h2 className='text text_type_main-medium mb-6'>{props.children}</h2>
            <div className={`${burgerIngredients.container} mb-10 ml-4`}>
                {props.data.map(item => (
                    <Card key={item._id} ingredient={item} openModal={props.openModal}/>
                ))}
            </div>
        </section>
    );
});

Category.propTypes = {
    children: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
    openModal: PropTypes.func.isRequired
}

const BurgerIngredients = () => {
    const [currentTab, setCurrentTab] = React.useState('rolls');
    const {ingredients, ingredientsRequest, ingredientsFailed} = useSelector(state => state.burgerIngredients);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBurgerIngredients());
    }, [dispatch]);

    const [modal, setModal] = React.useState(false);

    const scrollableBlock = React.useRef(null);
    const rollsTab = React.useRef(null);
    const fillingsTab = React.useRef(null);
    const sauceTab = React.useRef(null);

    const bun = React.useMemo(() => {
        return ingredients.filter(item => item.type === 'bun');
    }, [ingredients]);

    const main = React.useMemo(() => {
        return ingredients.filter(item => item.type === 'main');
    }, [ingredients]);

    const sauce = React.useMemo(() => {
        return ingredients.filter(item => item.type === 'sauce');
    }, [ingredients]);

    const scrollToSauces = (value) => {
        setCurrentTab(value);
        sauceTab.current.scrollIntoView({behavior: 'smooth'});
    }

    const scrollToRolls = (value) => {
        setCurrentTab(value);
        rollsTab.current.scrollIntoView({behavior: 'smooth'});
    }

    const scrollToFillings = (value) => {
        setCurrentTab(value);
        fillingsTab.current.scrollIntoView({behavior: 'smooth'});
    }

    const handleOpenModal = (ingredient) => {
        dispatch({
            type: addModalIngredient.type,
            payload: ingredient
        });
        setModal(true);
    }

    const handleCloseModal = () => {
        dispatch({
            type: removeModalIngredient.type
        })
        setModal(false);
    }

    const handleScroll = () => {
        const yCoordinateRollsTab = rollsTab.current.getBoundingClientRect().y;
        const yCoordinateFillingsTab = fillingsTab.current.getBoundingClientRect().y;
        const yCoordinateSauceTab = sauceTab.current.getBoundingClientRect().y;

        if (yCoordinateRollsTab < yCoordinateFillingsTab && yCoordinateRollsTab > 0) {
            setCurrentTab('rolls');
        } else if (yCoordinateFillingsTab < yCoordinateSauceTab && yCoordinateFillingsTab > 0) {
            setCurrentTab('fillings');
        } else  {
            setCurrentTab('sauce');
        }
    }

    if (ingredientsRequest) {
        return (<p>Loading...</p>);
    } else if (ingredientsFailed) {
        return (
            <section>
                <h1>Что-то пошло не так :(</h1>
                <p>
                    В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
                </p>
            </section>
        );
    } else {
        return (
            <>
                <section className={`${burgerIngredients.ingredients} mr-10`}>
                    <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
                    <div className={`${burgerIngredients.tab} mb-10`}>
                        <Tab value="rolls" active={currentTab === 'rolls'} onClick={scrollToRolls}>
                            Булки
                        </Tab>
                        <Tab value="fillings" active={currentTab === 'fillings'} onClick={scrollToFillings}>
                            Начинки
                        </Tab>
                        <Tab value="sauce" active={currentTab === 'sauce'} onClick={scrollToSauces}>
                            Соусы
                        </Tab>
                    </div>
                    <div className={`${burgerIngredients.category_wrapper} custom-scroll`} ref={scrollableBlock} onScroll={handleScroll}>
                        <Category ref={rollsTab} data={bun}
                                  openModal={handleOpenModal}>Булки</Category>
                        <Category ref={fillingsTab} data={main}
                                  openModal={handleOpenModal}>Начинки</Category>
                        <Category ref={sauceTab} data={sauce}
                                  openModal={handleOpenModal}>Соусы</Category>
                    </div>
                </section>
                {modal && <Modal onClose={handleCloseModal}><IngredientDetails /></Modal>}
            </>
        );
    }

}

export default BurgerIngredients;