import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";

const defaultMessege = ['찾으시는 대여소명을 입력한 뒤 버튼을 눌러주세요.'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open, searchResult, isLoading } = props;

  const handleClose = () => {
    onClose(false);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  console.log(searchResult)

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">대여소 번호 선택</DialogTitle>
      {isLoading?(
        <div className="progress">
          <CircularProgress color="primary"/>
        </div>
    ):(
      <List>
        {searchResult.map((el) => (
          <ListItem button onClick={() => handleListItemClick(el.rentalNo)} key={el.rentalNo}>
            <ListItemText primary={el.rentalNo} />
            <ListItemText primary={el.rentalName} />
          </ListItem>
        ))}
      </List>
    )}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function RentalDialog(props) {
  const {searchKeyword, onClose} = props;
  const [searchResult, setSearchResult] = React.useState(defaultMessege);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(false);
  const [isLoading, setIsLoding] = React.useState(false);

  const getList = async (e) => {
    setIsLoding(true);
    const searchResult = await axios.get("/api/rent",{
        params:{
            searchKeyword: e
        }
    })
    setSearchResult(searchResult.data);
    setIsLoding(false);
  };

  const handleClickOpen = () => {
    getList(searchKeyword);
    setOpen(true);
  };

  const handleClose = (value) => {
    if(value!==false){
      setSelectedValue(value);
      onClose(value);
    }
    setOpen(false);
  };

  return (
    <div style={{"display":"inline-block"}}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        대여소번호 확인
      </Button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} searchResult={searchResult} isLoading={isLoading} />
    </div>
  );
}
