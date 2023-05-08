import React from 'react';
import { Link } from 'react-router-dom';
import styles from './productstyles.module.css';
import { NumericFormat } from 'react-number-format';

const TreeItem = (props) => {
    console.log("....... " + props.currentUser)
    return (
        <div className="card card-body">
            <img style={{ display: "block", margin: "0 10px 10px", height: "200px", width: "170px" }} className="img-fluid"
                src={'/images/' + props.tree.imageUrl} alt="" />

            <p>{props.tree.treeName}</p>
            <p>Mô tả: {props.tree.description}</p>
            <h5 className="text-start">{props.tree.price}<sup>₫</sup></h5>

            {/* <NumericFormat value={props.tree.price} isAllowed="false" thousandSeparator="," /> */}
            {/* <NumericFormat value={props.tree.price} prefix={'₫'} /> */}

            <div className="text-end">

                {props.currentUser ? (
                    <Link to="#" className={styles.add_cart}>Thêm vào giỏ</Link>
                ) : (
                    <Link to="/login" className={styles.add_cart}>Xem chi tiết</Link>)
                }
            </div>
        </div>
    );
}

export default TreeItem;