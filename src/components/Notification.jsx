import React, { useState, useEffect } from 'react';

const Notification = ({ pushType, pushTitle, pushMessage, countDown }) => {
  let count = ''
  if (countDown) count = (countDown / 1000)
  const [time, setTime] = useState(count);
  const [visible, setVisible] = useState(true);

  const hideNotification = () => {
    setVisible(false);
  }

  useEffect(() => {
    if (visible) {
      const timeoutId = setTimeout(() => {
        setVisible(false);
      }, 4000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [visible, hideNotification]);

  useEffect(() => {
    if (countDown) {
      const timeoutId = setTimeout(() => {
        setTime(time => time - 1);
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [time]);

  return (
    <div id="notification-container">
      {visible && (
        <div className={`notification-${pushType}`}>
          <div className="notification-header">
            <div className="notification-title">{pushTitle}</div>
            <button className="notification-close" onClick={hideNotification}></button>
          </div>
          <div className="notification-message">{pushMessage}</div>
          {countDown && (
            <div className='d-flex align-items-center flex-column'>
              <div>Thoát đăng nhập sau</div>
              <h2>{time}</h2>
            </div>)
          }
        </div>
      )}
    </div>
  );
};

export default Notification;
