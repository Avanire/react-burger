import {ReactElement} from "react";

export type TIngredient = {
    readonly _id: string;
    readonly name: string;
    readonly type: string;
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly price: number;
    readonly image: string;
    readonly image_mobile: string;
    readonly image_large: string;
    count: number | undefined;
    constructorId: string;
};

export type TChangesPositionObject = {
    readonly card: TIngredient;
    readonly index: number;
    readonly atIndex: number;
};

export type TBurgerConstructorElement = {
    readonly ingredient: TIngredient;
    readonly handleRemove: (ingredient: TIngredient) => void;
    readonly findCard: (id: string) => { card: TIngredient, index: number };
    readonly moveCard: (id: string, atIndex: number) => void;
};

export type TMoveCard = {
    readonly id: string;
    readonly originalIndex: number;
};

export type TReactChildren = {
    readonly children?: ReactElement;
};

export type TModal = {
    readonly onClose: () => void;
} & TReactChildren;

export type TProtectedRoute = {
    readonly onlyAuth: boolean;
    readonly path: string;
    readonly exact: boolean;
} & TReactChildren;

export type TBody = {
    [name: string]: string | Array<string> | undefined;
};

export type TUserAuth = {
    readonly user: {
        readonly name: string,
        readonly email: string
    };
} & TTokenSuccess;

export type TTokenSuccess = {
    readonly accessToken: string;
    readonly refreshToken: string;
};

export type TErrors = {
    [name: string]: string
};

type TOrder = {
    readonly number: number
};

export type TResponseBody<> = {
    readonly success: boolean;
    readonly message?: string;
    readonly data?: Array<TIngredient>;
    readonly order?: TOrder;
};

export interface IInitialStateBurgerIngredients {
    readonly ingredients: Array<TIngredient>;
    readonly ingredientsRequest: boolean;
    readonly ingredientsFailed: boolean;
    readonly constructorIngredients: Array<TIngredient>;
    readonly constructorBun: TIngredient | null;
    readonly modalIngredient: TIngredient | null;
}

export interface IInitialStateOrderDetails {
    readonly number: null | number;
    readonly orderRequest: boolean;
    readonly orderFailed: boolean;
}

export interface IInitialStateAuth {
    readonly user: {
        readonly name: string,
        readonly email: string
        readonly token: string | undefined;
    };
    readonly isAuth: boolean;
    readonly request: boolean;
    readonly failed: boolean;
    readonly isResetPass: boolean;
}

interface ILocation {
    readonly hash: string;
    readonly key: string;
    readonly pathname: string;
    readonly search: string;
    readonly state: Object | undefined;
}

export interface IPopUp {
    readonly popUp: ILocation;
}

export interface ILocationFrom {
    readonly from: ILocation;
}

export interface ICardProps {
    readonly ingredient: TIngredient;
    readonly openModal: (ingredient: TIngredient) => void
}

export interface ICategoryProps {
    readonly children: string;
    readonly data: Array<TIngredient>;
    readonly openModal: (ingredient: TIngredient) => void
}

export interface IFeedOrders {
    readonly _id: string;
    readonly ingredients: ReadonlyArray<string>;
    readonly status: string;
    readonly number: number;
    readonly createdAt: string;
    readonly name: string;
}

export interface IWsFeedOrders {
    readonly orders: IFeedOrders;
    readonly total: number;
    readonly totalToday: number;
}

export type TWSState = {
    wsConnected: boolean;
    orders: ReadonlyArray<IFeedOrders>;
    total: number;
    totalToday: number;
    error?: Event;
}

export interface IFeedCard {
    readonly order: IFeedOrders;
    readonly handleOpenModal: (order: IFeedOrders) => void;
}