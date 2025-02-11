import { useState } from "react";
import { CityDataModel } from "../models/CityDataModel.ts";
import Input from "./Input.tsx";
import ResultWindow from "./ResultWindow.tsx";
import Loader from "./Loader.tsx";

export default function DistanceCitiesWidget() {

    const [cityFrom, setCityFrom] = useState<CityDataModel | null>(null);
    function handlerSetCityFrom(data: CityDataModel) {
        setCityFrom(data);
    }
    const [cityTo, setCityTo] = useState<CityDataModel | null>(null);
    function handlerSetCityTo(data: CityDataModel) {
        setCityTo(data);
    }

    return (
        <div className="w-240 h-100 mx-auto p-5 bg-gray-100 rounded-xl flex flex-col gap-10">
            <div className="text-2xl font-medium">
                Расчёт расстояния между городами мира
            </div>
            <div className="flex justify-between items-center">
                <Input setCity={handlerSetCityFrom} />
                <Input setCity={handlerSetCityTo} />
            </div>
            <div className="mx-auto mt-20">
                {(cityFrom && cityTo) && <ResultWindow cityFrom={cityFrom} cityTo={cityTo} />}
            </div>
        </div>
    )
}