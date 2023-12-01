import {getInvoices} from "./services/getInvoices.js";
import {InvoiceView} from "./components/InvoiceView.jsx";
import {ClienteView} from "./components/ClienteView.jsx";
import {CompanyView} from "./components/CompanyView.jsx";
import {ListItemsView} from "./components/ListItemsView.jsx";
import {TotalView} from "./components/TotalView.jsx";
import {useState} from "react";

export const InvoiceApp = () => {


   // const invoice = getInvoices()
    const {total, id,
        name,
        client,
        company,
        items:itemsInitial} = getInvoices()

    const [formItemsState, setFormItemsState] = useState({
        product:'',
        price:'',
        quantity:'',
    })
const {product, price, quantity} = formItemsState



    const [items, setItems] = useState(itemsInitial)
    const [counter, setCounter] = useState(4)

    const onInputChange = ({target : {name, value}}) => {
        setFormItemsState({
            ...formItemsState,
            [name]: value
        })
    }



    const onInvoiceItemsSubmit = (event) => {
        event.preventDefault();

        if(product.trim().length<=1) return // para ver que el caracter sea mayor a 1 letras
        if(price.trim().length<=1) return;
        if(isNaN(price.trim())) {// PARA verificar que es un numero
            alert("Error al ingresar el precio ")
            return
        }

        if(quantity.trim().length<1) return;
        if(isNaN(quantity.trim())) {// PARA verificar que es un numero
            alert("Error al ingresar la cantidad ")
            return
        }
        setItems([...items, {
            id:counter,
            product: product.trim(), // con el trim elimnamos espacios de string
            price: +price.trim(),// + lo convierte en entero
            quantity: parseInt(quantity.trim(),10)}]);// lo convierte en entero
        setFormItemsState({
            product:'',
            price:'',
            quantity:'',
        })
        setCounter(counter + 1)
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
                   <ListItemsView title="Lista de productos" items={items}></ListItemsView>
                    <TotalView total={total}></TotalView>
                   <form className="w-50" onSubmit={event => onInvoiceItemsSubmit(event)}>
                       <input
                           type='text'
                           name='product'
                           placeholder='Producto'
                           value={product}
                           className='form-control m-3'
                           onChange={onInputChange}
                       />
                       <input
                           type='text'
                           name='price'
                           value={price}
                           placeholder='Precio'
                           className='form-control m-3'
                           onChange={onInputChange}
                       />
                       <input
                           type='text'
                           name='quantity'
                           value={quantity}
                           placeholder='Cantidad'
                           className='form-control m-3'
                           onChange={onInputChange}
                       />
                       <button
                           type="submit"
                           className="btn btn-primary m-3"
                       >Nuevo item</button>
                   </form>
               </div>

               </div>

        </>

    )
}