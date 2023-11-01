
const MenuListTable = () => {
    return (
        <article className="filter-group">
            <header className="card-header">
                <a href="#" className="title" data-bs-toggle="collapse" data-bs-target="#collapse_aside1">
                    <i className="icon-control fa fa-chevron-down"></i>   Related items
                </a>
            </header>
            <div className="collapse show" id="collapse_aside1">
                <div className="card-body">
                    <ul className="list-menu">
                        <li><a href="#">Electronics </a></li>
                        <li><a href="#">Accessories  </a></li>
                        <li><a href="#">Home items </a></li>
                        <li><a href="#">Men's clothing </a></li>
                        <li><a href="#">Interior items </a></li>
                        <li><a href="#">Magazines </a></li>
                        <li><a href="#">Category name </a></li>
                        <li><a href="#">Home items </a></li>
                    </ul>
                </div>
            </div>
        </article>
    )
}

export default MenuListTable;