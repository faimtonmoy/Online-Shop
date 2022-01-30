import {
  Card,
  Grid,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { mergeClasses } from "@material-ui/styles";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import LayOut from "../Components/Layout";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";

export default function OrderDetails() {
  const classes = useStyles();
  const router = useRouter();
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <LayOut title="Shopping Cart">
      <h1>Order Details</h1>
      <Grid container>
        <Grid item md={9}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <h2>Ordered Items</h2>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <Link href={`/product/${item.slug}`}>
                              <a>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  height={50}
                                  width={50}
                                ></Image>
                              </a>
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Link href={`/product/${item.slug}`}>
                              <a>
                                <h4>{item.name}</h4>
                              </a>
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Link href={`/product/${item.slug}`}>
                              <a>
                                <h4>${item.price}</h4>
                              </a>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3}>
          <Card>
            <ul>
              <li>
                <h4>
                  {" "}
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                  items) : $
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </h4>
              </li>
            </ul>
          </Card>
        </Grid>
      </Grid>
    </LayOut>
  );
}
