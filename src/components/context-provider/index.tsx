import React, {useContext, useState, useEffect, createContext, Dispatch} from 'react';
import uniqBy from 'lodash/uniqBy';
import { SingleCat, Breed } from '../../constants/types';
import { BREED_KEY } from '../../constants/localStorageKeys';
import { API_URL } from '../../constants/url';
import { axiosGet } from '../../utils/fetch';
import { Index } from '../notification';

export const BreedsContext = createContext<{
    breeds: Breed[], currentBreed?: string, setCurrentBreed: Dispatch<string>
}>({ breeds: [], currentBreed: '', setCurrentBreed: () => {} });

export const CatsContext = createContext<{
    cats: SingleCat[], page: number, setPage: Dispatch<number>, isLastPage: boolean
}>({ cats: [], page: 0, setPage: () => {}, isLastPage: false });

export function BreedsContextProvider({ children }: any) {
    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [currentBreed, setCurrentBreed] = useState<string>();
    const [open, setOpen] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    useEffect(() => {
        // store our currently selected breed in browser storage so it persists after page refreshes
        const selectedBreed = localStorage.getItem(BREED_KEY) || '';
        setCurrentBreed(selectedBreed);
        async function fetchData() {
            const data = await axiosGet(`${API_URL}/breeds`, setOpen, setSuccess);
            setBreeds(data);
        }
        fetchData();
    }, []);
    useEffect(() => {
        if (currentBreed === undefined) return;
        localStorage.setItem(BREED_KEY, currentBreed);
    }, [currentBreed]);
    return (
        <BreedsContext.Provider
            value={{ breeds, currentBreed, setCurrentBreed }}
        >
            <Index
                open={open}
                success={success}
                setOpen={setOpen}
                successMessage="Breeds loaded successfully. Purr!"
                failureMessage="Apologies but we could not load breeds for you at this time! Miau!"
            />
            {children}
        </BreedsContext.Provider>
    );
}

export function CatsContextProvider({ children }: any) {
    const [cats, setCats] = useState<SingleCat[]>([]);
    const [page, setPage] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const breedContext = useContext(BreedsContext);
    const fetchData = async (isNewBreed?: boolean) => {
        if (!breedContext.currentBreed) {
            setCats([]);
            return;
        }
        const data = await axiosGet(`${API_URL}/images/search?page=${page}&limit=10&breed_id=${breedContext?.currentBreed}`, setOpen, setSuccess);
        if (isNewBreed) {
            // after selecting new breed we can just fill the state with the new data
            setCats(data);
        } else {
            // only update state with unique values
            const updatedCats = uniqBy([...cats, ...data], 'id');
            if (cats.length === updatedCats.length) {
                // we can assume that if no new cats were loaded then our current page is the last page for selected breed
                // other way to do that is to implement an api with pagination support with total page and items counters
                setIsLastPage(true);
            }
            setCats(updatedCats);
        }
    };
    useEffect(() => {
        if (page === 0) {
            fetchData(true);
        } else {
            // because we are fetching new cats on every page change we can skip direct fetching and just update the page number
            // so we only fetch once with updated breed and page number
            setPage(0);
            setIsLastPage(false);
        }
    }, [breedContext.currentBreed]);

    useEffect(() => {
        // fetch new cats on every page change
        fetchData();
    }, [page]);

    return (
        <CatsContext.Provider
            value={{ cats, page, setPage, isLastPage }}
        >
            <Index
                open={open}
                success={success}
                setOpen={setOpen}
                successMessage="New cats loaded successfully. Purr!"
                failureMessage="Apologies but we could not load new cats for you at this time! Miau!"
            />
            {children}
        </CatsContext.Provider>
    );
}
