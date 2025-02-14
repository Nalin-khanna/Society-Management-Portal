import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { z, ZodCatch } from 'zod'
import axios from 'axios'
import { error } from 'console'

const Login = () => {
    const [username , setUsername] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const usernameSchema = z.string().min(3, "Username must be at least 3 characters long.")
    const emailSchema = z.string().email("Invalid email format.")
    const pwSchema = z.string().min(5, "Password must be at least 5 characters long.")
    const onSubmitHandler=(e)=>{
        e.preventDefault();
        const name = usernameSchema.safeParse(username);
        const pw = pwSchema.safeParse(password);
        const mail = emailSchema.safeParse(email);
        if(name.success && pw.success && mail.success){
            axios.post("http://localhost:3000/login",{
                
                    "username" : name.data,
                    "password" : pw.data,
                    "Email" : mail.data
                }
            ).catch((error)=>{
                console.log(error);
            })
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
    <div className="flex items-center justify-center min-h-screen" >
        <Card className="w-[350px]">
            <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your details</CardDescription>
            </CardHeader>
            <CardContent>
        <form onSubmit={onSubmitHandler}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                placeholder="Enter Your Full Name here" 
                onChange={(e) => {
                  setUsername(e.target.value);
                }} 
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="E-mail">E-mail id</Label>
              <Input id="name" placeholder="abc@gmail.com" onChange = {(e) => setEmail(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Password">Password</Label>
              <Input id="name" placeholder="*****" onChange = {(e) => setPassword(e.target.value)}/>
            </div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </CardContent>
        </Card>
    </div>

  )
}

export default Login