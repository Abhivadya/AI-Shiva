import React from 'react'

const Loader = () => {
  return (
   <div >
    <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] 
        text-purple-800 motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"
    >
  </div> 
</div>
  
  )
}

export default Loader