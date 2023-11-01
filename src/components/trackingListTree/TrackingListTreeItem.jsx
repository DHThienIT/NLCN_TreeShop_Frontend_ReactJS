import { Fragment, useEffect, useState } from "react";
import RootService from "../../services/rootService";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { restartTrackingListTree } from "../../actions/action";

const TrackingListTreeItem = ({ tree }) => {
    const { currentUser } = useSelector(state => state.accountReducer)
    const navigate = useNavigate()
    const [image, setImage] = useState();

    const dispatch = useDispatch()

    useEffect(() => {
        RootService.ImageService.getTreeImage(tree.treeId).then(
            (response) => {
                setImage(response)
            }
        )
    }, [])

    const handleDelete = () => {
        dispatch(restartTrackingListTree(currentUser.id, tree.treeId))
    }

    const handleClickSeeTreeDetails = () => {
        navigate('/treeDetails', { state: { tree, currentUser } });
    }

    return (
        <Fragment>
            <div
                key={tree.treeId}
                className="itemside mb-4 d-flex justify-content-center"
            >
                <div className="aside">
                    <img
                        src={image}
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