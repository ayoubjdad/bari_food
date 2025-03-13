// import React, { useEffect, useRef, useState } from "react";
// import styles from "./Entry.module.scss";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import { Autocomplete, Box, Button, Modal, TextField } from "@mui/material";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { serverUrl } from "../../../../config/config";
// import { products } from "../../../../data/data";
// import {
//   displayErrorNotification,
//   displaySuccessNotification,
// } from "../../../../components/toast/success/SuccessToast";

// const columns = [
//   { id: "onSiteNumber", label: "#", minWidth: 20 },
//   { id: "item", label: "Elément", minWidth: 200, align: "left" },
//   { id: "quantity", label: "Quantité", minWidth: 20, align: "left" },
//   {
//     id: "totalAmount",
//     label: "Montant total (DH)",
//     minWidth: 150,
//     align: "right",
//   },
// ];
// const getOnSites = async (date) => {
//   return [];
// };

// export default function Entry() {
//   const queryClient = useQueryClient();

//   const {
//     data: onSites,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["onSites"],
//     queryFn: () => getOnSites(),
//   });

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <section className={styles.main}>
//       <div className={styles.container}>
//         <FormBC />

//         <TableContainer sx={{ maxHeight: 440 }}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {columns.map((column, index) => (
//                   <TableCell
//                     key={column.id}
//                     align={column.align}
//                     style={{
//                       bonSiteRadius:
//                         index === 0
//                           ? "12px 0 0 12px"
//                           : index === columns.length - 1
//                           ? "0 12px 12px 0"
//                           : 0,
//                     }}
//                   >
//                     {column.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {isLoading ? (
//                 <TableRow>
//                   <TableCell colSpan={columns.length} align="center">
//                     Chargement...
//                   </TableCell>
//                 </TableRow>
//               ) : isError ? (
//                 <TableRow>
//                   <TableCell colSpan={columns.length} align="center">
//                     Erreur lors du chargement des commandes.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 onSites
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((onSite, index) => (
//                     <TableRow hover key={onSite._id}>
//                       {columns.slice(0, columns.length - 1).map((column) => {
//                         let value;

//                         switch (column.id) {
//                           case "onSiteNumber":
//                             value = index + 1 + page * rowsPerPage;
//                             break;
//                           case "customer":
//                             value =
//                               onSite.user?.name ||
//                               onSite.shippingAddress?.fullName ||
//                               "Inconnu";
//                             break;
//                           case "address":
//                             value = onSite.shippingAddress?.address || "N/A";
//                             break;
//                           case "phone":
//                             value = onSite.shippingAddress?.phone || "N/A";
//                             break;
//                           case "itemsCount":
//                             value = onSite.items.length;
//                             break;
//                           case "totalAmount":
//                             value = onSite.totalAmount.toFixed(2);
//                             break;
//                           default:
//                             value = "";
//                         }

//                         return (
//                           <TableCell key={column.id} align={column.align}>
//                             <p>
//                               {column.format && typeof value === "number"
//                                 ? column.format(value)
//                                 : value}
//                             </p>
//                           </TableCell>
//                         );
//                       })}
//                     </TableRow>
//                   ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={onSites?.length || 0}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </div>
//     </section>
//   );
// }

// const FormBC = ({ onSites }) => {
//   const productsList = products.map(({ name, price }) => ({
//     label: name,
//     price,
//   }));

//   const [orderItems, setOrderItems] = useState([]);
//   const [currentItem, setCurrentItem] = useState({
//     product: null,
//     quantity: 1,
//     price: "",
//   });

//   const handleProductChange = (event, newValue) => {
//     console.log(":::::: ~ newValue:", newValue);
//     if (newValue) {
//       setCurrentItem({
//         ...currentItem,
//         product: newValue.label,
//         price: newValue.price,
//       });
//     } else {
//       setCurrentItem({ product: null, quantity: 1, price: "" });
//     }
//   };

//   const handleQuantityChange = (e) => {
//     setCurrentItem({
//       ...currentItem,
//       quantity: Number(e.target.value),
//       price:
//         Number(e.target.value) *
//         (currentItem.product ? currentItem.product.price : 0),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let totalPrice = 0;
//     orderItems.forEach(
//       ({ quantity, price }) => (totalPrice += Number(quantity) * Number(price))
//     );

//     const newOrder = {
//       items: [...orderItems],
//       totalAmount: totalPrice,
//     };

//     try {
//       const response = await fetch(`${serverUrl}/api/onSites`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newOrder),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to place order");
//       }

//       displaySuccessNotification("Commande confirmée");
//       setOrderItems([]);
//       setCurrentItem({ product: null, quantity: 1, price: "" });
//     } catch (error) {
//       displayErrorNotification("Erreur lors de la soumission de la commande");
//       console.error("❌ Error submitting order:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className={styles.form}>
//       <Autocomplete
//         options={productsList}
//         getOptionLabel={(option) => option.label}
//         value={currentItem.product}
//         onChange={handleProductChange}
//         renderInput={(params) => (
//           <TextField {...params} placeholder="Produit" />
//         )}
//       />

//       <TextField
//         placeholder="Quantité"
//         name="quantity"
//         type="number"
//         value={currentItem.quantity}
//         onChange={handleQuantityChange}
//       />

//       <TextField
//         placeholder="Prix"
//         name="price"
//         type="number"
//         value={currentItem.price}
//         InputProps={{ readOnly: true }}
//       />

//       <Button type="submit">Ajouter BC</Button>
//     </form>
//   );
// };

import React, { useEffect, useRef, useState } from "react";
import styles from "./Entry.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Autocomplete, Box, Button, Modal, TextField } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { serverUrl } from "../../../../config/config";
import { products } from "../../../../data/data";
import {
  displayErrorNotification,
  displaySuccessNotification,
} from "../../../../components/toast/success/SuccessToast";

const columns = [
  { id: "onSiteNumber", label: "#", minWidth: 20 },
  { id: "item", label: "Elément", minWidth: 200, align: "left" },
  { id: "quantity", label: "Quantité", minWidth: 20, align: "left" },
  {
    id: "totalAmount",
    label: "Montant total (DH)",
    minWidth: 150,
    align: "right",
  },
];
const getOnSites = async (date) => {
  return [];
};

export default function Entry() {
  const queryClient = useQueryClient();

  const {
    data: onSites,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["onSites"],
    queryFn: () => getOnSites(),
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <FormBC />

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      bonSiteRadius:
                        index === 0
                          ? "12px 0 0 12px"
                          : index === columns.length - 1
                          ? "0 12px 12px 0"
                          : 0,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    Chargement...
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    Erreur lors du chargement des commandes.
                  </TableCell>
                </TableRow>
              ) : (
                onSites
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((onSite, index) => (
                    <TableRow hover key={onSite._id}>
                      {columns.slice(0, columns.length - 1).map((column) => {
                        let value;

                        switch (column.id) {
                          case "onSiteNumber":
                            value = index + 1 + page * rowsPerPage;
                            break;
                          case "customer":
                            value =
                              onSite.user?.name ||
                              onSite.shippingAddress?.fullName ||
                              "Inconnu";
                            break;
                          case "address":
                            value = onSite.shippingAddress?.address || "N/A";
                            break;
                          case "phone":
                            value = onSite.shippingAddress?.phone || "N/A";
                            break;
                          case "itemsCount":
                            value = onSite.items.length;
                            break;
                          case "totalAmount":
                            value = onSite.totalAmount.toFixed(2);
                            break;
                          default:
                            value = "";
                        }

                        return (
                          <TableCell key={column.id} align={column.align}>
                            <p>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </p>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={onSites?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </section>
  );
}

const FormBC = () => {
  const productsList = products.map(({ name, price }) => ({ name, price }));

  const defaultValue = {
    name: "",
    price: "",
    totalAmount: "",
    quantity: 1,
  };

  const [selectedProduct, setSelectedProduct] = useState({ ...defaultValue });

  const handleProductChange = (_, newValue) => {
    if (newValue) {
      setSelectedProduct({
        ...newValue,
        quantity: 1,
        totalAmount: newValue.price,
      });
    } else {
      setSelectedProduct({ ...defaultValue });
    }
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);

    setSelectedProduct({
      ...selectedProduct,
      totalAmount: selectedProduct?.price * value,
      quantity: value,
    });
  };

  const handleSubmit = () => {
    try {
    } catch (error) {
      console.error("❌", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Autocomplete
        style={{ width: "40%" }}
        options={productsList}
        getOptionLabel={(option) => option.name}
        value={selectedProduct}
        onChange={handleProductChange}
        renderInput={(params) => (
          <TextField {...params} placeholder="Produit" />
        )}
      />

      <TextField
        placeholder="Quantité"
        name="quantity"
        type="number"
        value={selectedProduct?.quantity}
        onChange={handleQuantityChange}
      />

      <TextField
        placeholder="Prix"
        name="totalAmount"
        type="number"
        value={selectedProduct?.totalAmount}
        InputProps={{ readOnly: true }}
      />

      <Button type="submit">Ajouter BC</Button>
    </form>
  );
};
