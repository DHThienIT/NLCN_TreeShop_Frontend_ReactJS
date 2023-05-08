
import { useState, useEffect } from 'react'
import TreeSearchService from '../../../../services/treeSearch.service'
import { useNavigate } from 'react-router-dom'

const PriceListFilterTable = ({ priceList, filterTableUsed, onChangePathName }) => {
    const navigate = useNavigate()
    const [checked, setChecked] = useState(0)

    useEffect(() => {
        if (filterTableUsed !== 'OnlyUsePriceListFilterTable') {
            setChecked(0)
        }
    }, [filterTableUsed])

    const handleFilterTreeByMinMaxPrice = (index, min, max) => {
        onChangePathName('Lọc theo khung giá')
        setChecked(index)
        // console.log(min, max)
        TreeSearchService.searchTreesByMaxMinPrice(min, max).then(
            (response) => {
                // console.log(response.data)
                if (min === 0 && max === 0)
                    navigate('/data')
                else navigate('/data', { state: { listTreeFromPriceListFilterTable: response.data } })
            }
        )
    }

    return (
        <article className="filter-group">
            <header className="card-header">
                <span className="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside1">
                    <i className="icon-control fa fa-chevron-down"></i> {priceList[0].name}
                </span>
            </header>
            <div className="collapse show" id="collapse_aside1">
                <div className="card-body ">
                    {
                        priceList[0].list.map((price, index) => {
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
