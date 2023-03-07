import React, {useContext} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import InfoIcon from '@mui/icons-material/Info';
import Grid from '@mui/material/Grid';
import { CatsContext } from '../context-provider';
import { Button } from '../common/button';
import { SingleCat } from '../../constants/types';

interface CatsListProps {
    cats: SingleCat[];
}

/**
 * Component to display image grid with cats of specific breed
 * @param cats - array with images of the cats
 */
export const CatsList = ({ cats }: CatsListProps) => {
    const catsContext = useContext(CatsContext);
    const loadMoreCats = () => {
        catsContext.setPage(catsContext.page + 1);
    };
    return (
        <>
            <ImageList cols={3} rowHeight="auto" gap={30}>
                {cats.map(cat => (
                    <ImageListItem key={cat.id}>
                        <img src={cat.url} alt={cat.id}/>
                        <Button variant="contained" href={`/${cat.id}`} endIcon={<InfoIcon/>}>
                            View details
                        </Button>
                    </ImageListItem>
                ))}
            </ImageList>
            {/*Hide "Load more" button for the "last" page*/}
            {!catsContext.isLastPage && <Grid item xs={12} justifyContent="flex-start">
                <Button variant="contained" onClick={loadMoreCats}>Load more</Button>
            </Grid>}
        </>
    );
};
