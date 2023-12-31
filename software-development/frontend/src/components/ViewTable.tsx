import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import axios, { AxiosError, AxiosResponse } from 'axios';


import { Button, TextField } from '@mui/material';
import { CsvBuilder } from 'filefy';




interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

// const token = sessionStorage.getItem('token');

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}


interface RowData {
    id: number;
    idSecond: number;
    front: string;
    back: string;
  }


const CustomPaginationActionsTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [fetchedData, setFetchedData] = React.useState<RowData[]>([]);


  const columns = [
    { id: 'id', label: 'Deck' },
    { id: 'idSecond', label: 'ID' },
    { id: 'front', label: 'Front' },
    { id: 'back', label: 'Back' },
  ];

  const handleExport = () => {
    
    const columns = ['id', 'idSecond', 'front', 'back'];
  
    
    const data = fetchedData.map(row => [String(row.id), String(row.idSecond), row.front, row.back]);
  
    
    const builder = new CsvBuilder('filename.csv');
  
    // Configure the CsvBuilder and export the file
    builder
      .setDelimeter(',')
      .setColumns(columns)
      .addRows(data)
      .exportFile();

  };
  


 
const emptyRows = rowsPerPage - Math.min(rowsPerPage, fetchedData.length - page * rowsPerPage);


  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    setFetchedData([]);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const API_ENDPOINT = 'https://cards2api.azurewebsites.net/Cards';

  const DeckButton: React.FC = () => {

  const [parameter, setParameter] = React.useState<number | undefined>(undefined);
    
  
    const handleCertainDeckRequest = () => {
      const token = sessionStorage.getItem('token');
      let url = 'https://cards2api.azurewebsites.net/Cards';
       
      if (parameter !== undefined) {
        url += `/${parameter}`;
      }
      console.log(url)
      setFetchedData([]);
  
      axios({
        method: 'GET',
        url: url,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response: AxiosResponse) => {
          
          console.log('API call successful:', response.data);
          setFetchedData(response.data); 
        //   setParameter(undefined)
        })
        .catch((error: AxiosError) => {
          
          console.error('API call error:', error);
        });
    };
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const parsedValue = parseInt(value, 10);
      setParameter(isNaN(parsedValue) ? undefined : parsedValue);
      
    };
  
  
    return (
      <div id= 'buttonTopSeparator' style={{  marginRight: '40px'}}>
        <TextField label="Deck to check..." size="small" variant="outlined" value={parameter || ''} onChange={handleInputChange}/>&nbsp;
        <Button  variant="contained" className='standardButton'  onClick={handleCertainDeckRequest}>
          View
        </Button>
      </div>
    );
  };





const handleGetRequest = () => {
  const token = sessionStorage.getItem('token');
  axios.get(API_ENDPOINT, { headers: {
    Authorization: `Bearer ${token}`
  }})
    .then((response) => {
      
      console.log(response.data);
      setFetchedData(response.data); 
    })
    .catch((error) => {
      
      console.error(error);
    });
};



  return (
    <div>
    <TableContainer component={Paper}>
      <Table  sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
          <TableCell align="left">{columns[0].label}</TableCell>
            <TableCell align="left">{columns[1].label}</TableCell>
            <TableCell align="right">{columns[2].label}</TableCell>
            <TableCell align="right">{columns[3].label}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? fetchedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : fetchedData
          ).map((row) => (
            <TableRow key={row.id}>
              
              <TableCell style={{ width: 10 }} align="left">
                {row.id}
              </TableCell>
              <TableCell style={{ width: 20 }} align="left">
                {row.idSecond}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.front}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.back}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={fetchedData.length}
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
    <Button id = 'buttonSeparator' variant="contained" className='standardButton' onClick={handleExport}>Export as CSV</Button>

    
    <Button id = 'buttonSeparator' variant="contained" className='standardButton' onClick={handleGetRequest}>Fetch All Decks</Button>
    
    <DeckButton/>
    </div>
    
  );
}

export default CustomPaginationActionsTable;


