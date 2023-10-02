import React from 'react'

function Pagination({dta,handler}){
  let nums=[]
  for(let i=1;i<Math.floor(dta.length/6)+1;i++){
    nums.push(i)  
  }
  return(
    <>
    

     <div>  
     {
      nums.map((res)=>{
        return( 
          <>
          <button className="m-1 rounded-3 text-white"
           style={{border:"none",background:"#03a9f4"}} onClick={()=>handler(res)}>{res}</button> 
          </>
        )
      })
    }
     </div>


    </>
  )
}
export default Pagination