import ShowProducts from '../../components/ShowProducts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateProducts from '../../components/CreateProducts';
import EditProduct from '../../components/EditProduct';

export default function Welcome() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <ShowProducts/>}></Route>
                    <Route path='/create' element={ <CreateProducts/>}></Route>
                    <Route path='/edit/:id' element={ <EditProduct/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
