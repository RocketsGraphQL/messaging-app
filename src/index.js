// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Message from "./components/Message"
import Login from "./components/Login"
import Signup from "./components/Signup"

// Rocketgraph providers
import { RApolloProvider } from "@rocketgraphql/react-apollo";
import { auth } from "./utils/config";


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <RApolloProvider auth={auth} gqlEndpoint="https://hasura-vf0gs3q.rocketgraph.app/v1/graphql">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/messages" element={<Message />} />
            <Route path="/" element={<App />} />
          </Routes>
        </Router>
      </RApolloProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);