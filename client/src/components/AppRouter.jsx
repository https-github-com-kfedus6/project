import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from '../pages/Home/Home';
import Flights from '../pages/Flights/Flights.jsx'
import Flight from '../pages/Flight/Flight';
import AboutUs from '../pages/AboutUs/AboutUs';
import { useEffect } from 'react';
import { useAction } from '../hooks/useAction';
import TinyMCE from './TinyMCE/TinyMCE';
import { useSelector } from 'react-redux';
import { ListBlog } from '../pages/Blog/ListBlog';
import Blog from '../pages/Blog/Blog';
import FAQ from '../pages/FAQ/FAQ';
import Account from '../pages/Account/Account';
import FlightOrders from '../pages/FlightOrders/FlightOrders';
import Error from '../pages/Error/Error'
import AboutUsEdit from '../pages/Admin/AboutUsEdit';
import BlogEdit from '../pages/Admin/BlogEdit';
import FAQEdit from '../pages/Admin/FAQEdit';
import FlightsEdit from '../pages/Admin/FlightsEdit';
import InfoCompanyEdit from '../pages/Admin/InfoCompanyEdit';
import NovetlyEdit from '../pages/Admin/NovetlyEdit';
import ResponceEdit from '../pages/Admin/ResponceEdit';

const AppRouter = () => {
    const { IsAuthorize } = useAction();
    const { is_login, is_admin } = useSelector(state => state.user);

    useEffect(() => {
        IsAuthorize();
    }, []);

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                {/*<Route path='flights' element={<Flights isShowFilter={false} />} />*/}
                <Route path='flightsCategory' element={<Flights isShowFilter={true} />} />
                <Route path='flight/:id' element={<Flight />} />
                <Route path='FAQ' element={<FAQ />} />
                <Route path='aboutUs' element={<AboutUs />} />
                <Route path='tinyMCE' element={<TinyMCE />} />
                <Route path='blog' element={<ListBlog />} />
                <Route path='blog/:id' element={<Blog />} />
                {is_admin ? <Route path='order' element={<FlightOrders />} /> : <></>}
                {is_admin ? <Route path='aboutUsEdit' element={<AboutUsEdit />} /> : <></>}
                {is_admin ? <Route path='blogEdit' element={<BlogEdit />} /> : <></>}
                {is_admin ? <Route path='faqEdit' element={<FAQEdit />} /> : <></>}
                {is_admin ? <Route path='flightsEdit' element={<FlightsEdit />} /> : <></>}
                {is_admin ? <Route path='infoCompanyEdit' element={<InfoCompanyEdit />} /> : <></>}
                {is_admin ? <Route path='novetlyEdit' element={<NovetlyEdit />} /> : <></>}
                {is_admin ? <Route path='responseEdit' element={<ResponceEdit />} /> : <></>}
                {is_login ? <Route path='account' element={<Account />} /> : <></>}
                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    )
}

export default AppRouter;