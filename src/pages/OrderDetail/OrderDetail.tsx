import React, {FC} from "react";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
import InnerPage from "../../components/InnerPage/InnerPage";

const OrderDetailPage: FC = () => {
    return (
        <InnerPage>
            <OrderDetail />
        </InnerPage>

    );
}

export default OrderDetailPage;