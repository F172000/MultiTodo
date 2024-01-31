import {
  doc,
  collection,
  deleteDoc,
  getDocs,
  addDoc,
  setDoc,
} from "firebase/firestore";
import db from "./Database";
export const addtodatabase = async (title,list,dispatch) => {
  if (title && list) {
    const result=await addDoc(collection(db, "list"), {
        title:title,
        list:list
    });
    const id=result.id;
    dispatch({type:'Setlist',payload:{id,title,list}});
  }
};
export const removefromdatabase=async(id,dispatch)=>{
    if(id){
      console.log(id);
       await deleteDoc(doc(db,'list',id));
       dispatch({type:'delete',payload:id});
    }
}
export const updatetodatabase=async(data,dispatch)=>{
    try{
      if (data) {
        console.log(data);
      await setDoc(doc(db, "list", data.id), {
        title:data.title,
        list:data.list
      });
      dispatch({type:"UpdateList",payload:data});
      
    }
    }catch(error){
      console.log(error.message);
      alert('Error updating data...');
    }
}
