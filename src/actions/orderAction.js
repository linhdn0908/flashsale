import {
    ADD_ORDER_QUEUE_FAIL,
    ADD_ORDER_QUEUE_REQUEST,
    ADD_ORDER_QUEUE_SUCCESS,
    GET_ORDER_STATUS_FAIL,
    GET_ORDER_STATUS_REQUEST,
    GET_ORDER_STATUS_SUCCESS
} from "../constants/orderConstants";
import axios from "axios";

export const addOrderQueue = (user_id, product_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_ORDER_QUEUE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            "http://localhost:8080/api/orders/queues",
            { user_id, product_id },
            config
        );

        dispatch({ type: ADD_ORDER_QUEUE_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: ADD_ORDER_QUEUE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const getOrderStatusByJobID = (job_id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ORDER_STATUS_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`http://localhost:8080/api/orders/${job_id}`, config);

        dispatch({
            type: GET_ORDER_STATUS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: GET_ORDER_STATUS_FAIL,
            payload: message,
        });
    }
};