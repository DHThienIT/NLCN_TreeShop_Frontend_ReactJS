import { Fragment, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Search from "./Search";
import CartArea from "../cart/CartArea";
import TrackingListTreeArea from "../trackingListTree/TrackingListTreeArea"

import CategoryService from "../../services/category.service";
import CartService from "../../services/cart.service";
import { memo } from "react";

const Header = ({
    currentUser,
    openBoard,
    text,
    logOut,
    onFilterTextChange,
    onEnterSearch,
    listTrackingListTree,
    restartListTree,
    onRestartTrackingList,
    onFilterByCategory,
    onChangePathName
}) => {

    let userId
    if (currentUser) userId = currentUser.id
    let navigate = useNavigate();

    const [listCategory, setListCategory] = useState([])
    const [listCart, setListCart] = useState([])

    useEffect(() => {
        CategoryService.getAllListCategory().then(
            (response) => {
                setListCategory(response.data)
            }
        );
    }, [])

    useEffect(() => {
        if (userId) {
            CartService.listCartItem(userId).then(
                (response) => {
                    setListCart(response.data)
                }
            )
        }
    }, [userId])

    const handleRestartCart = () => {
        CartService.listCartItem(userId).then(
            (response) => {
                setListCart(response.data)
            }
        )
    }

    const handleFilterByCategory = (categoryId, categoryName) => {
        if (categoryId === 1) {
            restartListTree()
            onChangePathName()
            navigate('/data')
        } else {
            CategoryService.getTreesByCategory(categoryId).then(
                (response) => {
                    // console.log(response.data)
                    onFilterByCategory(response.data)
                    onChangePathName(categoryName)
                }
            )
        }
    }

    return (
        <Fragment>
            <CartArea listCart={listCart} currentUser={currentUser} onRestartCart={handleRestartCart} />
            <TrackingListTreeArea listTrackingListTree={listTrackingListTree} currentUser={currentUser} onRestartTrackingList={onRestartTrackingList} restartListTree={restartListTree} />

            <header className="section-header bg-green-dark">
                <div className="section-header bg-white">
                    <section className="header-main">
                        <div className="container">
                            <div className="row gy-3 align-items-center">
                                <div className="col-lg-4 col-sm-4 col-4 d-flex justify-content-center">
                                    <img src="../images/logo.jpg" alt="Avatar Logo" onClick={() => handleFilterByCategory(1, '')} style={{ width: "15rem" }} className="rounded-pill" />
                                </div>
                                <div className="order-lg-last col-lg-4 col-sm-8 col-8">
                                    <div className="float-end">
                                        <div className="dropdown">
                                            <button
                                                data-bs-toggle="offcanvas"
                                                href="#offcanvas_cart"
                                                className="btn btn-light button-header-size"
                                                onClick={handleRestartCart}
                                            >
                                                <div className="btn-cart">
                                                    <i className="fa fa-shopping-cart" />
                                                    <span className="ms-1">Giỏ hàng</span>
                                                    <div className="ms-1 circle">
                                                        {listCart.length}
                                                    </div>
                                                </div>
                                            </button>
                                            {currentUser ? (
                                                <Fragment>
                                                    <button
                                                        data-bs-toggle="offcanvas"
                                                        href="#offcanvas_trackingList"
                                                        className="btn btn-light"
                                                        onClick={onRestartTrackingList}
                                                    >
                                                        <i className="fa fa-heart"></i>
                                                        <span className="ms-1 d-none d-sm-inline-block">Theo dõi</span>
                                                    </button>

                                                    <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Hi. {currentUser.firstname}
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                        <li><button className="dropdown-item" onClick={() => navigate('/accountInformation')}>Thông tin tài khoản</button></li>
                                                        <li><button className="dropdown-item" href="#">Another action</button></li>
                                                        <li><hr className="dropdown-divider" /></li>
                                                        <li><button className="dropdown-item" onClick={() => { logOut() }}>Thoát đăng nhập</button></li>
                                                    </ul>
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    <button
                                                        className="nav-item btn btn-light button-header-size"
                                                        onClick={() => navigate('/login')}
                                                    >
                                                        <i className="fa-solid fa-user"></i>  <span className="ms-1 d-none d-sm-inline-block">Đăng nhập</span>
                                                    </button>
                                                    <button
                                                        className="nav-item btn btn-light button-header-size"
                                                        onClick={() => navigate('/register')}
                                                    >
                                                        <i className="fa-solid fa-registered"></i>  <span className="ms-1 d-none d-sm-inline-block">Đăng ký</span>
                                                    </button>
                                                </Fragment>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-12 col-12">
                                    <Search
                                        text={text}
                                        onFilterTextChange={onFilterTextChange}
                                        onEnterSearch={onEnterSearch}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                    <hr />
                    <div className="navbar-nav1">
                        {listCategory.map((category) => {
                            // console.log(category)
                            return (
                                <div
                                    key={category.categoryId}
                                    className="nav-link3"
                                    onClick={() => handleFilterByCategory(category.categoryId, category.detail)}
                                >
                                    {(category.categoryId !== 1) ? category.detail : 'Trang chủ'}
                                </div>
                            )
                        })}
                    </div>
                    {openBoard && (
                        <div className="navbar-nav1 bg-green-dark">
                            <div className="nav-link1">Vận chuyển nhanh chóng,<br />đáng tin cậy</div>
                            <div className="nav-link2" >Đảm bảo cây khỏe mạnh,<br />phát triển tốt</div>
                            <div className="nav-link1">Đội ngũ dịch vụ hỗ trợ<br />24/7</div>
                        </div>
                    )}
                </div>
            </header>
        </Fragment>
    );
}

export default memo(Header);