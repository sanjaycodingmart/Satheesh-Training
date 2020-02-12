import Axios from 'axios';

const instance=Axios.create({
    baseURL:'http://localhost:5003'
})
instance.defaults.headers.common['Authorization']=localStorage.getItem('userDetails');
instance.defaults.headers.post['Content-Type']='application/json';
instance.interceptors.request.use(request=>{
    return request;
  },error=>{
    console.log(error)
    return Promise.reject(error);
  })
instance.interceptors.response.use(response=>{
    console.log(response)
    if(response.data===401){
        localStorage.removeItem('userDetails')
        window.location.replace('/login ');
    }
    return response;
  },error=>{
    
    console.log(error)
    return Promise.reject(error);
  })

export default instance;