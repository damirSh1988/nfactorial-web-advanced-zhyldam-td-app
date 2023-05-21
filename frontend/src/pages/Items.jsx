import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from '@material-table/core';
import './Items.css';
import { Link } from "react-router-dom";

const columns = [
    {title: 'Наименование', field: 'description'},
    {title: 'ТНВЭД', field: 'code'},
    {title: 'Количество мест', field:'count'},
    {title: 'Вес брутто', field: 'brutto'},
    {title: 'Стоимость', field: 'summa'},
    {title: 'Валюта', field: 'usd'},
    {title: 'Упаковка', field: 'pk'},
    {title: 'Контейнер', field: 'container'}


]

const Items = () => {
    const [items, setItems] = useState([])
    const [item, setItem] = useState({
        description:"",
        code: null,
        count: null,
        brutto: null, 
        summa: null,
        usd:"",
        pk: "",
        container:""
    })

const handleChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value}));
} 



const handleClick = async e =>{
    
    e.preventDefault()
    try{
    
       await  axios.post("http://localhost:8800/items", item)
       
    }catch(err){
        console.log(err)
    }
    window.location.reload()
}


    useEffect(()=>{
        const fetchAllItems = async ()=> {
            try{
                const res = await axios.get("http://localhost:8800/items")
                setItems(res.data);
            }catch(err){
                console.log(err)
            }
        }
        fetchAllItems();
    }, [])

    


    return (
      <>
      <div className='d-flex justify-content-center'>
            <div className="Header">
                <h1 className='mx-5'>zhyldam-td</h1>
                <div className='Header-Buttons mx-3'>
                    <button > <Link to={"/parse-excel"} style={{color: 'white'}}>Import Excel</Link> </button>
                    <button>Export XML</button>
                </div>
            </div>
        </div>
        <div className="Form-1">
            <div className='Form-2' style={{ width: '90%', height: '680px', backgroundColor:'#3e63e7', borderRadius:'25px'}}>
           
                <div className='Editor'>
                    <input type="text" name="description" onChange = {handleChange} className='Input' placeholder='Наименование товара'/>
                    <input type="number" name="code" onChange = {handleChange} className='Input' placeholder='Код ТНВЭД товара'/>
                    <input type="number"  name="count" onChange = {handleChange} className='Input' placeholder='Количество мест'/>
                    <input type="number"  name="brutto" onChange = {handleChange} className='Input' placeholder='Вес брутто'/>
                    <input type="number"  name="summa" onChange = {handleChange} className='Input' placeholder='Стоимость'/>
                    <input type="text"  name="usd" onChange = {handleChange} className='Input' placeholder='Валюта'/>
                    <input type="text"  name="pk" onChange = {handleChange} className='Input' placeholder='Тип упаковки'/>
                    <input type="text"  name="container" onChange = {handleChange} className='Input' placeholder='Контейнер'/>
                    <button onClick={handleClick} className='Editor-Button'>Добавить</button>
                    <button className='Editor-Button'>Очистить</button>
                    <button className='Editor-Button'>Сортировать</button>
                </div>
                <div className='Grid'>
                    
                    <MaterialTable columns = {columns} data = {items}  title={""} style={{  }} 
                    options={{search:false, headerStyle: {
                                            backgroundColor: '#FFF',
                                            color: '#01579b',
                                            position: 'sticky',
                                            borderColor: '#01579b',
                                         
                                            
                    }, paging: false, maxBodyHeight: 535, toolbar:false, }}
                    editable={{onRowAdd: newData =>
                          new Promise((resolve, reject) => {
                          setTimeout(() => {
                          setItems([...items, newData]);  
                          resolve();
                          }, 1000)
                        })}}
                    />
                </div>
                
            </div>
        </div>

        </>

         
    )
}

export default Items;