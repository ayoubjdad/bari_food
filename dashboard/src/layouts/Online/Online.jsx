import React, { useState } from "react";
import styles from "./Online.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Divider, Tab } from "@mui/material";

const columns = [
  { id: "orderNumber", label: "#", minWidth: 20 },
  { id: "customer", label: "Client", minWidth: 200 },
  { id: "status", label: "Statut", minWidth: 120 },
  {
    id: "address",
    label: "Adresse",
    minWidth: 170,
    align: "left",
  },
  {
    id: "phone",
    label: "Téléphone",
    minWidth: 120,
    align: "left",
  },
  {
    id: "itemsCount",
    label: "Quantité",
    minWidth: 20,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "totalAmount",
    label: "Montant total (DH)",
    minWidth: 150,
    align: "right",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 150,
    align: "right",
  },
];

function createData(
  orderNumber,
  customer,
  status,
  date,
  totalAmount,
  itemsCount,
  address,
  phone
) {
  return {
    orderNumber,
    customer,
    status,
    date,
    totalAmount,
    itemsCount,
    address,
    phone,
  };
}

const rows = [
  createData(
    1001,
    "John Doe",
    "En attente",
    "2025-02-01",
    250.75,
    3,
    "123 Rue Principale, Casablanca",
    "+212 600-123456"
  ),
  createData(
    1002,
    "Jane Smith",
    "Livré",
    "2025-02-02",
    120.5,
    2,
    "456 Avenue Hassan II, Rabat",
    "+212 601-234567"
  ),
  createData(
    1003,
    "Michael Brown",
    "Livré",
    "2025-02-03",
    89.99,
    1,
    "789 Boulevard Mohammed V, Marrakech",
    "+212 602-345678"
  ),
  createData(
    1004,
    "Emily Johnson",
    "Annulé",
    "2025-02-04",
    0.0,
    0,
    "321 Rue de la Liberté, Fès",
    "+212 603-456789"
  ),
  createData(
    1005,
    "Chris Wilson",
    "En attente",
    "2025-02-05",
    300.25,
    5,
    "654 Quartier Agdal, Tanger",
    "+212 604-567890"
  ),
  createData(
    1006,
    "Olivia Martinez",
    "Livré",
    "2025-02-06",
    150.0,
    2,
    "987 Avenue des Nations, Agadir",
    "+212 605-678901"
  ),
  createData(
    1007,
    "Daniel Lee",
    "En attente",
    "2025-02-07",
    450.99,
    6,
    "741 Rue de la Paix, Oujda",
    "+212 606-789012"
  ),
  createData(
    1008,
    "Sophia Anderson",
    "Livré",
    "2025-02-08",
    75.45,
    1,
    "852 Route des Jardins, Meknès",
    "+212 607-890123"
  ),
  createData(
    1009,
    "David Harris",
    "En attente",
    "2025-02-09",
    200.0,
    4,
    "963 Boulevard Al Massira, Kenitra",
    "+212 608-901234"
  ),
  createData(
    1010,
    "Emma Thompson",
    "Livré",
    "2025-02-10",
    500.75,
    7,
    "159 Rue des Palmiers, Nador",
    "+212 609-012345"
  ),
];

export default function Online() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const ordersData = [
    {
      title: "Aujourd'hui",
      value: "48",
    },
    {
      title: "Livrés",
      value: "493",
    },
    {
      title: "En attente",
      value: "359",
    },
    {
      title: "Annulés",
      value: "6",
    },
  ];

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <div className={styles.orders}>
          <p className={styles.today}>
            <Box component="i" className="fi fi-rr-calendar" />
            <span>Aujourd'hui</span>
          </p>
          <Divider orientation="vertical" flexItem />
          {ordersData.map(({ title, value }, index) => (
            <>
              <Item title={title} value={value} />
              {index !== ordersData.length - 1 ? (
                <Divider orientation="vertical" flexItem />
              ) : null}
            </>
          ))}
        </div>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      // minWidth: column.minWidth,
                      borderRadius:
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.slice(0, columns.length - 1).map((column) => {
                        const value = row[column.id];

                        let style = {
                          padding: "2px 10px",
                          width: "fit-content",
                          borderRadius: "80px",
                          border: "1px solid",
                        };

                        if (column.id === "status") {
                          if (value === "En attente") {
                            style = {
                              ...style,
                              backgroundColor: "#fff5cc",
                              color: "#7a4100",
                              borderColor: "#7a4100",
                            };
                          } else if (value === "Livré") {
                            style = {
                              ...style,
                              backgroundColor: "#d3fcd2",
                              color: "#065e49",
                              borderColor: "#065e49",
                            };
                          } else if (value === "Annulé") {
                            style = {
                              ...style,
                              backgroundColor: "#ffe9d5",
                              color: "#7a0916",
                              borderColor: "#7a0916",
                            };
                          }
                        }

                        return (
                          <TableCell key={column.id} align={column.align}>
                            <p style={column.id === "status" ? style : {}}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </p>
                          </TableCell>
                        );
                      })}

                      <TableCell align="right">
                        {row.status !== "En attente" ? null : (
                          <div className={styles.actions}>
                            <Box
                              component="i"
                              className={`fi fi-rr-check ${styles.check}`}
                            />
                            <Box
                              component="i"
                              className={`fi fi-rr-cross ${styles.cross}`}
                            />
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </section>
  );
}

const Item = ({ title, value }) => {
  return (
    <div className={styles.item}>
      <p className={styles.title}>{title}</p>
      <p className={styles.value}>{value}</p>
    </div>
  );
};
