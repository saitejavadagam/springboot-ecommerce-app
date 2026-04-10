import { memo, useMemo } from 'react';
import CartItem from '../components/CartItem';
import { useCartStore } from '../store/useCartStore';



const Cart = () => {

  const cartItems = useCartStore(state => state.cart?.items || []);
  const addItem = useCartStore(state => state.addItem);
  const removeItem = useCartStore(state => state.removeItem);

  const { totalItems, subtotal } = useMemo(() => {
    const totals = cartItems.reduce(
      (acc, item) => {
        const quantity = item.quantity || 1;
        const price = item.price || 0;

        acc.totalItems += quantity;
        acc.subtotal += quantity * price;

        return acc;
      },
      { totalItems: 0, subtotal: 0 }
    )

    return totals;
  }
    , [cartItems]);

  if (!cartItems.length) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-md shadow-sm">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          <p>Your cart is empty.</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-md shadow-sm">

        <h1 className="text-2xl font-semibold mb-6">
          Shopping Cart ({totalItems})
        </h1>

        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              addItem={addItem}
              removeItem={removeItem}
            />
          ))}
        </div>

        <div className="mt-8 py-3 rounded-lg border-2 border-yellow-500 flex px-25 justify-between items-center bg-yellow-50">
          <span className="text-lg font-medium">Total Cart Price :</span>
          <span className="text-xl font-semibold">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className='p-6 mt-3 flex items-center justify-center'>
          <button className='bg-yellow-400 px-20 py-3 rounded-4xl hover:bg-yellow-500 transition ease-in-out duration-200'>Proceed to Buy</button>
        </div>

      </div>
    </div>
  );
};

export default memo(Cart);