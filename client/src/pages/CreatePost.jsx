import React, { useState }from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from '../components';

const CreatePost = () => {
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
          const response = await fetch('https://genairtify.onrender.com/api/v1/post', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form)        
          });
          await response.json();
          navigate('/');
      } catch(error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Kindly provide a prompt and initiate the image generation process")
    }
  }
  
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://genairtify.onrender.com/api/v1/dalle', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        })

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
        console.log(err)
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Kindly furnish an appropriate prompt, if you may');
    }
  };

  const navigate = useNavigate();
  const [form, setForm] = useState({name: '', prompt: '', photo: '',});
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  
  return (
    <>
    <section className='sm:p-8 px-4 py-8 max-w-7xl'>
      <div>
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">Visualize your Imaginative Mind</h1>
          <p className="mt-3 text-[#27272a] text-[18px] max-w-[500px]">
            Create imaginative and visually stunning images generated through DALL-E AI and share them amongst the GenAIrtify community.
          </p>
        </div>
      </div>
      <form className='mt-12 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4'>
          <FormField 
            labelName='Your Name' 
            type='text' 
            name='name' 
            placeholder='John Doe' 
            value={form.name} 
            handleChange={handleChange}
          />
          <FormField 
            labelName='Prompt' 
            type='text' 
            name='prompt' 
            placeholder='3D render of a cute tropical fish in an aquarium on a dark blue background, digital art' 
            value={form.prompt} 
            handleChange={handleChange} 
            isSurpriseMe 
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className='mt-2 relative bg-grey-50 border border-slate-600 text-grey-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain'/>
            ) : (
              <img src={preview} alt='preview' className='w-9/12 h-9/12 object-contain opacity-40'/>
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <a href="#_" onClick={generateImage} className="relative inline-flex items-center justify-start inline-block px-5 py-3 overflow-hidden font-bold rounded-full group bg-[#6469ff]">
            <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-black">{generatingImg ? 'Generating...' : 'Generate'}</span>
            <span className="absolute inset-0 border-2 border-white rounded-full"></span>
          </a>
        </div>

        <div className="mt-10">
          <p className="mt-3 text-[#27272a] text-[16px] max-w-[800px]"> Once you have created the image you want, you can share it with others in the community</p>
          <a href="#_" onClick={handleSubmit} type="submit" className="mt-3 relative inline-flex items-center justify-start overflow-hidden inline-block px-5 py-3 font-bold rounded-full group bg-[#6469ff]">
            <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
            <span className="absolute top-0 -left-8 w-64 h-64 -mt-1 transition-all duration-500 ease-in-out rotate-42 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-1"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-black">
             {loading ? 'Sharing...' : 'Share with Community'}
            </span>
           <span className="absolute inset-0 border-2 border-white rounded-full"></span>
          </a>
        </div>
      </form>
    </section>
    <hr className= 'mt-10 w-screen px-10' style={{ background: "#4b5563", height: "1px", border: "none",}} />
    <section className='sm:p-2 px-4 max-w-7xl'>
      <div className='relative flex'>
        <p className="mt-2 font-bold text-[#27272a] text-b text-[12px] ">GenAitrify<span>&trade;</span>, under the proprietorship of Mr. Rupin Mehra, prioritizes the establishment of a secure and enjoyable community environment for all users. We are committed to ensuring the safety and amusement of each individual who utilizes our platform. </p>
      </div>
    </section>
  </>
  )
}

export default CreatePost