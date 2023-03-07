import axios from 'axios';
import {Dispatch} from 'react';

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
