import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import RootService from "../services/rootService"
import UtilityFunctions from "../utils/utilityFunctions";
import { setListTree, setListPage, setSelectedPage } from "../actions/action";

const PageTransfer = () => {
    const { numberOfTree } = useSelector(state => state.mainReducer)
    const { actionFilter, sortBy, filterBy, filterMin, filterMax, colorListSelected } = useSelector(state => state.filterTreeReducer)
    const { listPage, selectedPage } = useSelector(state => state.paginationReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        let listPage = []
        for (let index = 0; index < parseInt(numberOfTree / 6 + 1); index++) {
            listPage.push(index + 1)
        }
        dispatch(setListPage(listPage))
    }, [numberOfTree])

    useEffect(() => {
        const handleScroll = () => { }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        };
    }, []);

    const handleClickPageTransfer = (page) => {
        if (actionFilter === 'none') {
            RootService.TreeService.getAllListTree(page - 1, 'treeId').then(
                (response) => {
                    dispatch(setListTree(response.data.content))
                }
            )
        } else if (actionFilter === 'priceListFilter') {
            // console.log('xxxxxxxxxxxxxxx: ', page -1 );
            RootService.TreeSearchService.searchTreesByMaxMinPrice(page - 1, sortBy, filterBy, filterMin, filterMax)
                .then(
                    (response) => {
                        // console.log('++++: ', response.data)
                        dispatch(setListTree(response.data.trees.content))
                    }
                )
        } else if (actionFilter === 'colorListFilter') {
            console.log('xxxxxxxxxxxxxxx: ');
            RootService.TreeSearchService.searchTreesByColor(page - 1, sortBy, filterBy, colorListSelected).then(
                (response) => {
                    // console.log(response);
                    dispatch(setListTree(response.data.content))
                }
            )
        }
        dispatch(setSelectedPage(page))
        UtilityFunctions.handleScrollToTop()
    }

    return (
        <footer className="d-flex mt-4 justify-content-center">
            <nav className="ms-3">
                <ul className="pagination text-center">
                    {listPage.map((page) => {
                        return (
                            <li
                                key={page}
                                className={`page-item ${selectedPage === page ? 'active' : ''}`}
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
                </ul>
            </nav>
        </footer>
    )
}

export default PageTransfer;