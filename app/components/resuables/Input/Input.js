export const Input = ({ Labelvalue, Number, width, value, onChange, Password }) => {
    const handleChange = (event) => {
      onChange(event.target.value);
    };
  
    return (
      <div className="relative">
        <input
          type={`${Number ? 'number' : Password ? 'password' : 'text'}`}
          id="floating_outlined"
          className={`'block px-2.5 pb-2.5 pt-4 text-sm bg-transparent  border-gray-300 appearance-none text-white dark:focus:border-neutral-300 focus:outline-none focus:ring-0 focus:border-slate-800 peer border-b w-full py-2 transition duration-1000 ${width ? 'w-full' : ''}`}
          placeholder=" "
          required
          value={value}
          onChange={handleChange}
        />
        <label
          htmlFor="floating_outlined"
          className="absolute text-sm text-white font-semibold dark:text-white duration-500 transform -translate-y-4 scale-75 top-2 origin-[0]  px-0 peer-focus:px-2  peer-focus:dark peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ml-2 -z-10"
        >
          {Labelvalue}
        </label>
      </div>
    );
  };