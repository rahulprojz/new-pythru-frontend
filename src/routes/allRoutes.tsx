import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { RoutesPath, PrivateRoutesPath } from "../constants";
import React, { Suspense, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Alert } from "../utils";
import Container from "../components/Hoc/container";

function App() {
  return (
    <>
      <BrowserRouter>
        <React.Fragment>
          <Routes>
            {RoutesPath.map((item: any, index: number) => {
              return (
                <Route
                  path={item.path}
                  key={index}
                  element={
                    <Suspense
                      fallback={
                        <div className="globle_loader">
                          <CircularProgress />
                        </div>
                      }
                    >
                      {<item.element />}
                    </Suspense>
                  }
                />
              );
            })}
            <Route element={<Container />}>
              {PrivateRoutesPath.map((item: any, index: number) => {
                return (
                  <Route
                    path={item.path}
                    key={index}
                    element={
                      <Suspense
                        fallback={
                          <div className="globle_loader">
                            <CircularProgress />
                          </div>
                        }
                      >
                        {<item.element />}
                      </Suspense>
                    }
                  />
                );
              })}
            </Route>
            <Route element={<Container />}>
              <Route
                path="*"
                element={
                  <h1
                    style={{
                      fontSize: 22,
                      textAlign: "center",
                      marginTop: 70,
                      fontWeight: 700,
                    }}
                  >
                    Under development
                  </h1>
                }
              />
            </Route>
          </Routes>
        </React.Fragment>
      </BrowserRouter>
    </>
  );
}

export default App;
