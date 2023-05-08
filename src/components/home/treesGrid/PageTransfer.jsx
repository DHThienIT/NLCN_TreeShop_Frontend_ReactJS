import { useState } from "react";

const PageTransfer = ({ numberOfTree, restartListTree }) => {
    let listPage = []
    for (let index = 0; index < parseInt(numberOfTree / 6 + 1); index++) {
        listPage.push(index + 1)
    }

    const [pageActive, setPageActive] = useState(1)

    const handleClickPageTransfer = (page) => {
        restartListTree(page - 1, 'treeId')
        setPageActive(page)
    }

    const handleClickPrevPage = () => {
        if (pageActive !== listPage[0]) {
            restartListTree(pageActive - 2, 'treeId')
            setPageActive(pageActive - 1)
        }
    }

    const handleClickNextPage = () => {
        if (pageActive !== listPage.length) {
            restartListTree(pageActive, 'treeId')
            setPageActive(pageActive + 1)
        }
    }

    return (
        <footer className="d-flex mt-4 justify-content-center">
            <nav className="ms-3">
                <ul className="pagination text-center">
                    <li className="page-item">
                        <a
                            className="page-link btn"
                            onClick={handleClickPrevPage}
                            style={{ width: "7rem", marginRight:"0.5rem" }}
                        >Về trước</a>
                    </li>
                    {listPage.map((page) => {
                        return (
                            <li
                                key={page}
                                className={`page-item ${pageActive === page ? 'active' : ''}`}
                            >
                                <a
                                    className="page-link"
                                    onClick={() => handleClickPageTransfer(page)}
                                >
                                    {page}
                                </a>
                            </li>
                        )
                    })}
                    <li className="page-item">
                        <a
                            className="page-link btn"
                            onClick={handleClickNextPage}
                            style={{ width: "7rem" }}
                        >Tiếp theo</a>
                    </li>
                    {/* <li className="page-item">
                        <a className="page-link" href="#">1</a>
                    </li>
                    <li className="page-item active" aria-current="page">
                        <span className="page-link">2</span>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">3</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">Next</a>
                    </li> */}
                </ul>
            </nav>
        </footer>
    )
}

export default PageTransfer;