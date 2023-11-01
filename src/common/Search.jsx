import React, { useRef, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setTextSearch, setListTree, setNumberOfTree, setPathName, setActionFilter, getAllListTree } from '../actions/action'
import RootService from "../services/rootService";

const Search = () => {
    const inputRef = useRef();
    const { textSearch } = useSelector(state => state.filterTreeReducer)
    const dispatch = useDispatch()

    const handleFilterTextChange = useCallback((text) => {
        dispatch(setTextSearch(text))
        if (!text) {
            dispatch(setTextSearch(''))
            dispatch(setPathName('Toàn bộ'))
            dispatch(getAllListTree())
        }
    }, [])

    const handleEnterSearch = useCallback((text) => {
        dispatch(setPathName('Lọc theo tên cây'))
        if (text) {
            RootService.TreeSearchService.searchTreesByText(text).then(
                (response) => {
                    dispatch(setListTree(response.data));
                    dispatch(setNumberOfTree(response.data.length))
                }
            );
        }
    }, [])

    return (
        <div className="col-sm-12">
            <div className="input-group">
                <input
                    ref={inputRef}
                    type="search"
                    className="form-control"
                    style={{ width: "55%" }}
                    placeholder="Tìm kiếm..."
                    value={textSearch}
                    onChange={(e) => handleFilterTextChange(e.target.value)}
                    onClick={()=> dispatch(setActionFilter('none'))}
                    onKeyDown={e => (e.code === 'Enter' || e.code === 'NumpadEnter') ? handleEnterSearch(textSearch) : ""}
                />
                <button
                    className="btn btn-success"
                    onClick={() => handleEnterSearch(textSearch)}
                >
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </div>
    );

}

export default Search;