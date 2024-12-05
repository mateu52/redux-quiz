import { useEffect } from "react"
import { fetchCountries } from "./features/CountriesSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "./app/store"
import { Game } from "./pages/Game";


function App() {
  const countries = useSelector((state: RootState) => state.countries);
  //const counter = useSelector((state: RootState) => state.countries.counter);
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCountries())
  },[dispatch]);
  console.log(countries)


  return (
    <>
     <p className="text-3xl font-bold underline">hello</p>
     <h1>Countries List</h1>
            {/* <ul>
                {countries.countries.map((country, index) => (
                    <li key={index}>
                        <strong>{country.country}</strong> - {country.capital}
                    </li>
                ))}
            </ul> */}
            <Game />
    </>
  )
}

export default App
