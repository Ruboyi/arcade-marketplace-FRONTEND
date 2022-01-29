import { Route, Routes } from "react-router";
import "./App.css";
import Header from "./components/Header/Header";
import TapBar from "./components/Tapbar/TapBar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Products from "./pages/Products/Products";
import Register from "./pages/Register/Register";
import ProductPage from "./pages/ProductPage/ProductPage";
import UploadProduct from "./pages/UploadProducts/UploadProduct";
import Myproducts from "./pages/MyProducts/MyProducts";
import Profile from "./pages/Profile/Profile";
import MyFavorites from "./pages/MyFavorites/MyFavorites";
import Activation from "./pages/Activation/Activation";
import MyOrders from "./pages/MyOrders/MyOrders";
import MyReviews from "./pages/MyReviews/MyReviews";
import UpdateProduct from "./pages/UpdateProduct/UpdateProduct";
import Settings from "./pages/Settings/Settings";
import MyProductsPurchaseOrders from "./pages/MyProductPurchaseOrders/MyProductsPurchaseOrders";
import UserProfile from "./pages/UserProfile/UserProfile";
import Landing from "./pages/Landing/Landing";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload-product" element={<UploadProduct />} />
        <Route path="/products/:idProduct" element={<ProductPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/my-products" element={<Myproducts />} />
        <Route path="/my-favorites" element={<MyFavorites />} />
        <Route path="/activacion" element={<Activation />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="/update-product/:idProduct" element={<UpdateProduct />} />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/my-products/purchase-orders"
          element={<MyProductsPurchaseOrders />}
        />
        <Route path="/user/:nameUser/:idUser" element={<UserProfile />} />
      </Routes>
      <TapBar />
    </div>
  );
}

export default App;
