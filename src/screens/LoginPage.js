import * as React from 'react';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import {Typography,Button,Modal,Box,TextField,Table,TableBody,TableCell,TableContainer,TableHead,TableRow, Paper} from '@mui/material';
import {ADD, getData} from "../actions/action"


export const LoginPage = () => {
  const [data,setData]=React.useState([{name : "",
      currency : "",
      incoming : "",
      expense: ""}])
  const [open, setOpen] = React.useState(false);
  const [formInfo, setFormInfo] = React.useState({name: '',currency:'',incoming: '',expense:''})
  const [textData,setTextData]=React.useState("");
  const [change, setChange] = React.useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const handleOpen = () => {setOpen(true);}
  const handleClose = () => {setOpen(false);}

  async function addData(){
    let state = (await getData()).data
    //data.push(formInfo)
    if (state) state.push({name:formInfo.name, currency:formInfo.currency, incoming: formInfo.incoming, expense: formInfo.expense})
    else state = [{name:formInfo.name, currency:formInfo.currency, incoming: formInfo.incoming, expense: formInfo.expense}]
    const checker = await ADD(state)
    setChange(!change)
  }

  React.useEffect(()=> {
      getData().then((currentData)=> {
          if(!Object.keys(currentData) || !currentData.data) setData([{name : "test",
              currency : "test",
              incoming : "test",
              expense: "test"}])
          else setData(currentData.data)
      })
  }, [change])

    //console.log(data)
  return (
      <div className="App">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Currency Converter</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Currency</TableCell>
                <TableCell align="right">Incoming</TableCell>
                <TableCell align="right">Expense</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                  <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.currency}</TableCell>
                    <TableCell align="right">{row.incoming}</TableCell>
                    <TableCell align="right">{row.expense}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={handleOpen}>Veri Ekle</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Veri Ekle
            </Typography>

            <TextField style ={{marginBottom:10}} id="outlined-basic" label="Name" variant="outlined" value={formInfo.name}
                       onChange={(e) => {
                         setFormInfo({...formInfo, name: e.target.value})
                       }}
            />
            <TextField style ={{marginBottom:10}} id="outlined-basic" label="Currency" variant="outlined" value={formInfo.currency}
                       onChange={(e) => {
                         setFormInfo({...formInfo, currency: e.target.value})
                       }}
            />
            <TextField style ={{marginBottom:10}} id="outlined-basic" label="Incoming" variant="outlined" value={formInfo.incoming}
                       onChange={(e) => {
                         setFormInfo({...formInfo, incoming: e.target.value})
                       }}
            />
            <TextField style ={{marginBottom:10}} id="outlined-basic" label="Expense" variant="outlined" value={formInfo.expense}
                       onChange={(e) => {
                         setFormInfo({...formInfo, expense: e.target.value})
                       }}
            />
            <Button onClick={()=>{addData();setOpen(false)}}>Ekle</Button>
            <Button onClick={()=>{setOpen(false)}}>Kapat</Button>
          </Box>
        </Modal>
      </div>
  );
};
