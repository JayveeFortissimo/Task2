import creation from "../Provider/createContext.js";
import { useContext } from "react"

const register = ({setRegister}) => {

const {Register,submitRegister} = useContext(creation);

  return (
    <section className='min-h-[80vh] flex justify-center items-center px-10'>
    <div className='w-[80vh] border border-black px-3 py-3 rounded'>
       <form onSubmit={submitRegister} className='w-[100%] flex flex-col'>
           <div className='w-[100%] flex flex-col'>
               <h1>Email</h1>
               <input type="text" 
                onChange={e => Register(e.target.value,"email")}
               placeholder='name' className='border border-black h-[2rem] px-2 py-5 flex-auto' />
           </div>
           <div className='w-[100%] flex flex-col'>
               <h1>Password</h1>
               <input type="password" 
               onChange={e => Register(e.target.value,"password")}
               placeholder='name' className='border border-black h-[2rem] px-2 py-5' />
           </div>

           <div className='w-[100%] flex flex-col'>
               <h1>Confirm</h1>
               <input type="password" 
               onChange={e => Register(e.target.value,"confirm")}
               placeholder='name' className='border border-black h-[2rem] px-2 py-5' />
           </div>
   
               <button  type='submit' className='border h-[2rem] w-auto flex-auto mt-3'>Submit</button>
            
            <div>
               <p onClick={()=>setRegister(els => !els)} className='cursor-pointer'>Have Account Already?</p>
            </div>
       </form>
    </div>
      </section>

  )
}

export default register