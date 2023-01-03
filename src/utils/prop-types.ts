import {ReactElement} from "react";
import {PayloadAction} from "@reduxjs/toolkit";

export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    count: number | undefined;
    constructorId: string;
};

export type TChangesPositionObject = {
    card: TIngredient;
    index: number;
    atIndex: number;
};

export type TBurgerConstructorElement = {
    ingredient: TIngredient;
    handleRemove: (ingredient: TIngredient) => void;
    findCard: (id: string) => { card: TIngredient, index: number };
    moveCard: (id: string, atIndex: number) => void;
};

export type TMoveCard = {
    id: string;
    originalIndex: number;
};

export type TReactChildren = {
    children?: ReactElement;
};

export type TModal = {
    onClose: () => void;
} & TReactChildren;

export type TProtectedRoute = {
    onlyAuth: boolean;
    path: string;
    exact: boolean;
} & TReactChildren;

export type TBody = {
    [name: string]: string | Array<string> | undefined;
};

export type TUserAuth = {
    user: {
        name: string,
        email: string
    };
} & TTokenSuccess;

export type TTokenSuccess = {
    accessToken: string;
    refreshToken: string;
};

export interface IInitialStateBurgerIngredients {
    ingredients: Array<TIngredient>;
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
    constructorIngredients: Array<TIngredient>;
    constructorBun: TIngredient | null;
    modalIngredient: TIngredient | null;
}

export interface IInitialStateOrderDetails {
    number: null | number;
    orderRequest: boolean;
    orderFailed: boolean;
}

export interface IInitialStateAuth {
    user: {
        name: string,
        email: string
    };
    isAuth: boolean;
    request: boolean;
    failed: boolean;
    isResetPass: boolean;
}

export interface IDispatch {
    type: string,
    payload?: PayloadAction<any>
}

interface ILocation {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: Object | undefined;
}

export interface IPopUp {
    popUp: ILocation;
}

export interface ILocationFrom {
    from: ILocation;
}