import {useEffect, useState} from "react";

export const FormItemsView = ({handler}) =>{
    const [formItemsState, setFormItemsState] = useState({
        product:'',
        price:'',
        quantity:'',
    })
    const {product, price, quantity} = formItemsState

    useEffect(() => {
        // console.log('el precio cambio')
    }, [price]);


    useEffect(() => {
        //    console.log('el precio formItemsState')
    }, [formItemsState]);

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
        // setItems([...items, {
        //     id:counter,
        //     product: product.trim(), // con el trim elimnamos espacios de string
        //     price: +price.trim(),// + lo convierte en entero
        //     quantity: parseInt(quantity.trim(),10)}]);// lo convierte en entero

        handler(formItemsState);
        setFormItemsState({
            product:'',
            price:'',
            quantity:'',
        })
       // setCounter(counter + 1)
    }


    return(
        <>
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
        </>
    )
}