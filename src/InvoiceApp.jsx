import {calculateTotal, getInvoices} from "./services/getInvoices.js";
import {InvoiceView} from "./components/InvoiceView.jsx";
import {ClienteView} from "./components/ClienteView.jsx";
import {CompanyView} from "./components/CompanyView.jsx";
import {ListItemsView} from "./components/ListItemsView.jsx";
import {TotalView} from "./components/TotalView.jsx";
import {useEffect, useState} from "react";
import {FormItemsView} from "./components/FormItemsView.jsx";

const invoiceInitial = {
    id: 0,
    name: '',
    client: {
        name: '',
        lastName: '',
        address: {
            country: '',
            city: '',
            street: '',
            number: 0
        }
    },
    company: {
        name: '',
        fiscalNumber: 0,
    },
    items: [

    ]

}

export const InvoiceApp = () => {
    const [total, setTotal] = useState(0)
    const [counter, setCounter] = useState(4)
    const [invoice, setInvoice] = useState(invoiceInitial)
    const [items, setItems] = useState([])
    const [activeForm, setActiveForm] = useState(false)

    // const invoice = getInvoices()
    const {id,
        name,
        client,
        company,
    } = invoice


    useEffect(() => {
        const data = getInvoices();
        setInvoice(data)
        setItems(data.items);
    }, []);



    useEffect(() => {
    }, [counter]);


    useEffect(() => {
        setTotal(calculateTotal(items))
    }, [items]);


    const handlerAddItems = ({product, price, quantity}) => {

        setItems([...items, {
          id:counter,
            product: product.trim(), // con el trim elimnamos espacios de string
            price: +price.trim(),// + lo convierte en entero
            quantity: parseInt(quantity.trim(),10)}]);// lo convierte en entero



        setCounter(counter + 1)
    }

    const handlerDeleteItem = (id ) => {
        setItems(items.filter(item=> item.id !== id))
    }

    const onActiveForm= () => {
        setActiveForm(!activeForm)
    }






    return(
        <>
           <div className='container'>
               <div className='card my-3'>

                   <div className='card-header'>
                       Ejemplo de factura
                   </div>
                   <div className='card-body'>
                        <InvoiceView id={id} name ={name}></InvoiceView>

                       <div className='row my-3'>
                           <div className='col'>
                                <ClienteView title="Los datos del cliente" client={client}></ClienteView>
                           </div>

                           <div className='col'>
                                 <CompanyView title="Datos de la Empresa" company={company}></CompanyView>
                           </div>

                       </div>
                   </div>
                   <ListItemsView title="Lista de productos" items={items} handlerDeleteItem={id =>handlerDeleteItem(id)}></ListItemsView>
                    <TotalView total={total}></TotalView>
                   <button className='btn btn-secondary'
                        onClick= {onActiveForm}
                   >{!activeForm ? 'Agregar Item': 'Cerrar Form'}</button>
                   {!activeForm || <FormItemsView handler={handlerAddItems}></FormItemsView> }

               </div>

               </div>

        </>

    )
}