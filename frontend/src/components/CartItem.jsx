import React from 'react'

const CartItem = ({ item, addItem, removeItem }) => {


    return (
        <div
            className='flex gap-6 border-b py-5'
        >
            <div className="w-32 h-32 shrink-0">
                <img src={item.image} alt={item.title} className='w-full h-full object-contain' />
            </div>

            <div className="flex-1">
                <h2 className='text-lg font-medium'>{item.title}</h2>
            </div>

            <p className="mt-2 text-xl font-semibold flex items-start">
                <span className="text-sm mr-1 mt-1">₹</span>
                {item.price}
            </p>

            <div className='flex items-center gap-3 border-yellow-300 border-2 rounded-full w-fit px-3 py-1 max-h-12'>
                <button
                    className='text-lg font-bold px-3 py-1 hover:bg-yellow-200 rounded-full'
                    onClick={() => removeItem(item.productId)}
                >
                    -
                </button>

                <span className='min-w-7.5 font-bold text-center'>
                    {item.quantity}
                </span>

                <button
                    className='text-lg font-bold px-3 py-1 hover:bg-yellow-200 rounded-full'
                    onClick={() => addItem(item.productId)}
                >
                    +
                </button>
            </div>

            <p className="mt-2 font-medium">
                Subtotal: ₹ {(item.price * (item.quantity || 1)).toLocaleString("en-IN")}
            </p>

        </div>
    )
}

export default CartItem