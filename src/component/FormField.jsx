import React from 'react'
import Loader from './Loader'

const FormField = ({ name, placeholder, type, labelName, value, 
  handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-900'
        >
          {labelName}
        </label>
        { isSurpriseMe && (
          <button 
              type='button'
              onClick={handleSurpriseMe}
              className='font-semibold text-sm bg-yellow-200 hover:bg-yellow-400 py-1 px-2 rounded-[5px] text-black'
          >
            Surprise Me
          </button>
        )}
      </div>
      <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required
          className='bg-gray-50 border border-gray-300 text-gray-900 text-s. rounded-lg focus:ring-[#4646ff] focus:border-[#4649ff] outline-none block w-full p-3'
      />      
    </div>
    
  )
}
 
export default FormField