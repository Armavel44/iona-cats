import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './App.css';
import { HomePage } from './components/homepage'
import { SingleCatPage } from './components/single-cat-page'
import { BreedsContextProvider, CatsContextProvider } from './components/context-provider'

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/:id",
        element: <SingleCatPage />
    }
])

function App() {
  return (
    <div className="App">
        <BreedsContextProvider>
            <CatsContextProvider>
                <RouterProvider router={router} />
            </CatsContextProvider>
        </BreedsContextProvider>
    </div>
  );
}

export default App;
