import React, { Fragment, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

import Header from './components/headerAndFooter/Header'
import Footer from './components/headerAndFooter/Footer'

import AuthService from "./services/auth.service";
import TreeSearchService from "./services/treeSearch.service";
import TreeService from "./services/tree.service";
import TrackingListTreeService from "./services/trackingListTree.service";

import Home from "./components/home/Data";
import Login from "./components/loginAndRegister/Login";
import Register from "./components/loginAndRegister/Register";
import Data from "./components/home/Data";
import AccountInformation from "./components/accountInformation/AccountInformation";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Notification from "./components/Notification";

import EventBus from "./common/EventBus";
import TreeDetails from "./components/home/TreeDetails";
import PaymentArea from "./components/payment/PaymentArea";
import { useCallback } from "react";
import PaymentResultNotificationSuccessPayDirect from "./components/payment/paymentResultNotification/PaymentResultNotificationSuccessPayDirect";
import PaymentResultNotificationSuccessPayVnpay from "./components/payment/paymentResultNotification/PaymentResultNotificationSuccessPayVnpay";
import PaymentResultNotificationSuccessPayPaypal from "./components/payment/paymentResultNotification/PaymentResultNotificationSuccessPayPaypal";
import PaymentResultNotificationError from "./components/payment/paymentResultNotification/PaymentResultNotificationError";

const App = () => {
  let navigate = useNavigate();
  // const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  // const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [openBoard, setOpenBoard] = useState(true);
  const [text, setText] = useState('');
  const [showGoToTop, setShowGoToTop] = useState(false)
  const [listTree, setListTree] = useState([]);
  const [listTrackingListTree, setTrackingListTree] = useState([])
  const [pathName, setPathName] = useState('Toàn bộ');
  const [numberOfTree, setNumberOfTree] = useState(undefined);

  useEffect(() => {
    // console.log('Sao ky vay 2211231')
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      // setShowModeratorBoard(user.privileges.includes("ROLE_TREE_HARD_ACCESS"));
      // setShowAdminBoard(user.privileges.includes("ROLE_CRUD_ALLOW_ALL"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setShowGoToTop(true)
      } else {
        setShowGoToTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    restartListTree()

    return () => {
      EventBus.remove("logout");
      window.removeEventListener('scroll', handleScroll)
      console.log('removeEventListener Scroll from Component when Unmounting...')
    };
  }, []);

  useEffect(() => {
    if (currentUser)
      TrackingListTreeService.getTrackingListTreeByUserId(currentUser.id).then(
        (response) => {
          setTrackingListTree(response.data)
        }
      )
  }, [currentUser])

  const logOut = useCallback(() => {
    AuthService.logout();
    navigate('/data')
    setCurrentUser();
    // setShowModeratorBoard(false);
    // setShowAdminBoard(false);
  }, [navigate])

  const handleRestartListTreeByName = (text) => {
    TreeSearchService.searchTreesByText(text).then(
      (response) => {
        setListTree(response.data);
        console.log(response.data)
        setNumberOfTree(response.data.length)
      }
    );
  }

  const handleFilterTextChange = useCallback((text) => {
    console.log('111111111')
    setText(text)
    if (!text) {
      restartListTree()
      setText('')
    }
  }, [])

  const handleEnterSearch = useCallback((text) => {
    // console.log('xxxxxxxxxx')
    handleChangePathName('Lọc theo tên cây')
    handleRestartListTreeByName(text)
  }, [])

  const handleFilterByCategory = useCallback((list) => {
    setListTree(list)
    setNumberOfTree(0)
  }, [])

  const handleChangePathName = useCallback((pathName) => {
    if (!pathName) pathName = 'Toàn bộ'
    setPathName(pathName)
  }, [])

  const restartListTree = useCallback((page, sortBy) => {
    console.log('Sao ky vay')
    if (!page) page = 0
    if (!sortBy) sortBy = 'treeId'
    TreeService.getAllListTree(page, sortBy).then(
      (response) => {
        // console.log(response.data.content)
        setListTree(response.data.content)

        TreeService.getNumberOfTrees().then(
          (response) => {
            setNumberOfTree(response.data)
          }
        )
      }
    )
  }, [])

  const handleRestartTrackingList = useCallback(() => {
    TrackingListTreeService.getTrackingListTreeByUserId(currentUser.id).then(
      (response) => {
        setTrackingListTree(response.data)
      }
    )
  }, [currentUser])

  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleUseCollapseFilter = () => {
    setNumberOfTree(0)
  };

  return (
    <Fragment>
      <Header
        currentUser={currentUser}
        openBoard={openBoard}
        text={text}
        listTrackingListTree={listTrackingListTree}
        logOut={logOut}
        onFilterTextChange={handleFilterTextChange}
        onEnterSearch={handleEnterSearch}
        restartListTree={restartListTree}
        onRestartTrackingList={handleRestartTrackingList}
        onFilterByCategory={handleFilterByCategory}
        onChangePathName={handleChangePathName}
      />

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Data currentUser={currentUser} text={text} pathName={pathName} numberOfTree={numberOfTree} restartListTree={restartListTree} listTree={listTree} listTrackingListTree={listTrackingListTree} handleRestartTrackingList={handleRestartTrackingList} onChangePathName={handleChangePathName} onFilterTextChange={handleFilterTextChange} onUseCollapseFilter={handleUseCollapseFilter}/>} />
          <Route path="/data" element={<Data currentUser={currentUser} text={text} pathName={pathName} numberOfTree={numberOfTree} restartListTree={restartListTree} listTree={listTree} listTrackingListTree={listTrackingListTree} handleRestartTrackingList={handleRestartTrackingList} onChangePathName={handleChangePathName} onFilterTextChange={handleFilterTextChange} onUseCollapseFilter={handleUseCollapseFilter}/>} />
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

      {showGoToTop && (
        <button
          className="btn btn-success"
          style={{
            position: 'fixed',
            right: 20,
            bottom: 20,
          }}
          onClick={handleGoToTop}
        >
          Go To Top
        </button>
      )}
    </Fragment>
  );
};

export default App;
