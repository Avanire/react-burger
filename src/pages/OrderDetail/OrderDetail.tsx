import React, {FC} from "react";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
import InnerPage from "../../components/InnerPage/InnerPage";
import {IWsUrl} from "../../utils/prop-types";

const OrderDetailPage: FC<IWsUrl> = ({wsUrl}) => {
    return (
        <InnerPage>
            <OrderDetail wsUrl={wsUrl}/>
        </InnerPage>
    );
}

export default OrderDetailPage;