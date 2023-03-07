import React from 'react';
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

const DefaultButton = styled(MuiButton)({
    width: '160px',
    marginTop: '10px',
    marginBottom: '10px'
});

/**
 * Default button for use in the application
 */
export const Button = (props) => {
    return (
        <DefaultButton {...props} />
    );
};
