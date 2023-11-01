import { Fragment, } from "react";
import TrackingListTreeItem from "./TrackingListTreeItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const TrackingListTreeArea = () => {
    const { currentUser } = useSelector(state => state.accountReducer)
    let { listTrackingListTree } = useSelector(state => state.accountReducer)

    const foundTrackingListTree = []
    const navigate = useNavigate()

    listTrackingListTree.forEach((tree) => {
        foundTrackingListTree.push(
            <TrackingListTreeItem
                key={tree.treeId}
                tree={tree}
            />
        );
    })

    return (
        <Fragment>
            {(currentUser && (
                <aside className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvas_trackingList">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title">Danh sách theo dõi ({foundTrackingListTree.length}) </h5>
                        <button
                            type="button"
                            className="btn-close text-reset"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="offcanvas-body">
                        {foundTrackingListTree}
                        {foundTrackingListTree.length === 0 && (
                            <div className="d-flex flex-column align-items-center">
                                <img src="https://cdn4.iconfinder.com/data/icons/flat-mate-basic-1/30/Basic_heart_love_like_favourite_follow-256.png" style={{ width: "5rem", opacity: "0.7" }} alt="" />
                                <div>Chưa có theo dõi nào.</div>
                            </div>
                        )}
                    </div>
                </aside>
            )) || (
                    <aside className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvas_trackingList">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title">Giỏ hàng</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <p className="mb-3 text-center">Hãy đăng nhập để sử dụng chức năng này!</p>
                            <div className="mb-3">
                                <button
                                    className="btn w-100 btn-success"
                                    data-bs-dismiss="offcanvas"
                                    onClick={() => {
                                        navigate('/login')
                                    }}
                                >Đăng Nhập</button>
                            </div>
                        </div>
                    </aside>
                )}
        </Fragment>
    );
}

export default TrackingListTreeArea;