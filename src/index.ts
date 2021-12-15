/**
 * @package my@express
 * @description try to create express from native nodejs
 * @author dimitriynoway
 */

import http from "http";

interface Request {}

interface Response {}

const express = () => {
  const payload: {
    [key: string]: Function;
  } = {};
  const requestResponse = (req: any, res: any) => {
    res.send = res.end;

    if (typeof payload[req.url] === "function") return payload[req.url](req, res);
    throw new Error("Error in req-res func");
  };

  const get = (path: string, cb: (req: any, res: any) => void) => {
    payload[path] = cb;
  };

  const server = http.createServer(requestResponse);

  const listen = (port: number, cb: () => void) => {
    if (!port) throw new Error("Port was not passed");
    if (typeof port !== "number") throw new Error("Port must be a number");
    server.listen(port, cb);
  };

  return {
    listen,
    get,
  };
};

const app = express();
app.get("/", (req, res) => res.send("hello world"));
app.listen(4000, () => console.log("server started"));
