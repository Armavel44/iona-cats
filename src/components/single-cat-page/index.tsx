import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import { Button } from '../common/button';
import { API_URL } from '../../constants/url';
import { axiosGet } from '../../utils/fetch'

interface SingleCat {
    height: number;
    width: number;
    id: string;
    url: string;
    breeds: Breed[];
}

type Breed = {
    id: string;
    name: string;
    description: string;
    origin: string;
    temperament: string;
    wikipedia_url: string;
}

const StyledBox = styled(Box)({
    height: '100%'
});

const Container = styled(Grid)({
    maxWidth: '1000px',
    margin: 'auto',
    marginTop: '20px'
})

const LinkedButton = styled('a')({
    textDecoration: 'none',
})

const CatImage = styled('img')({
    borderRadius: '10px'
})

export const SingleCatPage = (props) => {
    const { id } = useParams();
    const [catInfo, setCatInfo] = useState<SingleCat | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    useEffect(() => {
        async function fetchData() {
            const data = await axiosGet(`${API_URL}/images/${id}`, setOpen, setSuccess);
            setCatInfo(data);
        }
        fetchData();
    }, [])
    const breed = catInfo?.breeds?.[0] || null;

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <StyledBox>
            <Container container spacing={3}>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    {success ?
                        <MuiAlert onClose={handleClose} severity="success">
                            This cat was successfully loaded to show it for you. Purr!
                        </MuiAlert> :
                        <MuiAlert onClose={handleClose} severity="error">
                            Apologies but we could not load this cat you at this time! Miau!
                        </MuiAlert>
                    }
                </Snackbar>
                <CatImage src={catInfo?.url} alt={breed?.name} />
                <Grid item xs={12}>
                    <Typography variant="h3">{breed?.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4">Origin: {breed?.origin}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">{breed?.temperament}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">{breed?.description}</Typography>
                </Grid>
                <Grid item xs={6} justifyContent="flex-start">
                    <Button variant="contained" href="/">Go back</Button>
                </Grid>
                <Grid item xs={6} justifyContent="flex-end">
                    <LinkedButton href={breed?.wikipedia_url} target="_blank">
                        <Button variant="contained">Go to Wiki</Button>
                    </LinkedButton>
                </Grid>
            </Container>
        </StyledBox>
    );
}
