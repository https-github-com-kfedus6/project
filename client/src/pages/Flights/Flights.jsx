import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FlightsList from '../../components/FlightsList';
import Pagination from '../../components/UI/pagination/Pagination';
import { useAction } from '../../hooks/useAction';
import { getPageCount, getPagesArray } from '../../utils/page';
import '../Flights/flights.css';

const Flights = () => {
    const [startPosition, setStartPosition] = useState('')
    const [finishPosition, setFinishPosition] = useState('')
    const [startDate, setStartDate] = useState('')
    const [totalCount, setTotalCount] = useState()
    const [limit, setLimit] = useState(3)
    const [page, setPage] = useState(1)

    const { fetchGetFlights } = useAction()

    const { flights } = useSelector(state => state.flights)

    useEffect(() => {
        fetchGetFlights({
            startPosition: startPosition,
            finishPosition: finishPosition,
            startDate: startDate,
            limit: limit,
            page: page
        })
    }, [limit, page])

    useEffect(() => {
        setTotalCount(getPageCount(flights.count))
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
            startDate: startDate
        })
    }

    return (
        <div className='flights'>
            <FlightsList
                flights={flights}
                sortFlights={sortFlights}
                setStartDate={setStartDate}
                setStartPosition={setStartPosition}
                setFinishPosition={setFinishPosition}
            />
            <Pagination
                flights={flights}
                pagesArray={pagesArray}
                page={page}
                limit={limit}
                changePage={changePage}
                moreFlights={moreFlights}
            />
        </div>
    )
}

export default Flights;