import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

const OrdersPage = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await apiFetch("/orders");
        setOrders(data);
      }
      catch (err) {
        setError(err.message);
      }
      finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg">
        Loading...
      </div>
    );
  }


  if (orders.length === 0) return (
    <div className="min-h-screen font-medium text-slate-500 text-lg flex justify-center items-center">
      No orders Yet!
    </div>
  )

  return (
    <div>OrdersPage</div>
  )
}

export default OrdersPage