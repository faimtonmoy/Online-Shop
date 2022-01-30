import { Button, List, ListItem, TextField } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import LayOut from "../Components/Layout";
import { Store } from "../utils/Store";
import useStyles from "../utils/styles";

export default function CheckOut() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;
  const classes = useStyles();
  useEffect(() => {
    setValue("name", shippingAddress.name);
    setValue("email", shippingAddress.email);
    setValue("address", shippingAddress.address);
  }, []);
  const submitHandler = ({ name, email, address }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { name, email, address },
    });
    
    router.push("/orderdetails");
  };

  return (
    <LayOut title="CheckOut Page">
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <h1>Shipping Address</h1>
        <List>
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Name"
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === "minLength"
                        ? "Full Name length is more than 1"
                        : "Full Name is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: "email" }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === "pattern"
                        ? "Email is not valid"
                        : "Email is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="Address"
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === "minLength"
                        ? "Address length is more than 1"
                        : "Address is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button type="submit" fullWidth color="primary">
              Check Out
            </Button>
          </ListItem>
        </List>
      </form>
    </LayOut>
  );
}
