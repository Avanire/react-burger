import React, {FC, useEffect, useMemo, useRef, useState} from "react";
import burgerIngredients from './BurgerIngredients.module.css';
import {Counter, CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {
    addModalIngredient,
    getBurgerIngredients,
    removeModalIngredient
} from "../../services/actions/BurgerIngredients";
import {useDrag} from "react-dnd";
import {Link, useHistory} from "react-router-dom";
import {GridLoader} from "react-spinners";
import {ICardProps, ICategoryProps, TIngredient} from "../../utils/prop-types";
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';

const Card: FC<ICardProps> = ({ingredient, openModal}) => {
    const history = useHistory();
    const [{isDrag}, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        <Link
            className={`${burgerIngredients.product} mb-8`}
            onClick={() => openModal(ingredient)}
            ref={dragRef}
            to={{pathname: `/ingredients/${ingredient._id}`, state: {popUp: history.location}}}
        >
            <span className="counter">{ingredient.count && ingredient.count > 0 ?
                (<Counter count={ingredient.count} size="default" extraClass="m-1"/>) : null}</span>
            <div className={burgerIngredients.image}>
                {
                    !isDrag ? (
                        <picture>
                            <source srcSet={ingredient.image_mobile} media="(max-width: 375px)"/>
                            <source srcSet={ingredient.image_large} media="(max-width: 1920px)"/>
                            <img src={ingredient.image} alt={ingredient.name}/>
                        </picture>) : null
                }
            </div>
            <div className={burgerIngredients.price}>
                <span className='text text_type_digits-default pr-2 mt-1 mb-1'>{ingredient.price}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <div className={`text text_type_main-default ${burgerIngredients.name}`}>{ingredient.name}</div>
        </Link>
    );
}

const Category = React.forwardRef<HTMLElement, ICategoryProps>((props, ref) => {
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

const BurgerIngredients = () => {
    const [currentTab, setCurrentTab] = React.useState<string>('rolls');
    const {ingredients, ingredientsRequest} = useAppSelector(state => state.burgerIngredients);
    const dispatch = useAppDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getBurgerIngredients());
    }, [dispatch]);

    const [modal, setModal] = useState<boolean>(false);

    const scrollableBlock = useRef<HTMLDivElement>(null);
    const rollsTab = useRef<HTMLElement>(null);
    const fillingsTab = useRef<HTMLElement>(null);
    const sauceTab = useRef<HTMLElement>(null);

    const bun = useMemo(() => {
        return ingredients.filter(item => item.type === 'bun');
    }, [ingredients]);

    const main = useMemo(() => {
        return ingredients.filter(item => item.type === 'main');
    }, [ingredients]);

    const sauce = useMemo(() => {
        return ingredients.filter(item => item.type === 'sauce');
    }, [ingredients]);

    const scrollToSauces = (value: string) => {
        setCurrentTab(value);
        sauceTab.current?.scrollIntoView({behavior: 'smooth'});
    }

    const scrollToRolls = (value: string) => {
        setCurrentTab(value);
        rollsTab.current?.scrollIntoView({behavior: 'smooth'});
    }

    const scrollToFillings = (value: string) => {
        setCurrentTab(value);
        fillingsTab.current?.scrollIntoView({behavior: 'smooth'});
    }

    const handleOpenModal = (ingredient: TIngredient) => {
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
        history.replace('/');
    }

    const handleScroll = () => {
        const yCoordinateRollsTab = rollsTab.current?.getBoundingClientRect().y;
        const yCoordinateFillingsTab = fillingsTab.current?.getBoundingClientRect().y;
        const yCoordinateSauceTab = sauceTab.current?.getBoundingClientRect().y;

        if (yCoordinateRollsTab && yCoordinateFillingsTab ? yCoordinateRollsTab < yCoordinateFillingsTab && yCoordinateRollsTab > 0 : false) {
            setCurrentTab('rolls');
        } else if (yCoordinateFillingsTab && yCoordinateSauceTab ? yCoordinateFillingsTab < yCoordinateSauceTab && yCoordinateFillingsTab > 0 : false) {
            setCurrentTab('fillings');
        } else {
            setCurrentTab('sauce');
        }
    }

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
                {ingredientsRequest ? (
                    <div className={burgerIngredients.preloader}><GridLoader color="#8a37d1"/></div>) : (
                    <>
                        <div className={`${burgerIngredients.category_wrapper} custom-scroll`} ref={scrollableBlock}
                             onScroll={handleScroll}>
                            <Category ref={rollsTab} data={bun}
                                      openModal={handleOpenModal}>Булки</Category>
                            <Category ref={fillingsTab} data={main}
                                      openModal={handleOpenModal}>Начинки</Category>
                            <Category ref={sauceTab} data={sauce}
                                      openModal={handleOpenModal}>Соусы</Category>
                        </div>
                    </>
                )}

            </section>
            {modal && <Modal onClose={handleCloseModal}><IngredientDetails/></Modal>}
        </>
    );

}

export default BurgerIngredients;