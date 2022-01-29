import {
    Button,
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import LayOut from "../Components/Layout";
import { Store } from "../utils/Store";

export default function CartScreen() {
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  return (
    <LayOut title="Shopping Cart">
      <h1>Shopping Cart</h1>
      <Grid container>
        <Grid item md={9}>
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
            <Button color='primary'>Check Out</Button>
          </Card>
        </Grid>
      </Grid>
    </LayOut>
  );
}
