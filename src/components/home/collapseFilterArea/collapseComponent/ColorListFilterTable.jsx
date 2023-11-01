import { useSelector } from "react-redux";
import RootService from "../../../../services/rootService";
import { getAllListTree, setActionFilter, setColorListFilter, setColorListSelected, setFilterBy, setListTree, setNumberOfTree, setPathName, setSelectedPage, setSortBy } from "../../../../actions/action";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const ColorListFilterTable = () => {
    const { actionFilter, colorListFilter, colorListSelected, sortBy, filterBy } = useSelector(state => state.filterTreeReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        RootService.TreeSearchService.getColorList().then(
            (response) => {
                dispatch(setColorListFilter(response.data))
            }
        )

    }, [])

    useEffect(() => {
        // console.log(actionFilter);
        if (actionFilter !== 'colorListFilter') {
            dispatch(setColorListSelected([]))
        } else if (actionFilter === 'colorListFilter') {
            RootService.TreeSearchService.searchTreesByColor(0, sortBy, filterBy, colorListSelected).then(
                (response) => {
                    dispatch(setListTree(response.data.content))
                    console.log(response);
                }
            )
        }
    }, [actionFilter, sortBy, filterBy])

    const handleCheckedColor = (checkId) => {
        dispatch(setPathName('Lọc theo đặc sắc màu cây'))
        dispatch(setActionFilter('colorListFilter'))
        dispatch(setSortBy('tree_id'))
        dispatch(setFilterBy('Decrease'))

        const newList = [...colorListSelected];
        if (!newList.includes(checkId)) {
            newList.push(checkId);
        } else {
            newList.splice(newList.indexOf(checkId), 1)
        }
        dispatch(setColorListSelected(newList))
        // console.log('222222222222222222222222222');

        RootService.TreeSearchService.searchTreesByColor(0, 'tree_id', 'Decrease', newList).then(
            (response) => {
                dispatch(setListTree(response.data.content))
                dispatch(setNumberOfTree(response.data.totalElements))
            }
        )
    }

    const handleRestartAll = () => {
        dispatch(setActionFilter('none'))
        dispatch(setPathName('Toàn bộ'))
        dispatch(setSortBy('tree_id'))
        dispatch(setFilterBy('Decrease'))
        dispatch(setColorListSelected([]))
        dispatch(getAllListTree())
        navigate('/data')
    }

    return (
        <article className="filter-group">
            <header className="card-header">
                <a href="#" className="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside4">
                    <i className="icon-control fa fa-chevron-down"></i> Đặc sắc màu cây
                </a>
            </header>
            <div className="collapse show" id="collapse_aside4">
                <div className="card-body row">
                    {
                        colorListFilter.map((color, index) => {
                            return (
                                <div key={index}>
                                    <label
                                        className="checkbox-btn col-3"
                                    >
                                        <div
                                            className="checkbox-btn"
                                        >
                                            {color.colorName !== 'NONE' ? (
                                                <>
                                                    <input
                                                        type="checkbox"
                                                        onChange={() => handleCheckedColor(index)}
                                                        key={index}
                                                    />
                                                    {
                                                        colorListSelected.includes(index) ? (
                                                            <span
                                                                className="btn btn-color-flower checked"
                                                                style={{ backgroundColor: `${color.hexColorCode}` }}
                                                            >
                                                                <i className="fa fa-check" htmlFor={index}></i>
                                                            </span>
                                                        ) : (
                                                            <span
                                                                className="btn btn-color-flower check"
                                                                style={{ backgroundColor: `${color.hexColorCode}` }}
                                                            >
                                                            </span>
                                                        )
                                                    }
                                                </>
                                            ) : (
                                                <>
                                                    <input
                                                        type="checkbox"
                                                        key={index}
                                                    />
                                                    <span
                                                        className="btn btn-color-flower"
                                                        style={{ backgroundColor: `${color.hexColorCode}` }}
                                                        onClick={handleRestartAll}
                                                    >
                                                        <i className="fa fa-ban" htmlFor={index}></i>
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </article>
    )
}

export default ColorListFilterTable;
