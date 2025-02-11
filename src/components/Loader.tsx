import { useEffect, useState } from "react"

export default function Loader() {

    const tempalateArray: string[] = ["remove", "remove", "remove", "remove", "close"];
    let [loader, setLoader] = useState<string[]>([]);

    useEffect(() => {
        setTimeout(() => {
            if (loader.length < 5) {
                loader.push(tempalateArray[loader.length]);
                setLoader([...loader]);
            } else {
                setLoader(["remove"]);
            }
        }, 0.2 * 1000);
    }, [loader]);


    return(
        <div className="w-30">        
            {loader.map((ietm: string, i: number) => (
                <span key={i} className="material-symbols-outlined text-xl font-bold">
                    {ietm}
                </span>
            ))}
        </div>

    )
}
