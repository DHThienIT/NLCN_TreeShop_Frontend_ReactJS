import { useState, useEffect } from "react";
import RootService from "../../../../services/rootService";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    getAllListTree,
    setListTree,
    setPathName,
    setNumberOfTree,
    setActionFilter,
    setMinFilterValue,
    setMaxFilterValue,
    setSortBy
} from "../../../../actions/action";

const MinMaxTable = () => {
    // console.log(turnOn)
    const navigate = useNavigate()
    let { actionFilter, filterMin, filterMax } = useSelector(state => state.filterTreeReducer)
    const dispatch = useDispatch()
    const [message, setMessage] = useState('');
    const [turnOn, setTurnOn] = useState(false);

    useEffect(() => {
        if (actionFilter !== 'priceListFilter2') {
            setTurnOn(false)
        }
    }, [actionFilter])

    const handleFilter = () => {
        if (!filterMin)
            setMessage('Chưa nhập giá tiền nhỏ nhất')
        else if (!filterMax)
            setMessage('Chưa nhập giá tiền lớn nhất')
        else if (parseInt(filterMin) >= parseInt(filterMax)) {
            setMessage('Giá tiền Max phải lớn hơn giá tiền Min')
        } else {
            setMessage('')
            RootService.TreeSearchService.searchTreesByMaxMinPrice(0, 'price', 'Decrease', filterMin, filterMax).then(
                (response) => {
                    dispatch(setListTree(response.data.trees.content))
                    dispatch(setNumberOfTree(response.data.numberTreeFound))
                }
            )
        }
    }

    const handleClickTurnOn = () => {
        setTurnOn(!turnOn)
        if (!turnOn) {
            dispatch(getAllListTree())
            dispatch(setPathName('Lọc theo giá tiền nhập vào'))
            dispatch(setActionFilter('priceListFilter2'))
            dispatch(setMinFilterValue(0))
            dispatch(setMaxFilterValue(0))
            dispatch(setSortBy('price'))
        } else {
            dispatch(getAllListTree())
            dispatch(setPathName('Toàn bộ'))
            dispatch(setActionFilter('none'))
            dispatch(setSortBy('tree_id'))
        }

    }

    return (
        <article className="filter-group">
            <header className="card-header">
                <span className="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside2">
                    <i className="icon-control fa fa-chevron-down"></i>  Lọc giá
                </span>
            </header>
            <div className="collapse show" id="collapse_aside2">
                <div className="card-body">
                    <label className="form-check mb-2" >
                        <input
                            id="check"
                            type="checkbox"
                            className="form-check-input"
                            onChange={handleClickTurnOn}
                            checked={turnOn}
                        />
                        <span className="form-check-label"> Sử dụng lọc giá</span>
                    </label>
                    {turnOn && (
                        <div>
                            <form>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <label htmlFor="min" className="form-label">Nhỏ nhất</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="min"
                                            placeholder="0đ"
                                            onChange={(e) => {
                                                dispatch(setMinFilterValue(e.target.value))
                                            }}
                                        />
                                    </div>

                                    <div className="col-6">
                                        <label htmlFor="max" className="form-label">Lớn nhất</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="max"
                                            placeholder="10.000đ"
                                            onChange={(e) => {
                                                dispatch(setMaxFilterValue(e.target.value))
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.code === 'Enter') {
                                                    handleFilter(); // Gọi hàm handleFilter khi Enter được nhấn
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <span className="d-flex justify-content-center filter-price">
                                    {filterMin.toLocaleString('vi-VN')} đ{' < giá < '}{filterMax.toLocaleString('vi-VN')} đ
                                </span>
                                {message && (
                                    <div className="row mb-3">
                                        <div className="alert alert-danger" role="alert">
                                            {message}
                                        </div>
                                    </div>
                                )}
                                <button
                                    type="button"
                                    className="btn btn-light w-100"
                                    style={{ border: "1px solid rgb(181 181 181)" }}
                                    onClick={handleFilter}
                                >
                                    Lọc
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </article>
    )
}

export default MinMaxTable;