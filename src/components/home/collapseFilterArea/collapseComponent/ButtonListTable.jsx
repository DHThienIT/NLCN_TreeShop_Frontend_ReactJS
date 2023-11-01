
const ButtonListTable = () => {
    return (
        <article class="filter-group">
            <header class="card-header">
                <a href="#" class="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside3">
                    <i class="icon-control fa fa-chevron-down"></i>  Size
                </a>
            </header>
            <div class="collapse show" id="collapse_aside3">
                <div class="card-body">
                    <label class="checkbox-btn">
                        <input type="checkbox" />
                        <span class="btn btn-light"> XS </span>
                    </label>

                    <label class="checkbox-btn">
                        <input type="checkbox" />
                        <span class="btn btn-light"> XS </span>
                    </label>

                    <label class="checkbox-btn">
                        <input type="checkbox" />
                        <span class="btn btn-light"> XS </span>
                    </label>

                    <label class="checkbox-btn">
                        <input type="checkbox" />
                        <span class="btn btn-light"> XS </span>
                    </label>
                </div>
            </div>
        </article>
    )
}

export default ButtonListTable;
