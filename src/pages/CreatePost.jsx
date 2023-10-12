import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {preview} from '../assets';
import {getRandomPrompt} from '../utils';
import { Loader, FormField } from '../component';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setform] = useState({
    name : '',
    prompt : '',
    photo : ''
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const generateImage = async () => {
     if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers : {
         
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setform({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        console.log(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }

  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      if(form.prompt && form.photo) {
        setLoading(true);
        try {
          const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers : {         
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form)
          })
          await response.json();
          navigate('/');
          } catch(error){
          alert(error)
          } finally {
            setLoading(false);
          }
        } else {
          alert('Please enter a prompt and generate an image');
        }   
  };

  const handleChange =(e) => {
      setform({...form, [e.target.name]:e.target.value})
  };

  const handleSurpriseMe = () => {
      const randomPrompt = getRandomPrompt();
      setform({...form, prompt:randomPrompt})
  };
  return (
     <section className='max-w-7xl mx-auto'>
        <div>
            <h1 className='font-extrabold text-black-700 text-[32px]'>Create</h1>
            <p className='mt-2 text-[#666e75] text-[16px] max-w-[750px]'> create imaginative and visually stunning images through DALL-E AI and share them with the community</p>
        </div>

        <form className='mt-6 max-w-3xl' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <FormField 
               labelName = "Your Name"
               type = "text"
               name = "name"
               placeholder = "Shiva Abhivadya"
               value = {form.name}
               handleChange = {handleChange}
            />

            <FormField 
               labelName = "Prompt"
               type = "text"
               name = "prompt"
               placeholder = "Astranout riding a white horse in space"
               value = {form.prompt}
               handleChange = {handleChange}
               isSurpriseMe
               handleSurpriseMe = {handleSurpriseMe}
            />

            <div className='mt-1 flex gap-5'>
                <button
                    type='button'
                    onClick={generateImage}
                    className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                >
                  {generatingImg? 'Generating...' : 'Generate'}
                </button>
            </div>

            <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-84 p-3 h-84 flex justify-center items-center'>
              {form.photo? (
                <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain'/>
               ) : (
               <img src={preview} alt="Preiview" className='w-70 h-70 object-contain opacity-40'/>
               )}

              { generatingImg && (
                <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0, 0, 0, 0.5)] rounded-lg'>
                  <Loader/>
                </div>
              )}
            </div>

            <div className='mt-1'>
                <p className='mt-1 text-[#666e75] text-[14px]'>
                  Once you have created the image you want, you can share it with others in the community
                </p>
            </div>
            <button type='submit' className='mt-1 text-white bg-purple-800 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
              { loading? 'sharing...' : 'share with the community'}
            </button>
          </div>
        </form>
     </section>
  )
}

export default CreatePost