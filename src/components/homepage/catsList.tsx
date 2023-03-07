import React, {useContext} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import InfoIcon from "@mui/icons-material/Info";
import Grid from "@mui/material/Grid";
import { CatsContext } from '../context-provider'
import { Button } from '../common/button'
import { SingleCat } from '../../constants/types'

interface CatsListProps {
    cats: SingleCat[];
}

export const CatsList = (props: CatsListProps) => {
    const catsContext = useContext(CatsContext);
    const loadMoreCats = () => {
        catsContext.setPage(catsContext.page + 1);
    }
    return (
        <>
            <ImageList cols={3} rowHeight="auto" gap={30}>
                {props.cats.map(cat => (
                    <ImageListItem key={cat.id}>
                        <img src={cat.url} alt={cat.id}/>
                        <Button variant="contained" href={`/${cat.id}`} endIcon={<InfoIcon/>}>
                            View details
                        </Button>
                    </ImageListItem>
                ))}
            </ImageList>
            {!catsContext.isLastPage && <Grid item xs={12} justifyContent="flex-start">
                <Button variant="contained" onClick={loadMoreCats}>Load more</Button>
            </Grid>}
        </>
    );
}
