import React from "react";
import { ConstructorElement, CurrencyIcon, DeleteIcon, LockIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerConstructor extends React.Component{
    render() {
        return (
            <section>
                <div>
                    <ConstructorElement
                        type="top"
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={img}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={img}
                    />
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={img}
                    />
                    <ConstructorElement
                        text="Краторная булка N-200i (верх)"
                        price={50}
                        thumbnail={img}
                    />
                </div>
                <div>
                    <ConstructorElement
                        type="bottom"
                        text="Краторная булка N-200i (низ)"
                        price={50}
                        thumbnail={img}
                    />
                </div>
            </section>
        );
    }
}

export default BurgerConstructor;