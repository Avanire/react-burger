import React, {FC} from "react";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from './BurgerConstructor.module.css';
import Modal from "../Modal/Modal";
import CheckDetail from "../CheckDetail/CheckDetail";
import {useDrag, useDrop} from "react-dnd";
import {
    addIngredient,
    addIngredientBun,
    changePositions,
    removeIngredient
} from "../../services/actions/BurgerIngredients";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {TBurgerConstructorElement, TIngredient, TMoveCard} from "../../utils/prop-types";

const BurgerConstructorElement: FC<TBurgerConstructorElement> = ({ingredient, handleRemove, findCard, moveCard}) => {
    const originalIndex = findCard(ingredient.constructorId).index;
    const id = ingredient.constructorId;

    const [, sortElement] = useDrag({
        type: ingredient.type === 'bun' ? 'bun' : 'sortElement',
        item: {id, originalIndex},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const {id: droppedId, originalIndex} = item
            const didDrop = monitor.didDrop()
            if (!didDrop) {
                moveCard(droppedId, originalIndex)
            }
        },
    });

    const [, drop] = useDrop({
        accept: ingredient.type === 'bun' ? 'bun' : 'sortElement',
        hover(draggedId: TMoveCard) {
            if (draggedId.id !== id) {
                const {index: overIndex} = findCard(id)
                moveCard(draggedId.id, overIndex)
            }
        },
    })

    return (
        <li className={`${burgerConstructor.list_item}`} ref={(node) => sortElement(drop(node))}>
            <DragIcon type="primary"/>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => handleRemove(ingredient)}
            />
        </li>
    );
}

const BurgerConstructor = () => {
    const cart = useAppSelector(state => state.burgerIngredients.constructorIngredients);
    const bun = useAppSelector(state => state.burgerIngredients.constructorBun);
    const dispatch = useAppDispatch();

    const [modal, setModal] = React.useState(false);

    const total = React.useMemo(() => {
        return cart ? cart.reduce((acc, i) => acc + i.price, 0) + (bun ? bun.price * 2 : 0) : 0;
    }, [cart, bun]);

    const ingredients = React.useMemo(() => {
        return cart ? cart.filter(c => c.type !== 'bun') : [];
    }, [cart]);

    const handleCheckout = () => {
        setModal(true);
    }

    const handleCloseModal = () => {
        setModal(false);
    }

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(ingredient: TIngredient) {
            ingredient.type === 'bun' ? addBun(ingredient) : addIngredients(ingredient);
        }
    });

    const addBun = (ingredient: TIngredient) => {
        dispatch({
            type: addIngredientBun.type,
            payload: ingredient
        })
    }

    const addIngredients = (ingredient: TIngredient) => {
        dispatch({
            type: addIngredient.type,
            payload: ingredient
        })
    }

    const handleRemove = (ingredient: TIngredient) => {
        dispatch({
            type: removeIngredient.type,
            payload: ingredient
        })
    }

    const findCard = React.useCallback(
        (id: string) => {
            const card = cart.filter((c) => c.constructorId === id)[0];

            return {
                card,
                index: cart.findIndex(card => card.constructorId === id),
            }
        },
        [cart],
    )

    const moveCard = React.useCallback(
        (id: string, atIndex: number) => {
            const {card, index} = findCard(id);

            dispatch({
                type: changePositions.type,
                payload: {card, index, atIndex}
            });
        },
        [findCard, dispatch],
    )

    const [, sortArea] = useDrop({
        accept: 'sortElement'
    });

    const disabledCheckoutBtn = !(bun && ingredients.length > 0);

    return (
        <>
            <section className={`${burgerConstructor.burgerConstructor} mt-25`} ref={dropTarget}>
                <div className={`ml-8`}>
                    {bun ? (<ConstructorElement
                        type="top"
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                        isLocked={true}
                    />) : (<div
                        className={`${burgerConstructor.skeleton_constructor} constructor-element constructor-element_pos_top`}>
                            <span className="constructor-element__row">
                                <span className="constructor-element__text">Выберете булку (верх)</span>
                            </span>
                    </div>)}
                </div>
                <ul className={`${burgerConstructor.list} custom-scroll`} ref={sortArea}>
                    {ingredients.length > 0 ? ingredients.map((ingredient) =>
                        <BurgerConstructorElement
                            key={ingredient.constructorId}
                            ingredient={ingredient}
                            handleRemove={handleRemove}
                            findCard={findCard}
                            moveCard={moveCard}
                        />
                    ) : (<div className={`${burgerConstructor.skeleton_constructor} constructor-element ml-8`}>
                            <span className={`constructor-element__row`}>
                                <span className="constructor-element__text">Выберите ингредиент</span>
                            </span>
                    </div>)}
                </ul>
                <div className='ml-8 mb-10'>
                    {bun ? (<ConstructorElement
                        type="bottom"
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                        isLocked={true}
                    />) : (<div
                        className={`${burgerConstructor.skeleton_constructor} constructor-element constructor-element_pos_bottom`}>
                            <span className="constructor-element__row">
                                <span className="constructor-element__text">Выберете булку (низ)</span>
                            </span>
                    </div>)}
                </div>
                <div className={burgerConstructor.checkout}>
                    <div className={`${burgerConstructor.sum} mr-10`}><span
                        className={`mr-2 text text_type_digits-medium`}>{total}</span><CurrencyIcon type="primary"/>
                    </div>
                    <Button
                        htmlType="button"
                        type="primary"
                        size="medium"
                        onClick={handleCheckout}
                        disabled={disabledCheckoutBtn}
                    >
                        Оформить заказ
                    </Button>
                </div>
            </section>
            {modal && <Modal onClose={handleCloseModal}><CheckDetail/></Modal>}
        </>
    );

}

export default BurgerConstructor;