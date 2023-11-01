import { Fragment, useCallback, useEffect, useState } from "react";
import TreeItem_Grid from "./TreeItem_Grid";
import PageTransfer from "../../../common/PageTransfer";
import Notification from "../../Notification"
import { useDispatch, useSelector } from 'react-redux';
import { setConditionFilterChecked, setFilterBy, setSelectedPage, setSortBy } from "../../../actions/action";
import TreeItem_List from "./TreeItem_List";

const TreesGridArea = () => {
    let { listTree, numberOfTree } = useSelector(state => state.mainReducer)
    let { listTrackingListTree } = useSelector(state => state.accountReducer)
    let { filterBy, sortBy } = useSelector(state => state.filterTreeReducer)
    const dispatch = useDispatch()
    // console.log('actionFilter: ', actionFilter)
    const foundTrees = [];
    const [viewMode, setViewMode] = useState('GridView')
    const [notification, setNotification] = useState([])
    const [option, setOption] = useState(0)

    useEffect(() => {
        // console.log('*****option: ', sortBy + '  ' + filterBy)
        if (sortBy === "tree_id" && filterBy === "Decrease") setOption(0)
        else if (sortBy === "price" && filterBy === "Decrease") setOption(1)
        else if (sortBy === "price" && filterBy === "Increase") setOption(2)
    }, [sortBy, filterBy])

    const timeout = () => {
        setTimeout(() => {
            setNotification([])
        }, 4000)
    }

    const warningAddFollow = () => {
        setNotification(
            <Notification
                pushType='warning'
                pushTitle='Không thể thêm vào danh sách theo dõi'
                pushMessage={'Bạn cần phải đăng nhập để thực hiện hành động này.'}
            />
        )
        timeout()
    }

    const warningAddTreeToCart = (treeName) => {
        setNotification(
            <Notification
                pushType='warning'
                pushTitle='Xin hãy đăng nhập để thực hiện hành động này'
                pushMessage={'Không thể thêm ' + treeName + ' vào giỏ hàng.'}
            />
        )
        timeout()
    }

    const successAddTreeToCart = (treeName) => {
        setNotification(
            <Notification
                pushType='success'
                pushTitle='Thêm thành công'
                pushMessage={'Đã thêm ' + treeName + ' vào giỏ.'}
            />
        )
        timeout()
    }

    if (listTree && listTrackingListTree) {
        listTree.forEach((tree) => {
            let isFavoriteTree = false
            listTrackingListTree.forEach(check => {
                if (check.treeId === tree.treeId) {
                    isFavoriteTree = true
                }
            })
            if (viewMode === "GridView") {
                foundTrees.push(
                    <TreeItem_Grid
                        key={tree.treeName}
                        tree={tree}
                        isFavoriteTree={isFavoriteTree}
                        warningAddFavorite={warningAddFollow}
                        warningAddTreeToCart={warningAddTreeToCart}
                        successAddTreeToCart={successAddTreeToCart}
                    />
                );
            } else {
                foundTrees.push(
                    <TreeItem_List
                        key={tree.treeName}
                        tree={tree}
                        isFavoriteTree={isFavoriteTree}
                        warningAddFavorite={warningAddFollow}
                        warningAddTreeToCart={warningAddTreeToCart}
                        successAddTreeToCart={successAddTreeToCart}
                    />
                );
            }
        })
    }

    const handleClickOptionFilter = useCallback((option) => {
        let sortBy, filterBy
        if (option === 0) {
            sortBy = 'tree_id'
            filterBy = 'Decrease'
        }
        else if (option === 1) {
            sortBy = 'price'
            filterBy = 'Decrease'
        }
        else if (option === 2) {
            sortBy = "price"
            filterBy = 'Increase'
        }
        dispatch(setSortBy(sortBy))
        dispatch(setFilterBy(filterBy))
        dispatch(setConditionFilterChecked(true))
        dispatch(setSelectedPage(1))
        setOption(option)
    }, [])

    return (
        <Fragment>
            <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
                <strong className="d-block py-2">{numberOfTree} số sản phẩm đã tìm thấy</strong>
                <div className="ms-auto ">
                    <div className="btn-group">
                        <span
                            className={`btn btn-light ${viewMode === "GridView" ? 'bg-green-dark' : ''}`}
                            data-bs-toggle="tooltip"
                            title="Grid view"
                            onClick={() => setViewMode("GridView")}
                        >
                            <i
                                className="fa fa-th"
                                style={viewMode === "GridView" ? { color: '#ffffff' } : {}}
                            ></i>
                        </span>
                        <span
                            className={`btn btn-light ${viewMode === "ListView" ? 'bg-green-dark' : ''}`}
                            data-bs-toggle="tooltip"
                            title="List view"
                            onClick={() => setViewMode("ListView")}
                        >
                            <i
                                className="fa fa-bars"
                                style={viewMode === "ListView" ? { color: '#ffffff' } : {}}
                            ></i>
                        </span>
                    </div>
                </div>
            </header>

            <div className="d-flex justify-content-end">
                <select
                    className="form-select d-inline-block w-auto me-1"
                    onChange={(e) => { handleClickOptionFilter(parseInt(e.target.value)) }}
                    value={option}
                >
                    <option value="0" >Hàng mới nhất</option>
                    <option value="1" >Giá giảm dần</option>
                    <option value="2" >Giá tăng dần</option>
                </select>
            </div>
            {
                viewMode === "GridView" ? (
                    <div className="row">
                        {foundTrees}
                    </div>
                ) : (
                    <>
                        {foundTrees}
                    </>
                )
            }

            <hr />

            <PageTransfer
                listTree={listTree}
            />

            {notification}
        </Fragment>
    )
}

export default TreesGridArea;