import React from "react";
import * as XLSX from "xlsx";
import axios from "axios";


export const ParseExcel = () =>{
    const handleFile = async (e)=> {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data) ;

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        console.log(jsonData);

        jsonData.map( async item =>{
           // console.log(item)
            try{
    
               await  axios.post("http://localhost:8800/items", item)
                
             }catch(err){
                 console.log(err)
             }
        })
    }

    return (
        <div>
            <h1>Import Excel</h1>

            <input type="file" onChange={(e) => handleFile(e)}/>
        </div>
    )
}