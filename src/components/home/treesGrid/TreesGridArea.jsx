import { Fragment, useState } from "react";
import TreeItem from "./TreeItem";
import PageTransfer from "./PageTransfer";
import Notification from "../../Notification"

const TreesGridArea = ({ listTree, currentUser, numberOfTree, listTrackingListTree, restartListTree, handleRestartTrackingList }) => {
    if (!listTree) listTree = []
    const foundTrees = [];
    const [notification, setNotification] = useState([])

    const timeout = () => {
        setTimeout(() => {
            setNotification([])
            console.log('123456789')
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

    listTree.forEach((tree) => {
        foundTrees.push(
            <TreeItem
                key={tree.treeName}
                tree={tree}
                listTrackingListTree={listTrackingListTree}
                currentUser={currentUser}
                warningAddFavorite={warningAddFollow}
                warningAddTreeToCart={warningAddTreeToCart}
                successAddTreeToCart={successAddTreeToCart}
                handleRestartTrackingList={handleRestartTrackingList}
            />
        );
    })

    return (
        <Fragment>
            <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
                <strong className="d-block py-2">{foundTrees.length} số sản phẩm đã tìm thấy</strong>
                <div className="ms-auto ">
                    <select className="form-select d-inline-block w-auto me-1">
                        <option value="0">Best match</option>
                        <option value="1">Recommended</option>
                        <option value="2">High rated</option>
                        <option value="3">Randomly</option>
                    </select>
                    <div className="btn-group">
                        <span className="btn btn-light" data-bs-toggle="tooltip" title="List view">
                            <i className="fa fa-bars"></i>
                        </span>
                        <span className="btn btn-light" data-bs-toggle="tooltip" title="Grid view">
                            <i className="fa fa-th"></i>
                        </span>
                    </div>
                </div>
            </header>

            <div className="row">
                {foundTrees}
            </div>
            <hr />

            <PageTransfer numberOfTree={numberOfTree} listTree={listTree} restartListTree={restartListTree}/>

            {notification}
        </Fragment>
    )
}

export default TreesGridArea;