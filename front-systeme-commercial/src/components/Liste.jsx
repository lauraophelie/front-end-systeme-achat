import { useTheme } from "@emotion/react";
import { Info, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, styled, tableCellClasses } from "@mui/material";
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import PropTypes from 'prop-types';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon/>}
        </IconButton>
      </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function Liste(props) {
  const { keys, rows } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  const navigate = useNavigate();

  const renderDetailsButton = (row) => {
      const handleDetailsClick = () => {
          console.log(`Détails pour la ligne avec l'id ${row.id}`);
          navigate("/details_besoin", { state : { id : row.id } });
      };

      return (
          <IconButton onClick={handleDetailsClick} aria-label="details">
              <Info />
          </IconButton>
      );
  };

  return (
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1250 }} aria-label="customized table">
              <TableHead>
                  <TableRow>
                      {keys.map((key) => (
                          <StyledTableCell key={key} align="center">
                              {key}
                          </StyledTableCell>
                      ))}
                      <StyledTableCell align="center"> Détails </StyledTableCell>
                  </TableRow>
              </TableHead>

              <TableBody>
                  {(rowsPerPage > 0
                      ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : rows
                  ).map((row, index) => (
                      <StyledTableRow key={index}>
                          {keys.map((key) => (
                              <StyledTableCell key={key} align="center">
                                  {row[key]}
                              </StyledTableCell>
                          ))}

                          <StyledTableCell align="center">
                              {renderDetailsButton(row)}
                          </StyledTableCell>
                      </StyledTableRow>
                  ))}
                  {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={keys.length + 1} />
                      </TableRow>
                  )}
              </TableBody>

              <TableFooter>
                  <TableRow>
                      <TablePagination
                          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                          colSpan={keys.length + 1}
                          count={rows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                              inputProps: {
                                  'aria-label': 'rows per page',
                              },
                              native: true,
                          }}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                      />
                  </TableRow>
              </TableFooter>
          </Table>
      </TableContainer>
  );
}

export default Liste;
