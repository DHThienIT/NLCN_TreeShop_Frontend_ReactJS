import { Fragment, useEffect, useState } from "react";
import TrackingListTreeItem from "./TrackingListTreeItem";
import { useNavigate } from "react-router-dom";

const TrackingListTreeArea = ({ currentUser, listTrackingListTree, onRestartTrackingList, restartListTree }) => {
    // console.log('listTrackingListTree', listTrackingListTree)
    const foundTrackingListTree = []
    const navigate = useNavigate()
    const [hadLogin, setHadLogin] = useState(true)

    useEffect(() => {
        if (!currentUser) setHadLogin(false); else setHadLogin(true);
    }, [hadLogin, currentUser])

    listTrackingListTree.forEach((tree) => {
        foundTrackingListTree.push(
            <TrackingListTreeItem
                key={tree.treeId}
                currentUser={currentUser}
                tree={tree}
                onRestartTrackingList={onRestartTrackingList}
                listTrackingListTree={listTrackingListTree}
                restartListTree={restartListTree}
            />
        );
    })

    return (
        <Fragment>
            {(hadLogin && (
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
                                <img src="https://cdn4.iconfinder.com/data/icons/flat-mate-basic-1/30/Basic_heart_love_like_favourite_follow-256.png" style={{width: "5rem", opacity: "0.7"}} alt=""/>
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