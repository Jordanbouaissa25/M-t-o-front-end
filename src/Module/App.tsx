import React, { useState, ChangeEvent } from 'react';

export const App = (): JSX.Element => {
  const [term, setTerm] = useState<string>('');

  const getSearchOptions = (value: string) => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim}&limit=5&appid=${process.env.REACT_VITE_APP_ID}`).then(res => res.json ())
    .then((data) => console.log({ data}))
  }

  // Gestionnaire pour le changement de texte dans l'input
  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.trim()
    setTerm(value);

    if (value == '') return 
    getSearchOptions(value)
  };

  // const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   console.log(e.target.value); // Affiche la valeur de l'input dans la console
  // };

  return (
    <main className="flex justify-center items-center bg-gradient-to-br bg-[#2d3658] h-[100vh] w-full">
      <section className="w-full md:max-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] backdrop-blur-lg rounded drop-shadow-lg text-white">
        <h1 className="text-4xl font-thin">Weather <span className="font-black">Forecast</span></h1>
        <p className="text-sm mt-2">Enter below a place you want to know the weather of and select an option from the dropdown</p>

        <div className="flex mt-10 md:mt-4">
          {/* L'input utilise le handleSearch pour changer la valeur de 'term' */}
          <input
            type="text"
            value={term}
            onChange={handleSearch}
            className="px-2 py-1 rounded-l-md border-2 border-white text-black"
            placeholder="Enter a city"
          />

          <button className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer">
            Search
          </button>
        </div>
      </section>
    </main>
  );
};

export default App