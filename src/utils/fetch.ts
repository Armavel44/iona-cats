import axios from 'axios';
import {Dispatch} from 'react';

/**
 * axios get handler; displays notification on both successful and failed requests
 * @param url - request url
 * @param setOpen - dispatcher for setting open state of the notification
 * @param setSuccess - dispatcher for setting success/failure state of the notification
 */
export const axiosGet = async (url: string, setOpen: Dispatch<boolean>, setSuccess: Dispatch<boolean>) => {
    let data;
    await axios.get(url).then((res) => {
        data = res.data;
        setOpen(true);
        setSuccess(true);
    }).catch(() => {
        setOpen(true);
        setSuccess(false);
    });
    return data;
};
