import { useEffect, useState } from "react";
import { CityDataModel } from "../models/CityDataModel.ts";
import Loader from "./Loader.tsx";

export default function ResultWindow(props: {cityFrom: CityDataModel, cityTo: CityDataModel}) {

    const {cityFrom, cityTo} = props;

    // Переводим градусы в радианы
    function degToRad(deg: string) {
        return parseInt(deg) * (Math.PI / 180);
    };
    const LatRadFrom: number = degToRad(cityFrom.geo_lat);
    const LonRadFrom: number = degToRad(cityFrom.geo_lon);
    const LatRadTo: number = degToRad(cityTo.geo_lat);
    const LonRadTo: number = degToRad(cityTo.geo_lon);

    const r: number = 6371 // Среднее значение радиуса земли

    // Результат вычисляем по формуле версинуса (https://dzen.ru/a/WyQuefRW4ACp2JIN)
    const result: number = 2 * r * Math.asin(Math.sqrt(Math.pow(Math.sin((LatRadTo - LatRadFrom) / 2), 2) + Math.cos(LatRadFrom) * Math.cos(LatRadTo) * Math.pow(Math.sin((LonRadTo - LonRadFrom) / 2), 2)));
    // Погрешность при таком методе расчёта как заверяют не должна превышать 0,5%

    // Приводим полученное значение в нормальный вид
    let validateResult: string = new Intl.NumberFormat("ru-RU", {
        maximumFractionDigits: 2,
        style: "unit",
        unit: "kilometer",
    }).format(result).replace('.', ','); 
    
    // Таймаут эмуляции загрузки, а то работает мгновенно, как-то не интересно
    const [isLoading, setIsLoaning] = useState<boolean>(true);
    useEffect(() => {
        setIsLoaning(true);
        setTimeout(() => {
            setIsLoaning(false);
        }, 3 * 1000);
    }, [cityFrom, cityTo]);

    return(
        <div className="">
            {(isLoading) ? <Loader /> : <span className="text-4xl font-bold">{validateResult}</span>}
        </div>
    )
}