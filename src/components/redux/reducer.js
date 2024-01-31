const initialstate=[
    {id:'adf', title:'app',list:[
        {
            name:'frontend',
        },{
            name:'backend'
        }
    ]}
]
const  listReducer=(state=initialstate,action)=>{
    switch(action.type){
        case 'Setlist':
            return [...state,{id:action.payload.id,title:action.payload.title,list:action.payload.list}];
        case 'delete':
            return state.filter((task)=>task.id!==action.payload);
        case 'setstate':
            console.log("this is setstate",state);
            return state=action.payload;
        case 'UpdateList':
    return state.map((task) => {
        if (task.id === action.payload.id) {
            return {
                ...task,
                title: action.payload.title,
                list: action.payload.list.map((subitem) => ({ ...subitem })),
            };
        } else {
            return task;
        }
    });
           
        default:
            return state;
    }
}
export default listReducer;