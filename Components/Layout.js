import Head from "next/head";
import React from "react";
import Link from "next/link";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import useStyles from "../utils/styles";
export default function LayOut({title, children }) {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>{title? `${title}`: "Online-Shop"}</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Link href="/">
            <a className={classes.brand}>Online-Shop</a>
          </Link>
          <div className={classes.grow}> </div>
              <div>
              <Link href="/myorder">
                  <a>My Order</a>
              </Link>
              <Link href="/cart">
                  <a>Cart</a>
              </Link>
              </div>
         
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
    </div>
  );
}
