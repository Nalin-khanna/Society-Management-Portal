import { create } from 'zustand'
import {persist} from 'zustand/middleware'
export const useStore = create(persist((set)=>({
    user:null ,
    login : (curruser)=> set({user:curruser}),
    logout: ()=> set({user:null}),  
}) , {name:'user-storage'})
)