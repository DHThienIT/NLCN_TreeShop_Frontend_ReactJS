
import { useState, useEffect } from 'react'
import RootService from '../../../../services/rootService'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import {
    setActionFilter,
    setListTree,
    setMinFilterValue,
    setMaxFilterValue,
    setNumberOfTree,
    setPathName,
    setPriceListFilter,
    setTextSearch,
    setSortBy,
    getAllListTree,
    setSelectedPage,
    setFilterBy,
} from "../../../../actions/action";

const PriceListFilterTable = () => {
    const navigate = useNavigate()
    const {
        actionFilter,
        sortBy,
        filterBy,
        priceListFilter,
        filterMin,
        filterMax
    } = useSelector(state => state.filterTreeReducer)
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(0)
    
    useEffect(() => {
        if (actionFilter !== 'priceListFilter') {
            setChecked(0)
        } else if (actionFilter === 'priceListFilter') {
            console.log('222222222222222222222222222');
            RootService.TreeSearchService.searchTreesByMaxMinPrice(0, sortBy, filterBy, filterMin, filterMax).then(
                (response) => {
                    dispatch(setListTree(response.data.trees.content))
                }
            )
        }
    }, [actionFilter, sortBy, filterBy])

    useEffect(() => {
        RootService.TreeSearchService.getPriceList().then(
            (response) => {
                dispatch(setPriceListFilter(response.data))
            }
        )
    }, [])

    const handleFilterTreeByMinMaxPrice = (index, min, max) => {
        if (min === 0 && max === 0) {
            dispatch(getAllListTree())
            dispatch(setPathName('Toàn bộ'))
            dispatch(setActionFilter('none'))
            dispatch(setSortBy('tree_id'))
            dispatch(setFilterBy('Decrease'))
            navigate('/data')
        } else {
            dispatch(setTextSearch(''))
            dispatch(setPathName('Lọc theo khung giá'))
            dispatch(setActionFilter('priceListFilter'))
            dispatch(setSortBy('price'))
            dispatch(setFilterBy('Decrease'))
            dispatch(setSelectedPage(1))
            setChecked(index)
            RootService.TreeSearchService.searchTreesByMaxMinPrice(0, sortBy, filterBy, min, max).then(
                (response) => {
                    console.log('++++: ', response.data.trees.content)
                    dispatch(setListTree(response.data.trees.content))
                    dispatch(setNumberOfTree(response.data.numberTreeFound))
                    dispatch(setMinFilterValue(min))
                    dispatch(setMaxFilterValue(max))
                }
            )
        }
    }

    return (
        <article className="filter-group">
            <header className="card-header">
                <span className="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside1">
                    <i className="icon-control fa fa-chevron-down"></i> Khung giá
                </span>
            </header>
            <div className="collapse show" id="collapse_aside1">
                <div className="card-body ">
                    {
                        priceListFilter.map((price, index) => {
                            // console.log(price)
                            return (
                                <label
                                    key={index}
                                    className="form-check mb-2"
                                >
                                    <input
                                        id={index}
                                        type="radio"
                                        className="form-check-input"
                                        onChange={() => handleFilterTreeByMinMaxPrice(index, price.min, price.max)}
                                        checked={checked === index}
                                    />
                                    <span className="form-check-label" htmlFor={index}>
                                        {price.min === 0 && price.max === 0 && ('Tất cả')}
                                        {price.min === 0 && price.max !== 0 && ('< ' + price.max.toLocaleString('vi-VN') + ' đ')}
                                        {price.min !== 0 && price.max !== 0 && (price.min.toLocaleString('vi-VN') + ' - ' + price.max.toLocaleString('vi-VN') + ' đ')}
                                        {price.min !== 0 && price.max === 0 && ('> ' + price.min.toLocaleString('vi-VN') + ' đ')}
                                    </span>
                                </label>
                            )
                        })
                    }
                </div>
            </div>
        </article>
    )
}

export default PriceListFilterTable;
