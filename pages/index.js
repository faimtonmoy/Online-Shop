import LayOut from "../Components/LayOut";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import data from "../utils/data";
import Link from "next/link";
import db from "../utils/db";
import Product from "../models/Product";

export default function Home(props) {
  const {products}= props;
  return (
    <div>
      <LayOut>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <Link href={`product/${product.slug}`}>
                  <a>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={product.image}
                        title={product.name}
                      ></CardMedia>
                      <CardContent>
                        <Typography>{product.name}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </a>
                </Link>

                <CardActions>
                  <Typography> ${product.price}</Typography>
                </CardActions>
                <Button size="small" color="primary">
                  Add to cart
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </LayOut>
    </div>
  );
}
export async function getServerSideProps()
{
  await db.connect();
  const products= await Product.find({}).lean();
  await db.disconnect();
  return {
    props:{
      products: products.map(db.convertDocToObj),
    },
    
  };
}