import {
    PRODUCTS_LIST_FAIL,
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,
} from "../constants/productConstants";
import axios from "axios";

export const listProducts = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCTS_LIST_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`http://localhost:8080/api/products`, config);

        dispatch({
            type: PRODUCTS_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: PRODUCTS_LIST_FAIL,
            payload: message,
        });
    }
};


