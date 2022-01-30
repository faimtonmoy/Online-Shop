import React, { useContext } from "react";
import Layout from "../../Components/Layout";
import Link from "next/link";
import useStyles from "../../utils/styles";
import { Button, Card, Grid } from "@material-ui/core";
import Image from "next/image";
import db from "../../utils/db";
import Product from "../../models/Product";
import { Store } from "../../utils/Store";
import { useRouter } from "next/router";



export default function ProductDetails(props) {
  const { dispatch}= useContext(Store);
  const {product}= props;
  const classes = useStyles();
  const router= useRouter();
 
  if (!product) {
    return <div>Product Not Available</div>;
  }
  const addToCartHandler= async()=>{
    dispatch({type:'CART_ADD_ITEM', payload: {...product, quantity:1}});
    router.push('/cart');
  };
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
                <Button color="primary" onClick={addToCartHandler}>Add to Cart</Button>
            </ul>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
// export async function getStaticPaths() {
//   await db.connect();
//   const products= await Product.find({}).lean();
//   await db.disconnect();
//   const paths= products.map((product)=>({
//     params: {slug: product.slug}
//   }));
//   return {
//     paths,
//     fallback: false
//   };
// }
// export async function getStaticProps(context)
// {
//   const {params}= context;
//   const {slug}= params;
//   await db.connect();
//   const product= await Product.findOne({slug}).lean();
//   await db.disconnect();
//   return{
//     props:{
//       product: db.convertDocToObj(product),
//     }
    
//   };
// }
export async function getServerSideProps(context)
{
  const {params}= context;
  const {slug}= params;
  await db.connect();
  const product= await Product.findOne({slug}).lean();
  await db.disconnect();
  return {
    props:{
      product: db.convertDocToObj(product),
    },
    
  };
}
