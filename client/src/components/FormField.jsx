import React from 'react';

const FormField = ({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => (
  <div>
    <div className="flex items-center align-center gap-5 mb-2">
      <label htmlFor={name} className="block text-lg font-medium text-[#27272a]">
        {labelName}
      </label>
      {isSurpriseMe && (
          <a href="#_" onClick={handleSurpriseMe} class="relative border border-white w-25 h-10 inline-flex items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-xl shadow-2xl group">
            <span class="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
            <span class="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
            <span class="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
            <span class="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
            </span>
            <span class="relative text-xs text-white">Surprise Me</span>
          </a>
      )}
    </div>
    <input
      type={type}
      id={name}
      name={name}
      className="bg-gray-200 border border-white text-gray-600 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 outline-none block w-full p-3"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

export default FormField;