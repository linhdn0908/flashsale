import {
    ADD_ORDER_QUEUE_SUCCESS,
    ADD_ORDER_QUEUE_REQUEST,
    ADD_ORDER_QUEUE_FAIL,
    GET_ORDER_STATUS_REQUEST,
    GET_ORDER_STATUS_SUCCESS,
    GET_ORDER_STATUS_FAIL
} from "../constants/orderConstants";

export const ordersReducer = (state = { job_id: null, job_status: null, order_id: null, existOrder: false }, action) => {
    switch (action.type) {
        case ADD_ORDER_QUEUE_REQUEST:
            return { loading: true };
        case ADD_ORDER_QUEUE_SUCCESS:
            return { loading: false, job_id: action.payload };
        case ADD_ORDER_QUEUE_FAIL:
            return { loading: false, error: action.payload, existOrder: true };

        case GET_ORDER_STATUS_REQUEST:
            return { loading: true };
        case GET_ORDER_STATUS_SUCCESS:
            return {
                loading: false,
                job_status: action.payload[0].status,
                order_id: action.payload[0].order_id,
            };
        case GET_ORDER_STATUS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

