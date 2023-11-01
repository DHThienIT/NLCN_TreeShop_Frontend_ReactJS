import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

import AuthService from "./services/auth.service";

import Header from "./common/Header";
import Footer from "./common/Footer";
import Login from "./components/loginAndRegister/Login";
import Register from "./components/loginAndRegister/Register";
import Data from "./components/home/Data";
import AccountInformation from "./components/accountInformation/AccountInformation";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Notification from "./components/Notification";

import EventBus from "./helpers/EventBus";
import TreeDetails from "./components/home/TreeDetails";
import PaymentArea from "./components/payment/PaymentArea";
import { useDispatch } from 'react-redux';

import {
  getAllListTree,
  successfulLoginNotification
} from './actions/action'

import PaymentResultNotificationSuccessPayDirect from "./components/payment/paymentResultNotification/PaymentResultNotificationSuccessPayDirect";
import PaymentResultNotificationSuccessPayVnpay from "./components/payment/paymentResultNotification/PaymentResultNotificationSuccessPayVnpay";
import PaymentResultNotificationSuccessPayPaypal from "./components/payment/paymentResultNotification/PaymentResultNotificationSuccessPayPaypal";
import PaymentResultNotificationError from "./components/payment/paymentResultNotification/PaymentResultNotificationError";

const App = () => {
  let navigate = useNavigate();
  // const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  // const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [openBoard, setOpenBoard] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllListTree())
    const user = AuthService.getCurrentUser();

    if (user) {
      // dispatch(setCurrentUser(user))
      // setShowModeratorBoard(user.privileges.includes("ROLE_TREE_HARD_ACCESS"));
      // setShowAdminBoard(user.privileges.includes("ROLE_CRUD_ALLOW_ALL"));
      dispatch(successfulLoginNotification(user))
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = useCallback(() => {
    AuthService.logout();
    navigate('/data')
    dispatch(successfulLoginNotification(''));
    // setShowModeratorBoard(false);
    // setShowAdminBoard(false);
  }, [navigate])

  return (
    <Fragment>
      <Header
        openBoard={openBoard}
        logOut={logOut}
      />

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Data />} />
          <Route path="/data" element={<Data />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/accountInformation" element={<AccountInformation />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/treeDetails" element={<TreeDetails />} />
          <Route path="/payment" element={<PaymentArea />} />
          <Route path="/paymentResultNotificationSuccessPayDirect" element={<PaymentResultNotificationSuccessPayDirect />} />
          <Route path="/paymentResultNotificationSuccessPayVnpay" element={<PaymentResultNotificationSuccessPayVnpay />} />
          <Route path="/paymentResultNotificationSuccessPayPaypal" element={<PaymentResultNotificationSuccessPayPaypal />} />
          <Route path="/paymentResultNotificationError" element={<PaymentResultNotificationError />} />
        </Routes>
      </div>

      <Footer />
    </Fragment>
  );
};

export default App;
