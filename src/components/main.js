
import React from 'react';
import {setDoc,doc,collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addtodatabase, removefromdatabase,updatetodatabase } from './redux/firebaseOperation';
import db from './redux/Database';
import {Button,IconButton,Modal,Box,Typography,
Collapse,
Table,TableBody,TableCell,TableHead,TableRow} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
};

export default function Main() {
  const state=useSelector((state)=>state);
  console.log(state);
  const listings=useSelector((state)=>state.list);
  console.log('listings',listings);
  const dispatch=useDispatch();
  //loading data for single todo list
  const loadData=async()=>{
    const result=collection(db,'task');
    const tasksnapshot=await getDocs(result);

    tasksnapshot.docs.map(doc=>{
      console.log(doc.data().tasks);
      settasks(doc.data().tasks);
    })

    }
    //loading data for multitodo list 
    const loadlist=async()=>{
      const result=collection(db,'list');
      const listsnapshot=await getDocs(result);
      console.log('listsnapshot',listsnapshot);
      const newData = listsnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        list:doc.data().list
      }));
     console.log(newData);
     dispatch({type:'setstate',payload:newData});
    }
//useEffect to load data one time after re-render
   useEffect(()=>{
    const fetchData=async()=>{
      await loadData();
      await loadlist();
    }
    fetchData();
    },[]);

 const [title,settitle]=useState('');
 const [list,setlist]=useState([{name:''}]);
 const [tasks,settasks]=useState([{name:"eat",completed:false}]);
 const [task,settask]=useState('');

//mapping singletodo data 
 const gettask=()=>{
    return tasks.map((t,i)=><li key={i}  className={t.completed? "list-group-item list-group-item-success":"list-group-item list-group-item-danger"} onClick={()=>{updatetask(i)}} onDoubleClick={()=>{deletetask(i)}}>{t.name}</li>)
  }

  const storetasks=async(tasks)=>{
    settasks(tasks);
    try{
     await setDoc(doc(db,'task','first'),{
      tasks:tasks
     });
    }
    catch(error){
      console.log('error saving data');
    }
    }

  const updatetask=(i)=>{
  let newarr=[...tasks];
  newarr.splice(i,1,{name:newarr[i].name,completed:!newarr[i].completed});
  settasks(newarr);
  storetasks(newarr);
  }

  const deletetask=(i)=>{
  let newarr=[...tasks];
  newarr.splice(i,1);
  storetasks(newarr);
  }

  const handleAddTask=()=>{
    if(task){
      const newtask=[...tasks];
      newtask.push({name:task,completed:false});
      storetasks(newtask);
      settask({name:'',completed:false});
    }
    else{
      alert('Enter Valid value...')
    }
    }

  const addtask=()=>{
    setlist([...list, { name:'' }]);
    }

  const onremove=(index)=>{
    const newlist = [...list];
    newlist.splice(index, 1);
    setlist(newlist);
   }


  const addsubtask=(index,event)=>{
    const newlist = [...list];
    newlist[index].name= event.target.value;
    setlist(newlist);
    console.log(newlist);
  }

  const submittask=async()=>{
  await addtodatabase(title,list,dispatch);
  settitle('');
  setlist([{name:''}]);
  }

  return (
    <div className="App">
      <form>
       <div className='single'> 
        <input required className='form-control' placeholder='Enter task title' type='text' onChange={(e)=>settitle(e.target.value)}></input>
       <div >
         {list.map((field,index)=>(
         <div className='multi' key={index}>
         <input required className='form-control' type='text' placeholder='Add list of tasks' value={field.name} onChange={(event)=>addsubtask(index,event)}></input>
         <button className='buttonadd' onClick={()=>onremove(index)}>
          <i className="fas fa-minus"></i></button>
        {(index===list.length-1)?<button className='buttonadd' onClick={addtask}><i className="fas fa-plus"></i></button>:<></>}
         </div>
         ))}
         <div className='addtaskbtn'>
        <button className='btn btn-success w-100' onClick={submittask}>Add Task</button>
        </div>
        </div>
        <Table >
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{fontWeight:'bold'}}>Task Title</TableCell>
            <TableCell style={{fontWeight:'bold'}} >Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listings.map((row,index) => (
              <Row key={index} setlist={setlist} settitle={settitle} row={row} id={row.id} listings={listings} dispatch={dispatch}/>
          ))}
        </TableBody>
      </Table>
        </div>
        </form>
      <div className='multii'>
      <input className='form-control' type='text' placeholder='Enter the task' value={task.name} onChange={(e)=>settask(e.target.value)}></input>
      <button className='btn btn-success w-100' onClick={handleAddTask}>Change</button>
      <ul className="list-group">
      {gettask()}
      </ul>
      </div>
      </div>
  );
}


function Row({row,id,setlist,settitle,dispatch,listings}) {
 
const [open, setOpen] = React.useState(false);
const [openmodal,setopenmodal] = useState(false);
const [data,setdata]=useState([{id:'',title:'',list:[{name:''}]}]);
const handleClose = () => setopenmodal(false);

const savechanges=async()=>{
  await updatetodatabase(data[0],dispatch);
  settitle('');
  setlist([{name:''}]);
  handleClose();
}

const addsubitemtask=(index)=>{
  const newdata = [...data];
newdata[index] = {
  ...newdata[index],
  list: [...newdata[index].list, { name: "" }],
};
setdata(newdata);
}

const onremovesubitem=(index,ind)=>{
  const newdata = data.map((item, i) => {
    if (i === index) {
      return {
        ...item,
        list: item.list.filter((_, j) => j !== ind)
      };
    }
    return item;
  });
  setdata(newdata);
}

const updatesubtask=(event,ind,index)=>{
  let newupdatelist = [...data];
  newupdatelist[index] = {
  ...newupdatelist[index],
  list: [...newupdatelist[index].list],
   };
     newupdatelist[index].list[ind] = {
  ...newupdatelist[index].list[ind],
  name: event.target.value,
  };
    console.log(newupdatelist);
    setdata(newupdatelist);
}

const handledatatitle=(event,index)=>{
  let newdata=[...data];
  newdata[index].title=event.target.value;
  setdata(newdata);
  }

const removelist=async(id)=>{
  removefromdatabase(id,dispatch);
}

const editlist=(id)=>{
  setopenmodal(true);
  const item=listings.filter((item)=>item.id===id);
  const itemdata={
    id:item[0].id,
    title:item[0].title,
    list:item[0].list
  }
  setdata([itemdata]);
}

return (
  <React.Fragment>
    <TableRow >
      <TableCell>
        <IconButton
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon sx={{color:'white'}} /> : <KeyboardArrowDownIcon sx={{color:'white'}} />}
        </IconButton>
      </TableCell>
      <TableCell component="th" scope="row">
        {row.title}
      </TableCell>
      <TableCell >  
      <IconButton onClick={()=>removelist(id)}><i className="fa-solid fa-trash"></i></IconButton>
      <IconButton onClick={()=>editlist(id)}><i className="fas fa-pen-to-square"></i></IconButton></TableCell>
      <Modal
          open={openmodal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
         >
        <Box sx={style}>
        <Typography variant='h5' className='mb-1'>Update the task</Typography>
        {data?.map((item,index)=>(
        <React.Fragment key={index}>
         <input required className='form-control' type='text' value={item.title} onChange={(event)=>handledatatitle(event,index)}></input>
         {item.list.map((subitem,ind)=>(
         <div key={ind} className='listt'>
         <input required className='form-control' type='text' value={subitem.name} onChange={(event)=>updatesubtask(event,ind,index)} ></input>
         <IconButton ><i className="fas fa-minus" onClick={()=>onremovesubitem(index,ind)}></i></IconButton>
         {(ind===item.list.length-1)? <IconButton onClick={()=>addsubitemtask(index)}><i className="fas fa-plus"></i></IconButton>:<></>}
         </div>
         ))}
         </React.Fragment>
         ))}
         <Button variant='contained' className='p-2 mt-2' onClick={()=>savechanges()}>save changes</Button>
        </Box>
      </Modal>
    </TableRow>
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell style={{fontWeight:'bold'}}>Todo's</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.list.map((historyRow,i) => (
                  <TableRow 
                  key={i}
                  >
                    <TableCell >
                      {historyRow.name}
                    </TableCell>
                  </TableRow>
               ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  </React.Fragment>
);
}

