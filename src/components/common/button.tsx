import React from 'react';
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

const DefaultButton = styled(MuiButton)({
    width: '160px',
    marginTop: '10px',
    marginBottom: '10px'
});

export const Button = (props) => {
    return (
        <DefaultButton {...props} />
    );
};
