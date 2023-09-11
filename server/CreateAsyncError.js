const CreateAsyncError =(status,message)=>{
    const err = new Error();
   err.message= message;
   err.status= status;
}

module.exports = CreateAsyncError ;
