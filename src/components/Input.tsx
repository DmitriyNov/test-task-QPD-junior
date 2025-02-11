import { useState, ChangeEvent, useEffect } from "react";
import { getCities } from "../api/api.ts";
import { CityDataModel } from "../models/CityDataModel.ts";
import Dropdown from "./Dropdown.tsx";

export default function Input(props: {setCity: Function}) {

    const {setCity} = props;

    const [inputValue, setInputValue] = useState<string>("");
    function tapCityName(event: ChangeEvent<HTMLInputElement>) {
        setIsSelected(false);
        const currentValue: string = event.currentTarget.value;
        const lastSymbol: string = currentValue.toString().slice(-1);
        const filter: RegExp = /^[a-я]/i;
        if (!filter.test(lastSymbol) && lastSymbol !== "") {
            return;
        }
        setInputValue(currentValue);
    }

    const [citiesList, setCitiesList] = useState<CityDataModel[] | []>([]);
    useEffect(() => {
        if (inputValue.length > 2 && !isSelected) {
            getCities(inputValue, (result: {suggestions: any}) => {
                const currentcitiesList: CityDataModel[] = [];
                result.suggestions.forEach((item: any) => {
                    const currentCity: CityDataModel = {
                        full_name: item.value,
                        name: item.data.city,
                        geo_lat: item.data.geo_lat,
                        geo_lon: item.data.geo_lon,                       
                    }
                    currentcitiesList.push(currentCity);
                });
                setCitiesList(currentcitiesList);
            });
        } else {
            setCitiesList([]);
        }
    }, [inputValue]);

    const [isSelected, setIsSelected] = useState<boolean>(false);
    function selectCity(cityName: string) {
        setIsSelected(true);
        setInputValue(cityName);
        setCitiesList([]);
        const currentCity: CityDataModel | undefined = citiesList.find((item: CityDataModel) => item.name === cityName);
        setCity(currentCity);
    }

    return (
        <div className="w-90 relative">
            <input className="w-full p-3 text-lg bg-white rounded outline-none" type="text" value={inputValue} onChange={tapCityName} />
            {(citiesList.length !== 0) && <Dropdown citiesList={citiesList} selectCity={selectCity} />}
        </div>
        
    )
}