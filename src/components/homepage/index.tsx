import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles'
import { BreedsContext, CatsContext } from '../context-provider'
import { CatsList } from './catsList';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const BoxContainer = styled(Box)({
    height: '100%',
    marginTop: '10px'
})

const Container = styled(Grid)({
    maxWidth: '1000px',
    margin: 'auto'
})

export const HomePage = () => {
    const breedsContext = useContext(BreedsContext);
    const catsContext = useContext(CatsContext);
    const handleSelectChange = (e: SelectChangeEvent) => {
        breedsContext?.setCurrentBreed(e.target.value);
    }

    return (
        <BoxContainer>
            <Container container spacing={3}>
                <Grid item xs={12} >
                    <Typography variant="h2">Cat Browser</Typography>
                </Grid>
                <Grid item xs={6}>
                    <InputLabel id="breed-select-label">Breed</InputLabel>
                    <Select
                        id="breed-select"
                        defaultValue=""
                        value={breedsContext?.currentBreed || ""}
                        onChange={handleSelectChange}
                        sx={{ minWidth: '240px' }}
                        MenuProps={MenuProps}
                    >
                        <MenuItem key="none" value="">None</MenuItem>
                        {breedsContext?.breeds.map(breed => (
                            <MenuItem key={breed.id} value={breed.id}>{breed.name}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                {catsContext.cats.length ?
                    <CatsList cats={catsContext.cats} /> :
                    <Grid item xs={12}>
                        <Typography variant="body1">No cats available</Typography>
                    </Grid>
                }
            </Container>
        </BoxContainer>
    );
}
