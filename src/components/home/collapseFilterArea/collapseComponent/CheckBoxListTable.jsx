
const CheckBoxListTable = () => {
    return (
        <article className="filter-group">
            <header className="card-header">
                <a href="#" className="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside_brands">
                    <i className="icon-control fa fa-chevron-down"></i>  Brands
                </a>
            </header>
            <div className="collapse show" id="collapse_aside_brands">
                <div className="card-body">
                    <label className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" value="" onChange={()=>{}} checked />
                        <span className="form-check-label"> Mercedes </span>
                        <b className="badge rounded-pill bg-gray-dark float-end">120</b>
                    </label>

                    <label className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" value="" onChange={()=>{}} />
                        <span className="form-check-label"> Toyota </span>
                        <b className="badge rounded-pill bg-gray-dark float-end">15</b>
                    </label>

                    <label className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" value="" onChange={()=>{}} />
                        <span className="form-check-label"> Mitsubishi </span>
                        <b className="badge rounded-pill bg-gray-dark float-end">35</b>
                    </label>

                    <label className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" value="" onChange={()=>{}} />
                        <span className="form-check-label"> Nissan </span>
                        <b className="badge rounded-pill bg-gray-dark float-end">89</b>
                    </label>

                    <label className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" value="" onChange={()=>{}} />
                        <span className="form-check-label"> Honda </span>
                        <b className="badge rounded-pill bg-gray-dark float-end">30</b>
                    </label>

                    <label className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" value="" onChange={()=>{}} />
                        <span className="form-check-label"> Honda accord </span>
                        <b className="badge rounded-pill bg-gray-dark float-end">30</b>
                    </label>
                </div>
            </div>
        </article>
    )
}

export default CheckBoxListTable;
