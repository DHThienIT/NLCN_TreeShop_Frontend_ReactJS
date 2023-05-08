import { memo } from "react";

const Footer = () => {
    console.log('đang bị render Footer')
    return (
        <div className="footer-section">
            <footer className="section-footer bg-gray border-top">
                <div className="container">
                    <section className="footer-main padding-y">
                        <div className="row">
                            <aside className="col-lg-3 design-group">
                                <img src="../images/logo2.jpg" alt="Avatar Logo" style={{ width: "260px" }} className="rounded-pill" />

                                <article className="me-lg-1">
                                    <p className="mt-3"><b>Shop vườn xanh đa dạng cây trồng</b></p>
                                </article>
                                <div className="show-iconD">
                                    <img className="iconD" src='../icons/google.png' style={{ width: "25px" }}></img>
                                    <img className="iconD" src='../icons/facebook.png' style={{ width: "25px" }}></img>
                                    <img className="iconD" src='../icons/twitter.png' style={{ width: "25px" }}></img>
                                    <img className="iconD" src='../icons/youtube.png' style={{ width: "25px" }}></img>
                                </div>
                            </aside>
                            <aside className="col-lg-5" style={{ marginLeft: "6rem", marginTop: "1rem" }}>
                                <h5 className="title">Chi tiết liên hệ</h5>
                                <div className="button-text">
                                    <img className="iconD" src='https://cdn3.iconfinder.com/data/icons/simple-files-1/128/Location-256.png' style={{ width: "22px" }}></img>
                                    <span className="ms-3">3/2 Ninh Kiều, Cần Thơ</span>
                                </div>
                                <div className="button-text">
                                    <img className="iconD" src='https://cdn2.iconfinder.com/data/icons/font-awesome/1792/phone-256.png' style={{ width: "22px" }}></img>
                                    <span className="ms-3">{'(+84) 123456789'}</span>
                                </div>
                                <div className="button-text">
                                    <img className="iconD" src='https://cdn3.iconfinder.com/data/icons/font-awesome-solid/512/envelope-256.png' style={{ width: "22px" }}></img>
                                    <span className="ms-3">vuonxanh@gmail.vn</span>
                                </div>
                            </aside>
                            <aside className="col-lg-3 text-right" style={{ marginTop: "1rem" }}>
                                <h5 className="title">Vị trí cửa hàng</h5>
                                <p>Tìm đường đến cửa hàng một cách nhanh nhất với bản đồ.</p>

                                {/* <form className="mb-3">
                                    <div className="input-group">
                                        <input className="form-control" type="text" placeholder="Email" />
                                        <button className="btn btn-light" type="submit">
                                            Join
                                        </button>
                                    </div>
                                </form> */}
                                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" frameborder="0" style="border:0; width: 350px; height: 290px;" allowfullscreen></iframe> */}
                            </aside>
                        </div>
                    </section>

                    <section className="footer-bottom d-flex justify-content-lg-between border-top">
                        <div>
                            <b>
                                &copy; Giáo viên hướng dẫn: Ths. Vũ Duy Linh, Sinh viên thực hiện: Đoàn Hy Thiện B1910452
                                {/* Thanks to Bezkoder! */}
                            </b>
                        </div>
                        <nav className="dropup">
                            <button className="dropdown-toggle btn d-flex align-items-center py-0" type="button" data-bs-toggle="dropdown">
                                <img src="assets/images/flag-usa.webp" className="me-2" height="20" />
                                <span>English</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><a className="dropdown-item" href="#">Russian</a></li>
                                <li><a className="dropdown-item" href="#">Arabic</a></li>
                                <li><a className="dropdown-item" href="#">Spanish</a></li>
                            </ul>
                        </nav>
                    </section>
                </div>
            </footer>
        </div>
    );
}

export default memo(Footer);