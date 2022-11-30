import React from "react";
import burgerIngredients from './BurgerIngredients.module.css';
import {Counter, CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import dataPropTypes from '../../utils/prop-types';
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

const Card = ({ingredient, openModal}) => {
    return (
        <section
            className={`${burgerIngredients.product} mb-8`}
            onClick={() => openModal(ingredient)}
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
        </section>
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

const BurgerIngredients = ({data}) => {
    const [currentTab, setCurrentTab] = React.useState('rolls');

    const [modal, setModal] = React.useState({
        visible: false,
        modalIngredient: null
    });

    const rollsTab = React.useRef(null);
    const fillingsTab = React.useRef(null);
    const sauceTab = React.useRef(null);

    const dataBun = React.useMemo(() => {
        return data.filter(item => item.type === 'bun');
    }, [data]);

    const dataMain = React.useMemo(() => {
        return data.filter(item => item.type === 'main');
    }, [data]);

    const dataSauce = React.useMemo(() => {
        return data.filter(item => item.type === 'sauce');
    }, [data]);

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
        setModal({...modal, modalIngredient: ingredient, visible: true});

    }

    const handleCloseModal = () => {
        setModal({...modal, modalIngredient: null, visible: false});
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
                <div className={`${burgerIngredients.category_wrapper} custom-scroll`}>
                    <Category ref={rollsTab} data={dataBun}
                              openModal={handleOpenModal}>Булки</Category>
                    <Category ref={fillingsTab} data={dataMain}
                              openModal={handleOpenModal}>Начинки</Category>
                    <Category ref={sauceTab} data={dataSauce}
                              openModal={handleOpenModal}>Соусы</Category>
                </div>
            </section>
            {modal.visible && <Modal onClose={handleCloseModal}><IngredientDetails modalIngredient={modal.modalIngredient}/></Modal>}
        </>
    );

}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired
}

export default BurgerIngredients;