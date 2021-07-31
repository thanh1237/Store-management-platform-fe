import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { useEffect } from "react";
import moment from "moment";
import ArrowDropUpOutlinedIcon from "@material-ui/icons/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import { useState } from "react";
import { cukcukOrderActions } from "redux/actions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  paper: {
    marginTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "90%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Profit({ sainVoiceList, cukcukOrderList }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const controller = useSelector((state) => state.control.obj);
  const cukcukDetailOrders = useSelector(
    (state) => state.cukcukOrder.singleOrder
  );
  let totalAmount = 0;
  let yesterdayTotalAmount = 0;
  let totalAmountOfOrders = 0;

  const cukcukOrderArr = cukcukOrderList?.filter((e) => {
    let today = moment().format("DD/MM/YYYY");
    return moment(e.Date).format("DD/MM/YYYY") === today;
  });

  const cukcukOrderIds = cukcukOrderArr?.map((el) => {
    return el.Id;
  });

  cukcukDetailOrders?.forEach((order) => {
    totalAmountOfOrders += order.TotalAmount;
    return totalAmountOfOrders;
  });

  const yesterdayArr = sainVoiceList?.filter((e) => {
    let yesterday = moment().subtract(1, "days").format("DD/MM/YYYY");
    return moment(e.RefDate).format("DD/MM/YYYY") === yesterday;
  });

  yesterdayArr?.map((sainVoice) => {
    return (yesterdayTotalAmount += sainVoice.TotalAmount);
  });

  const todayArr = sainVoiceList?.filter((e) => {
    let today = moment().format("DD/MM/YYYY");
    return moment(e.RefDate).format("DD/MM/YYYY") === today;
  });

  todayArr?.map((sainVoice) => {
    return (totalAmount += sainVoice.TotalAmount);
  });
  let vietNamD = Intl.NumberFormat("vi-VI");

  useEffect(() => {
    dispatch(cukcukOrderActions.getSingleCukcukOrder(cukcukOrderIds));
  }, [dispatch, totalAmount, totalAmountOfOrders]);

  return (
    <React.Fragment>
      <Title>Profit By {controller ? controller.mode : null}</Title>
      <Typography component="p" variant="h3" className="revenue-container">
        <div className="revenue-num">{vietNamD.format(totalAmount)} đ</div>
        <div className="revenue-num-container">
          <Typography
            component="p"
            className="revenue-container compare"
            style={{
              color:
                totalAmount - yesterdayTotalAmount > 0
                  ? "green"
                  : totalAmount - yesterdayTotalAmount < 0
                  ? "red"
                  : "#F3C501",
            }}
          >
            {totalAmount - yesterdayTotalAmount > 0 ? (
              <ArrowDropUpOutlinedIcon fontSize="medium" />
            ) : totalAmount - yesterdayTotalAmount < 0 ? (
              <ArrowDropDownOutlinedIcon fontSize="medium" />
            ) : null}
            {totalAmount - yesterdayTotalAmount < 0
              ? vietNamD.format(totalAmount - yesterdayTotalAmount).substring(1)
              : vietNamD.format(totalAmount - yesterdayTotalAmount)}{" "}
            đ
          </Typography>
          {/* <Typography component="p" className="revenue-container compare">
            Profit:{" "}
            <span
              style={{
                color: "green",
              }}
            >
              <ArrowDropUpOutlinedIcon fontSize="small" />
              {vietNamD.format(totalAmountOfOrders)} đ
            </span>
          </Typography> */}
        </div>
      </Typography>
      <Typography
        color="textSecondary"
        className={classes.depositContext}
        component="p"
      >
        On {controller.date}
      </Typography>
    </React.Fragment>
  );
}