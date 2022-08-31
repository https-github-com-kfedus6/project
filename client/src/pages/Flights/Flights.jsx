import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FlightsList from '../../components/FlightsList';
import Pagination from '../../components/UI/pagination/Pagination';
import { useAction } from '../../hooks/useAction';
import { getPageCount, getPagesArray } from '../../utils/page';
import ModalFormBuy from '../../components/UI/modalFormBuy/ModalFormBuy';

import './flights.css';

const Flights = ({ isShowFilter }) => {
    const [visibleBuy, setVisiblyBuy] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const {startPositionInitial,finishPositionInitial,dateInitial}=useSelector(state=>state.flightsSearchWithHomeReducer)

    const [startPosition, setStartPosition] = useState(startPositionInitial)
    const [finishPosition, setFinishPosition] = useState(finishPositionInitial)
    const [startDate, setStartDate] = useState(dateInitial)
    const [totalCount, setTotalCount] = useState()
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)

    const [sumYoung, setSumYoung] = useState(0)
    const [sumOld, setSumOld] = useState(1)

    const { fetchGetFlights, fetchDeleteFlight } = useAction()

    const { flights } = useSelector(state => state.flights)

   
    useEffect(() => {
        fetchGetFlights({
            startPosition: startPosition,
            finishPosition: finishPosition,
            startDate: startDate,
            countFreePlace: sumYoung + sumOld,
            limit: limit,
            page: page
        })
    }, [limit, page])

    useEffect(() => {
        setTotalCount(getPageCount(flights.count, limit))
    }, [flights])

    let pagesArray = getPagesArray(totalCount)

    const changePage = (page) => {
        setPage(page)
    }

    const moreFlights = () => {
        setLimit(limit + 3)
    }

    const sortFlights = (event) => {
        event.preventDefault()
        fetchGetFlights({
            startPosition: startPosition,
            finishPosition: finishPosition,
            startDate: startDate,
            countFreePlace: sumYoung + sumOld,
            limit: limit,
            page: page
        })
    }

    const deleteFlight = (id) => {
        fetchDeleteFlight(id)
    }

    const reserveTicket = () => {
        setVisiblyBuy(false)
        console.log(name, phone)
        setName('')
        setPhone('')
    }

    const openModal = (id) => {
        setVisiblyBuy(true)
        console.log(id)
    }

    return (
        <div className='flights'>
            <FlightsList
                flights={flights}
                sortFlights={sortFlights}
                setStartDate={setStartDate}
                setStartPosition={setStartPosition}
                setFinishPosition={setFinishPosition}
                sumOld={sumOld}
                setSumOld={setSumOld}
                sumYoung={sumYoung}
                setSumYoung={setSumYoung}
                deleteFlight={deleteFlight}
                limit={limit}
                page={page}
                isFilterTrue={isShowFilter}
                openModal={openModal}
            />
            <Pagination
                flights={flights}
                pagesArray={pagesArray}
                page={page}
                limit={limit}
                changePage={changePage}
                moreFlights={moreFlights}
            />
            <ModalFormBuy
                visibleBuy={visibleBuy}
                setVisiblyBuy={setVisiblyBuy}
                name={name}
                setName={setName}
                phone={phone}
                setPhone={setPhone}
                reserveTicket={reserveTicket}
            />
        </div>
    )
}

export default Flights;