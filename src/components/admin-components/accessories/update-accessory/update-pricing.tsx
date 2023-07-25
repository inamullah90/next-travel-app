// @flow strict


import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { forwardRef, useState } from "react";
import { toast } from "react-toastify";
import serviceClient from "../../../../rest-api/client/service-client";

interface PropsType {
  handleCancelModal: any;
  price: any;
  setPricing: any;
}

const UpdatePricing = forwardRef<HTMLDivElement, PropsType>(({ handleCancelModal, price, setPricing }, ref) => {
  const [priceInput, setPriceInput] = useState({
    duration: price.duration || '',
    duration_ru: price.duration_ru || '',
    duration_hy: price.duration_hy || '',
    price: price.price || '',
  });
  const theme = useTheme();

  const handleChangeInput = (name: string, value: string) => {
    setPriceInput((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp[name] = value;
      return temp;
    })
  }

  const handleSubmit = async () => {
    if (!priceInput.duration || !priceInput.duration_ru || !priceInput.duration_hy || !priceInput.price) {
      toast.error("All fields are required!");
      return;
    }
    try {
      const res = await serviceClient.accessoriesPricing.updatePricing(price.id, priceInput);
      toast.success("Price updated successfully!");
      setPricing((prev: any) => {
        const temp = JSON.parse(JSON.stringify(prev));
        const index = temp.findIndex((item: any) => item.id === price.id);
        temp[index] = {
          ...priceInput,
          id: price.id,
        };
        return temp;
      })
      handleCancelModal();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }

  const formStyles = {
    modalContainer: {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      bgcolor: "background.paper",
      boxShadow: 24,
      px: '32px',
      py: 5,
      borderRadius: "12px",
      overflowY: "scroll",
      maxHeight: "90vh",
      color: "#5E5E5E",
      [theme.breakpoints.down("md")]: {
        width: "95%",
        p: 3,
      },
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      gap: "16px",
      mt: "20px",
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "repeat(1, 1fr)",
        gap: "8px",
        mt: "12px"
      },
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "16px",
    },
  };

  return (
    <Box tabIndex={-1} ref={ref} sx={formStyles.modalContainer}>
      <Typography
        sx={{ fontSize: "24px", color: "#004C99", fontWeight: 600 }}>
        Update Price
      </Typography>
      <Box
        sx={formStyles.gridContainer}>
        <TextField
          label='Duration'
          name="duration"
          value={priceInput?.duration}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <TextField
          label='Duration Ru'
          name="duration_ru"
          value={priceInput?.duration_ru}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <TextField
          label='Duration Hy'
          name="duration_hy"
          value={priceInput?.duration_hy}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <TextField
          label='Price'
          name="price"
          value={priceInput?.price}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
          type='number'
        />
        <div style={formStyles.buttonContainer} className="">
          <Button
            onClick={handleCancelModal}
            color="secondary"
            variant="outlined">
            Cancle
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained">
            Update
          </Button>
        </div>
      </Box>
    </Box>
  );
});

UpdatePricing.displayName = 'UpdatePricing';


export default UpdatePricing;