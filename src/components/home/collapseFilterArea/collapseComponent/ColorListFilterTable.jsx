const ColorListFilterTable = ({ colorListFilter, onCheckedColor }) => {

    return (
        <article className="filter-group">
            <header className="card-header">
                <a href="#" className="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside4">
                    <i className="icon-control fa fa-chevron-down"></i>  {colorListFilter[0].name}
                </a>
            </header>
            <div className="collapse show" id="collapse_aside4">
                <div className="card-body row">
                    {
                        colorListFilter[0].list.map((folowerColor, index) => {
                            return (
                                <label
                                    key={index}
                                    className="checkbox-btn col-3"
                                >
                                    <div
                                        className="checkbox-btn"
                                        onClick={() => { }}
                                    >
                                        <input
                                            type="checkbox"
                                            onChange={() => onCheckedColor(index)}
                                            key={index}
                                        />
                                        {/* {console.log('x-----', folowerColor.checked)} */}
                                        {folowerColor.checked ? (
                                            <span
                                                className="btn btn-color-flower checked"
                                                style={{ backgroundColor: `${folowerColor.color}` }}
                                            >
                                                <i className="fa fa-check" htmlFor={index}></i>
                                            </span>
                                        ) : (
                                            <span
                                                className="btn btn-color-flower check"
                                                style={{ backgroundColor: `${folowerColor.color}` }}
                                            >
                                            </span>
                                        )}
                                    </div>
                                </label>
                            )
                        })
                    }
                </div>
            </div>
        </article>
    )
}

export default ColorListFilterTable;
