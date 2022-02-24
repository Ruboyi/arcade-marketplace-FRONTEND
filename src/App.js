import { Route, Routes } from "react-router";
import "./App.css";
import Header2 from "./components/Header2/Header2";
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
import NotFoundComponent from "./components/NotFound/NotFound";
import AdminUsersPage from "./pages/Admin/AdminUsersPage/AdminUsersPage";
import AdminProductsPage from "./pages/Admin/AdminProductsPage/AdminProductsPage";
import AdminReportsPage from "./pages/Admin/AdminReportsPage/AdminReportsPage";
import RecoveryPasswordPage from "./pages/RecoveryPassword/RecoryPasswordPage";

function App() {
  return (
    <div className="App">
      <Header2 />
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
        <Route path="/password/:code" element={<RecoveryPasswordPage />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="/update-product/:idProduct" element={<UpdateProduct />} />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/my-products/purchase-orders"
          element={<MyProductsPurchaseOrders />}
        />
        <Route path="/user/:nameUser/:idUser" element={<UserProfile />} />
        <Route path="*" element={<NotFoundComponent />} />

        {/* ROUTES ADMIN */}

        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/reports" element={<AdminReportsPage />} />
      </Routes>
      <TapBar />
    </div>
  );
}

export default App;
