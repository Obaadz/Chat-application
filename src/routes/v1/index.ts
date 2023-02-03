import express from "express";

const v1Routes = express.Router();

v1Routes.use("/v1", (_) => {});

export default v1Routes;
