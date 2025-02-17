import axios from 'axios'
import { create } from 'zustand'
import {persist} from 'zustand/middleware'
export const useStore = create(persist((set)=>({
    user:null ,
    login : (curruser)=> set({user:curruser}),
    logout: ()=> set({user:null}),
    verify: async ()=>{
        try{
        const token = localStorage.getItem('token') 
        const response = await axios.get("http://localhost:3000/verify",{
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        if(response.data.success){
            set({user:response.data.user})
        }}
        catch(error){
            console.log(error)
            set({ user: null })
            localStorage.removeItem('token')
        }
    }
}) , {name:'user-storage'})
)