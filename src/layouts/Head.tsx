import { Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, Button, theme } from "antd";
import { useSelector } from "react-redux";
import { getUser } from "../app/slices/authSlice";
import { useGetUserQuery } from "../app/services/UserApi";
import { UserOutlined } from "@ant-design/icons";

export const Head = () => {
  const userId = useSelector(getUser());
  const {
    data: currentUser,
    error,
    isLoading,
  } = useGetUserQuery(userId as string);
  const { token } = theme.useToken();
  const location = useLocation();

  return (
    <Header
      className="header"
      style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between",
        zIndex: 1,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {currentUser && (
        <Link to={location.pathname.includes("tests") ? "/" : "/tests"}>
          <Button type="primary">
            {!location.pathname.includes("tests") && currentUser.role === "user"
              ? "Мои тесты"
              : !location.pathname.includes("tests") &&
                currentUser.role === "admin"
              ? "Кабинет"
              : "Главная"}
          </Button>
        </Link>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#167AFF",
          margin: 0,
        }}
      >
        {isLoading || (!isLoading && !currentUser) ? (
          <Link
            to={
              !location.pathname.includes("login") &&
              !location.pathname.includes("register")
                ? "/login"
                : "/"
            }
          >
            <Button type="primary">
              {!location.pathname.includes("login") &&
              !location.pathname.includes("register")
                ? "Вход / Регистрация"
                : "На главную"}
            </Button>
          </Link>
        ) : (
          <div>
            {currentUser && (
              <h4 style={{ margin: "-15px 10px 0 0" }}>{currentUser.email}</h4>
            )}
            {currentUser && (
              <p
                style={{
                  margin: "-10px 0 0 0",
                  position: "absolute",
                  right: 95,
                  top: 20,
                }}
              >
                {currentUser.role === "user" ? "участник" : "админ"}
              </p>
            )}
          </div>
        )}
        {currentUser && <Avatar size="default" icon={<UserOutlined />} />}
      </div>
    </Header>
  );
};
