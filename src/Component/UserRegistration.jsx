import { useEffect, useState } from "react"
import './registration.css'
import axios from 'axios';
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

export default function UserRegistration(){

    const navigate = useNavigate();
    const [data, setData] = useState({
        dp : 'icon24.png',
        username :' '
    });
    const[csrfToken,setcsrfToken] = useState('');

    const[loading,setLoading] = useState(false);
    const[fieldempty,setfieldempty] = useState(false);

    const handleOnChange = (e) => {
      // const { name, value } = e.target;

      // const filename = e.target.type === 'file' ? value.split('\\').pop() : value;
      const file = e.target.type === "file" ? e.target.value.split('\\').pop() : e.target.value;
           setData({...data,[e.target.name] : file})
        //    console.log(data.dp);
    };

   
    // useEffect(() =>{
    //   axios.get('http://localhost:8000/token')
    //   .then(response => {
    //     setcsrfToken(response.data.csrfToken);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   })
    // },[])
    const handleSubmission = (e) =>{
      e.preventDefault();
      if(!data.username.trim()){
        setfieldempty(true);
        return
      }
      setfieldempty(false);
      setLoading(true);
      setTimeout(()=>{
        setLoading(false);
        navigate('/Chat',{state:data});
        
      },2000)
    
      // if(!csrfToken){
      //   console.log("CSRF TOKEN NOT GENERATED!");
      //   return
      // }
      //   axios.post('http://localhost:8000/users/create', data, {
      //     headers:{
      //       'X-CSRF-TOKEN' : csrfToken,
      //       'Content-Type' : 'Application/json',
      //     }
      //   })
      //   .then((response => {
      //       console.log(response.data);
      //       setLoading(true);
      //       // localStorage.setItem('username',data?.username)
      //   }))
      //   .catch((error) =>{
      //       console.log(error);
      //   })
    }
    return(
       <>
  <div className="Body">
    <div>
        <h1 className="header">Profile</h1><br></br><br></br>
        <h4 className="subheader">Setup Your Profile</h4>
        <hr></hr>
<form onSubmit={handleSubmission}>
  <div className="label-input-container">
    <label htmlFor="dp" className="labeling">Choose Profile Picture</label>
    <input 
      className="field" 
      type="file" 
      accept="image/*" 
      name="dp" 
      onChange={handleOnChange}
      
 
    />
  </div>
  <div className="label-input-container">
    <label htmlFor="username" className="labeling">Enter Username</label>
    <input 
      className="field" 
      type="text" 
      value={data.username} 
      name="username" 
      onChange={handleOnChange}
      required 
    /><p style={{color:'red'}}>{fieldempty ? "Please Enter User Name!" : ""}</p>
  </div>
  <button type="submit" className="button">Done</button>
</form>

      {loading ? 
      (
      <Loading/>
      ):
      (
        <span></span>
      )}
    </div>
   
  </div>
</>

    )
}
