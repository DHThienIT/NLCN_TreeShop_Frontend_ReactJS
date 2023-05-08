import React, { useRef } from "react"; 

const Search = (props) => {
    const inputRef = useRef();          //useRef: cố định dữ liệu giữa các lần re-render, truy xuất giá trị đó qua thuộc tính current

    /*  <Search filterText={filterName}
    onFilterTextChange={handleChangeFilterProductsByName}/> */
    const handleFilterTextChange = (e) => {
        props.onFilterTextChange(e.target.value);  //from parent Component
    }

    return ( 
        <div className="col-sm-12  pb-5">
           {/* <form className="mb-3 mt-3"> */}
            <label>Tìm theo tên sản phẩm: {"   "}
                <input type="text" placeholder="Search..." className="form-control" 
                    value={props.filterText}                
                    onChange={handleFilterTextChange}
                    ref={inputRef}
                /> 
            </label>
            {/* </form> */}
        </div>
      );

}

export default Search;