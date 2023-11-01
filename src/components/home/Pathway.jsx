import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Pathway = ({ treeName }) => {
    const { pathName } = useSelector(state => state.mainReducer)
    return (
        <div className="container">
            <h2 className="text-white">{pathName}</h2>
            <ol className="breadcrumb ondark mb-0">
                <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                <li className="breadcrumb-item"><Link to="/data">Thư viện</Link></li>
                <li className="breadcrumb-item"><Link to="/data">{pathName}</Link></li>
                {treeName && <li className="breadcrumb-item" aria-current="page">{treeName}</li>}
            </ol>
        </div>
    )
}

export default Pathway;