import { useState } from "react";
import TreeSearchService from "../../../../services/treeSearch.service";
import { useNavigate } from "react-router-dom";

const MinMaxTable = ({ turnOn, onTurnOn, onChangePathName }) => {
    // console.log(turnOn)
    const navigate = useNavigate()
    const [filterMin, setFilterMin] = useState(0);
    const [filterMax, setFilterMax] = useState(10000);
    const [message, setMessage] = useState('');

    const handleValue = () => {
        if (!filterMin || !filterMax) {
            setMessage('Bạn chưa nhập 1 trong 2 ô giá tiền Min và Max')
        }
        else if (parseInt(filterMin) >= parseInt(filterMax)) {
            setMessage('Giá tiền Max phải lớn hơn giá tiền Min')
        } else {
            TreeSearchService.searchTreesByMaxMinPrice(filterMin, filterMax).then(
                (response) => {
                    // console.log(response.data)
                    if (!turnOn) navigate('/data')
                    else navigate('/data', { state: { listTreeFromMinMaxTable: response.data } })
                }
            )
        }
    }

    const handleClickTurnOn = () => {
        onChangePathName('Lọc theo giá tiền nhập vào')
        onTurnOn()
        if (!turnOn)
            navigate('/data', { state: { listTreeFromMinMaxTable: [] } })
        else navigate('/data')
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
                                        <label htmlFor="min" className="form-label">Min</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="min"
                                            placeholder="0đ"
                                            onChange={(e) => {
                                                setFilterMin(e.target.value)
                                            }}
                                        />
                                    </div>

                                    <div className="col-6">
                                        <label htmlFor="max" className="form-label">Max</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="max"
                                            placeholder="10.000đ"
                                            onChange={(e) => {
                                                setFilterMax(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>
                                <span className="d-flex justify-content-center filter-price">
                                    {filterMin} đ{' < giá < '}{filterMax} đ
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
                                    onClick={handleValue}
                                >
                                    Apply
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