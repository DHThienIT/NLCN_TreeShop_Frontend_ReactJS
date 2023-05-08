import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Pathway from './Pathway';
import Notification from '../Notification';
import CartService from '../../services/cart.service';
import TrackingListTreeService from '../../services/trackingListTree.service';

const TreeDetails = () => {
    const location = useLocation();
    const { tree, currentUser, listTrackingListTree } = location.state || {}

    const [quantity, setQuantity] = useState(1)
    const [notification, setNotification] = useState([])
    const [checked, setChecked] = useState(false)
    // console.log(checked)
    useEffect(() => {
        if (window.scrollY >= 100)
            window.scrollTo({
                top: 200,
                behavior: "smooth"
            })
    }, [])

    useEffect(() => {
        setChecked(false)
        listTrackingListTree.map(check => {
            if (check.treeId === tree.treeId) {
                setChecked(true)
                return true
            } else return false;
        })
        // console.log('checked', listTrackingListTree, tree.treeId, checked)
    }, [listTrackingListTree])

    const hangleClickSub = () => {
        if (quantity > 0)
            setQuantity(parseInt(quantity) - 1)
    }

    const hangleClickAdd = () => {
        if (quantity < tree.stock)
            setQuantity(parseInt(quantity) + 1)
    }

    const hangleOnChange = (number) => {
        if (number <= tree.stock) {
            setQuantity(number)
        }
    }

    const warning = [
        <Notification
            pushType='warning'
            pushTitle='Xin hãy đăng nhập để thực hiện hành động này'
            pushMessage={'Không thể thêm ' + tree.treeName + ' vào giỏ hàng.'}
        />,
        <Notification
            pushType='warning'
            pushTitle='Không thể thêm vào danh sách theo dõi'
            pushMessage='Bạn cần phải đăng nhập để thực hiện hành động này.'
        />,
        <Notification
            pushType='success'
            pushTitle='Thêm thành công'
            pushMessage={'Đã thêm ' + quantity + ' ' + tree.treeName + ' vào giỏ.'}
        />
    ]

    const setTimeOut = () => {
        // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx')
        setTimeout(() => {
            setNotification([])
        }, 4000);
    }

    const handleClickBuyNow = () => {
        if (!currentUser) {
            setNotification(warning[0])
            setTimeOut()
        }
    }

    const handleAddToCart = () => {
        if (!currentUser) {
            setNotification(warning[0])
            setTimeOut()
        }
        else {
            CartService.addTreeToCart(tree.treeId, currentUser.id, quantity).then(
                () => {
                    setNotification(warning[2])
                    setTimeOut()
                }
            )
        }
    }

    const handleClickFollow = () => {
        if (!currentUser) {
            setNotification(warning[0])
            setTimeOut()
        }
        TrackingListTreeService.updateTreeInTrackingList(currentUser.id, tree.treeId).then(
            () => {
                setChecked(!checked)
            }
        )
    }

    return (
        <div className="home-section">
            <section className="bg-primary padding-y-sm">
                <Pathway treeName={tree.treeName} />
            </section>
            <section className="padding-y">
                <div className="container">
                    <div className="row">
                        <aside className="col-lg-6">
                            <article className="gallery-wrap">
                                <div className="img-big-wrap img-thumbnail">
                                    <a data-fslightbox="mygalley" data-type="image" href={'/images/' + tree.imageUrl}>
                                        <img height="560" src={'/images/' + tree.imageUrl} alt="" />
                                    </a>
                                </div>
                                <div className="thumbs-wrap">
                                    <a data-fslightbox="mygalley" data-type="image" href={'/images/' + tree.imageUrl} className="item-thumb">
                                        <img width="60" height="60" src={'/images/' + tree.imageUrl} alt="" />
                                    </a>
                                    <a data-fslightbox="mygalley" data-type="image" href={'/images/' + tree.imageUrl} className="item-thumb">
                                        <img width="60" height="60" src={'/images/' + tree.imageUrl} alt="" />
                                    </a>
                                    <a data-fslightbox="mygalley" data-type="image" href={'/images/' + tree.imageUrl} className="item-thumb">
                                        <img width="60" height="60" src={'/images/' + tree.imageUrl} alt="" />
                                    </a>
                                    <a data-fslightbox="mygalley" data-type="image" href={'/images/' + tree.imageUrl} className="item-thumb">
                                        <img width="60" height="60" src={'/images/' + tree.imageUrl} alt="" />
                                    </a>
                                    <a data-fslightbox="mygalley" data-type="image" href={'/images/' + tree.imageUrl} className="item-thumb">
                                        <img width="60" height="60" src={'/images/' + tree.imageUrl} alt="" />
                                    </a>
                                </div>
                            </article>
                        </aside>
                        <main className="col-lg-6">
                            <article className="ps-lg-3">
                                <h4 className="title text-dark">{tree.treeName}</h4>
                                <div className="rating-wrap my-3">
                                    <ul className="rating-stars">
                                        <li style={{ width: "80%" }} className="stars-active"> <img src="assets/images/misc/stars-active.svg" alt="" /> </li>
                                        <li> <img src="assets/images/misc/starts-disable.svg" alt="" /> </li>
                                    </ul>
                                    <b className="label-rating text-warning">4.5</b>

                                    <i className="dot"></i>
                                    <span className="label-rating text-success">In stock</span>
                                </div>

                                <div className="mb-3">
                                    <var className="price h5">{tree.price.toLocaleString('vi-VN')}<sup>₫</sup></var>
                                    <span className="text-muted">/1 cây</span>
                                </div>

                                <p>{tree.description}.</p>

                                <dl className="row">
                                    <dt className="col-3">Màu cây</dt>
                                    <dd className="col-9">{tree.color}</dd>

                                    <dt className="col-3">Kích thước</dt>
                                    <dd className="col-9">{tree.size}</dd>

                                    <dt className="col-3">Thể loại</dt>
                                    <dd className="col-9">
                                        {
                                            tree.categories.map(category => {
                                                return (
                                                    <div key={category.categoryId}>
                                                        <span>{category.detail}</span><br />
                                                    </div>
                                                )
                                            })
                                        }
                                    </dd>
                                </dl>

                                <hr />

                                <div className="row mb-4">
                                    <span className="label-rating text-muted">
                                        <i className="fas fa-warehouse"></i>
                                        {' '}còn {tree.stock} sản phẩm
                                    </span>
                                    {/* <div className="col-md-4 col-6 mb-2">
                                        <label className="form-label">Size</label>
                                        <select className="form-select">
                                            <option>Small</option>
                                            <option>Medium</option>
                                            <option>Large</option>
                                        </select>
                                    </div> */}
                                    <div className="col-md-4 col-6 mb-3">
                                        <label className="form-label d-block">Quantity</label>
                                        <div className="input-group input-spinner">
                                            <button
                                                type="button"
                                                className="btn btn-icon btn-light"
                                                onClick={hangleClickSub}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#999" viewBox="0 0 24 24">
                                                    <path d="M19 13H5v-2h14v2z"></path>
                                                </svg>
                                            </button>
                                            <input
                                                className="form-control text-center"
                                                value={quantity}
                                                onChange={(e) => hangleOnChange(e.target.value)}
                                            />
                                            <button
                                                className="btn btn-icon btn-light"
                                                type="button"
                                                onClick={hangleClickAdd}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#999" viewBox="0 0 24 24">
                                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="btn btn-warning"
                                    onClick={handleClickBuyNow}
                                >
                                    Mua ngay
                                </button>
                                <button
                                    href="#"
                                    className="btn btn-primary"
                                    onClick={handleAddToCart}
                                >
                                    <i className="me-1 fa fa-shopping-basket"></i>
                                    Thêm vào giỏ
                                </button>
                                <button
                                    className="btn btn-light"
                                    onClick={handleClickFollow}
                                >
                                    <i className="me-1 fa fa-heart" style={checked ? { color: "#da0da0" } : {}}></i>
                                    Theo dõi
                                </button>

                            </article>
                        </main>
                    </div>
                </div>
            </section>

            <section className="padding-y bg-light border-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">

                            <div className="card">
                                <header className="card-header">
                                    <ul className="nav nav-tabs card-header-tabs">
                                        <li className="nav-item">
                                            <a href="#" data-bs-target="#tab_specs" data-bs-toggle="tab" className="nav-link active">Specification</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" data-bs-target="#tab_warranty" data-bs-toggle="tab" className="nav-link">Nguồn hàng</a>
                                        </li>
                                    </ul>
                                </header>
                                <div className="tab-content">
                                    <article id="tab_specs" className="tab-pane show active card-body">
                                        <p>With supporting text below as a natural lead-in to additional content. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
                                        <ul className="list-check cols-two">
                                            <li>Some great feature name here </li>
                                            <li>Lorem ipsum dolor sit amet, consectetur </li>
                                            <li>Duis aute irure dolor in reprehenderit </li>
                                            <li>Optical heart sensor </li>
                                            <li>Easy fast and ver good </li>
                                            <li>Some great feature name here </li>
                                            <li>Modern style and design</li>
                                        </ul>
                                        <table className="table border table-hover">
                                            <tbody>
                                                <tr>
                                                    <th>Display:</th><td>13.3-inch LED-backlit display with IPS</td>
                                                </tr>
                                                <tr>
                                                    <th>Processor capacity:</th><td>2.3GHz dual-core Intel Core i5</td>
                                                </tr>
                                                <tr>
                                                    <th>Camera quality:</th><td>720p FaceTime HD camera</td>
                                                </tr>
                                                <tr>
                                                    <th>Memory </th><td> 8 GB RAM or 16 GB RAM</td>
                                                </tr>
                                                <tr>
                                                    <th>Graphics</th><td>Intel Iris Plus Graphics 640</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </article>
                                    <article id="tab_warranty" className="tab-pane card-body">
                                        <h4>{tree.supplier.supplierName}</h4>
                                        <br />
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    </article>
                                </div>
                            </div>

                        </div>
                        <aside className="col-lg-4">

                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Similar items</h5>

                                    <article className="itemside mb-3">
                                        <a href="#" className="aside">
                                            <img src="assets/images/items/8.webp" width="96" height="96" className="img-md img-thumbnail" />
                                        </a>
                                        <div className="info">
                                            <a href="#" className="title mb-1"> Rucksack Backpack Large <br /> Line Mounts </a>
                                            <strong className="price"> $38.90</strong>
                                        </div>
                                    </article>

                                    <article className="itemside mb-3">
                                        <a href="#" className="aside">
                                            <img src="assets/images/items/9.webp" width="96" height="96" className="img-md img-thumbnail" />
                                        </a>
                                        <div className="info">
                                            <a href="#" className="title mb-1"> Summer New Men's Denim <br /> Jeans Shorts  </a>
                                            <strong className="price"> $29.50</strong>
                                        </div>
                                    </article>

                                    <article className="itemside mb-3">
                                        <a href="#" className="aside">
                                            <img src={'/images/' + tree.imageUrl} width="96" height="96" className="img-md img-thumbnail" />
                                        </a>
                                        <div className="info">
                                            <a href="#" className="title mb-1"> T-shirts with multiple colors, for men and lady </a>
                                            <strong className="price"> $120.00</strong>
                                        </div>
                                    </article>

                                    <article className="itemside mb-3">
                                        <a href="#" className="aside">
                                            <img src="assets/images/items/11.webp" width="96" height="96" className="img-md img-thumbnail" />
                                        </a>
                                        <div className="info">
                                            <a href="#" className="title mb-1"> Blazer Suit Dress Jacket for Men, Blue color </a>
                                            <strong className="price"> $339.90</strong>
                                        </div>
                                    </article>

                                </div>
                            </div>

                        </aside>
                    </div>

                    <br /><br />

                </div>
            </section>
            {notification}
        </div>
    );
}

export default TreeDetails;