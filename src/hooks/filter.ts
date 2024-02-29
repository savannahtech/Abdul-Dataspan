import {useState, useEffect} from "react"

export default function useFilter(data:any[]){
    const [responseData, setData] = useState<any[]>([])
    useEffect(() =>{
        setData(data)
    },[data])

    function handleFilterData(data: any[], searchText:any[]){
        const fiilteredData = searchText.length > 0 ? 
        data.filter(item => searchText.includes(item["polygCount"]) || searchText.includes(item["className"])) : data;
        setData(fiilteredData)
    }
    return {handleFilterData, responseData}
}

export function areAllNone(array: string[]) {
    return array.every(item => item === "none");
  }