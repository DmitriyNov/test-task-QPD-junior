import { MouseEvent } from "react";
import { CityDataModel } from "../models/CityDataModel.ts";

export default function Dropdown(props: {citiesList: CityDataModel[], selectCity: Function}) {

    const {citiesList, selectCity} = props;

    function handlerSelectCity(event: MouseEvent<HTMLDivElement>) {
        selectCity(event.currentTarget.id);
    }

    return (
        <div className="absolute top-15 w-full p-2 bg-white rounded overflow-hidden">
            {citiesList.map((item: CityDataModel, i: number) => (
                <div key={i} className="p-2 hover:bg-gray-100 rounded cursor-pointer" id={item.name} onClick={handlerSelectCity}>
                    <span>{item.full_name}</span>
                </div>
            ))}
        </div>
    )
}