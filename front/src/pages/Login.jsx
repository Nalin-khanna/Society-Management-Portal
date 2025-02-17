import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import { useStore } from '../store/Store'


const Login = () => {
    const navigate = useNavigate();
    
    const [username , setUsername] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const login = useStore((state)=>state.login)
    const usernameSchema = z.string().min(3, "Username must be at least 3 characters long.")
    const emailSchema = z.string().email("Invalid email format.")
    const pwSchema = z.string().min(5, "Password must be at least 5 characters long.")
    const onSubmitHandler= async (e)=>{
        e.preventDefault();
        const name = usernameSchema.safeParse(username);
        const pw = pwSchema.safeParse(password);
        const mail = emailSchema.safeParse(email);
        if(name.success && pw.success && mail.success){
          try{
            const response = await axios.post("http://localhost:3000/login",{
              "username" : name.data,
              "Email" : mail.data,
              "password" : pw.data,
             }
           )
           if(response.data.success){
            localStorage.setItem("token",response.data.token);
            login(response.data.user);
            if(response.data.user.role == "admin"){
              console.log("navigating to admin dashboard")
              navigate('/Admin-dashboard')
            }
            else{
              console.log("navigating to user dashboard")
              navigate('/User-dashboard')
            }
          }
          }
            catch(error){
              if(error.response){
                if (error.response.status == 401){
                  alert("Invalid email or password. Please try again.");
                }else {
                  alert("An unexpected error occurred.");
                }
              }
              else if(error.request){
                alert("Network error. Please check your connection.");
              }
              else{
                alert("An error occurred. Please try again.");
              }
            }
            
            console.log(`username: ${name.data} , password: ${pw.data} email: ${mail.data}`)
        }else{
            let errorMessage = "";
            if (!name.success) {
                errorMessage += `Username Error: ${name.error.issues[0].message}\n`;
            }
            if (!mail.success) {
                errorMessage += `Email Error: ${mail.error.issues[0].message}\n`;
             }
            if (!pw.success) {
               errorMessage += `Password Error: ${pw.error.issues[0].message}\n`;
            }
            alert(errorMessage);
        }

    }
  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-900 to-navy-950 flex flex-col justify-center items-center'>
  <h1 className="text-5xl font-semibold text-slate-100 mb-6 tracking-wide">
    EDC Management Portal
  </h1>

  <Card className="w-[400px] shadow-lg">
    <CardHeader className="text-center">
      <CardTitle className="text-3xl text-slate-800">Login</CardTitle>
      <CardDescription className="text-slate-600">
        Enter your credentials
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form onSubmit={onSubmitHandler}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name" className="text-lg text-slate-700">Name</Label>
            <Input 
              id="name" 
              placeholder="Enter Your Full Name here" 
              onChange={(e) => setUsername(e.target.value)} 
              className="text-base"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="E-mail" className="text-lg text-slate-700">E-mail</Label>
            <Input 
              id="email" 
              placeholder="abc@gmail.com" 
              onChange={(e) => setEmail(e.target.value)} 
              className="text-base"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="Password" className="text-lg text-slate-700">Password</Label>
            <Input 
              id="password" 
              placeholder="*****" 
              type="password"
              onChange={(e) => setPassword(e.target.value)} 
              className="text-base"
            />
          </div>
          <Button type="submit" className="w-full mt-4 hover:bg-blue-700 text-white">
            Submit
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</div>
    

  )
}

export default Login