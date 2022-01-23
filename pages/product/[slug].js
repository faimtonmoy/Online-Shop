import { useRouter } from "next/router";
import React from "react";
import data from "../../utils/data";
import Layout from "../../Components/Layout";
import Link from "next/link";
import useStyles from "../../utils/styles";
import { Button, Card, Grid, List, ListItem } from "@material-ui/core";
import Image from "next/image";
export default function ProductDetails() {
  const classes = useStyles();
  const router = useRouter();
  const { slug } = router.query;
  const product = data.products.find((a) => a.slug === slug);
  if (!product) {
    return <div>Product Not Available</div>;
  }
  return (
    <Layout title={product.name}>
      <div className={classes.section}>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
          ></Image>
        </Grid>
        <Grid item md={3}>
          <ul>
            <h1 className={classes.details}>{product.name}</h1>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>Description: {product.description}</li>
          </ul>
        </Grid>
        <Grid item md={3}>
          <Card>
            <ul>
              <li>Price: {product.price}</li>
              <li>
                Status: {product.countInStock > 0 ? "In Stock" : "Unavailable"}
              </li>
                <Button color="primary">Add to Cart</Button>
            </ul>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
