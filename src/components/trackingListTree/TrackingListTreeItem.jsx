import { Fragment } from "react";
import TrackingListTreeService from "../../services/trackingListTree.service";
import { useNavigate } from "react-router-dom";

const TrackingListTreeItem = ({ currentUser, tree, onRestartTrackingList, listTrackingListTree, restartListTree }) => {
    // console.log(tree, currentUser)
    const currentUrl = window.location.href;
    // console.log('currentUrl', currentUrl)

    const navigate = useNavigate()

    const handleDelete = (treeId) => {
        TrackingListTreeService.updateTreeInTrackingList(currentUser.id, tree.treeId).then(
            (response) => {
                onRestartTrackingList()
                restartListTree()
                if (currentUrl.includes('treeDetails', 0)) {
                    TrackingListTreeService.getTrackingListTreeByUserId(currentUser.id).then(
                        (response) => {
                            listTrackingListTree = response.data
                            navigate('/treeDetails', { state: { tree, currentUser, listTrackingListTree } });
                        }
                    )
                } 
            }
        )
    }

    const handleClickSeeTreeDetails = () => {
        navigate('/treeDetails', { state: { tree, currentUser, listTrackingListTree } });
    }

    return (
        <Fragment>
            <div
                key={tree.treeId}
                className="itemside mb-4 d-flex justify-content-center"
            >
                <div className="aside">
                    <img
                        src={'images/' + tree.imageUrl}
                        className="border img-sm rounded"
                        alt="Lỗi ảnh"
                        data-bs-dismiss="offcanvas"
                        onClick={handleClickSeeTreeDetails}
                    />
                </div>
                <figcaption className="info">
                    <button
                        className="btn btn-icon btn-light float-end"
                        onClick={() => handleDelete(tree.treeId)}
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                    <div className="button-text">{tree.treeName}</div>
                    <button
                        className="btn btn-primary"
                        data-bs-dismiss="offcanvas"
                        onClick={handleClickSeeTreeDetails}
                    >
                        {/* <i className="fa-sharp fa-solid fa-circle-info"></i> */}
                        <span>Chi tiết</span>
                    </button>
                </figcaption>
            </div>
        </Fragment>
    );
}

export default TrackingListTreeItem;