import { useDispatch, useSelector } from "react-redux";
import { setPlantingPlaceListFilter, setPathName } from "../../../../actions/action";

const PlantingPlaceListFilterTable = () => {
    const { plantingPlaceListFilter } = useSelector(state => state.filterTreeReducer)
    const dispatch = useDispatch()

    const handleCheckedPlantingPlace = (checkId) => {
        dispatch(setPathName('Lọc theo vị trí kho'))
        const newList = [...plantingPlaceListFilter];
        newList[0].list[checkId].checked = !plantingPlaceListFilter[0].list[checkId].checked;
        dispatch(setPlantingPlaceListFilter(newList))
    }

    return (
        <article className="filter-group">
            <header className="card-header">
                <a href="#" className="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside3">
                    <i className="icon-control fa fa-chevron-down"></i>  {plantingPlaceListFilter[0].name}
                </a>
            </header>
            <div className="collapse show" id="collapse_aside3">
                <div className="card-body">
                    {
                        plantingPlaceListFilter[0].list.map((place, index) => {
                            return (
                                <label
                                    key={index}
                                    className="form-check mb-2"
                                >
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        onChange={() => handleCheckedPlantingPlace(index)}
                                        checked={place.checked}
                                    />
                                    <span className="form-check-label"> {place.stock} </span>
                                    <b className="badge rounded-pill bg-gray-dark float-end">20</b>
                                </label>
                            )
                        })
                    }
                </div>
            </div>
        </article>
    )
}

export default PlantingPlaceListFilterTable;
