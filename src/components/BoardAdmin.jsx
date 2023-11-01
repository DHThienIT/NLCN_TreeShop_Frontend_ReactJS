import React, { useState, useEffect } from "react";
import RootService from "../services/rootService";
import EventBus from "../helpers/EventBus";

const BoardAdmin = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    RootService.UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <main className="container mt-4 p-5 bg-primary text-white rounded">
        <h3>{content}</h3>
    </main>
  );
};

export default BoardAdmin;
