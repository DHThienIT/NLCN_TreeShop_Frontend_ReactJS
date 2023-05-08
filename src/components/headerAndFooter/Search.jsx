import React, { useRef } from "react";

const Search = ({ text, onFilterTextChange, onEnterSearch }) => {
    const inputRef = useRef();
    
    return (
        <div className="col-sm-12">
            <div className="input-group">
                <input
                    ref={inputRef}
                    type="search"
                    className="form-control"
                    style={{ width: "55%" }}
                    placeholder="Tìm kiếm..."
                    value={text}
                    onChange={(e) => onFilterTextChange(e.target.value)}
                    onKeyDown={e => (e.code === 'Enter' || e.code === 'NumpadEnter') ? onEnterSearch(text) : ""}
                />
                <button
                    className="btn btn-success"
                    onClick={() => onEnterSearch(text)}
                >
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </div>
    );

}

export default Search;