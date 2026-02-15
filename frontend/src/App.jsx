import AuthPage from "./pages/AuthPages/AuthPage";
import { Routes, Route } from "react-router";
import LibraryLanding from "./pages/landing/Landing";
import { ToastContainer } from "react-toastify";
import AddProduct from "./pages/admin/productManagement/AddProduct";
import ProductList from "./pages/admin/productManagement/ProductList";
import EditProduct from "./pages/admin/productManagement/UpdateProduct";
import Sales from "./pages/admin/sales/Sales";
import UsersList from "./pages/admin/usersManagement/usersList";
import Profile from "./pages/commun/Profile";
import AllProducts from "./pages/client/products/AllProducts";
import ClientCard from "./pages/client/card/ClientCard";
import ProductInfos from "./pages/client/products/ProductInfos";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BasketPage from "./pages/client/products/MyBasket";
import FavoritePage from "./pages/client/products/MyFavorites";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import UnauthorizedPage from "./pages/commun/Unauthorized";
import ResetPassword from "./pages/commun/ResetPassword";

export default function App() {
  return (
    <div>
      <Header />
      <ToastContainer />

      <Routes>
        {/* -------- PUBLIC ROUTES -------- */}
        <Route path="/" element={<LibraryLanding />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* -------- ADMIN & WORKER -------- */}
        <Route
          path="/add-product"
          element={
            <ProtectedRoutes allowedRoles={["admin", "worker"]}>
              <AddProduct />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/products-list"
          element={
            <ProtectedRoutes allowedRoles={["admin", "worker"]}>
              <ProductList />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/edit-product/:id"
          element={
            <ProtectedRoutes allowedRoles={["admin", "worker"]}>
              <EditProduct />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/sales"
          element={
            <ProtectedRoutes allowedRoles={["admin", "worker"]}>
              <Sales />
            </ProtectedRoutes>
          }
        />

        {/* -------- ADMIN ONLY -------- */}
        <Route
          path="/users"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <UsersList />
            </ProtectedRoutes>
          }
        />

        {/* -------- ALL AUTHENTICATED USERS -------- */}
        <Route
          path="/profile"
          element={
            <ProtectedRoutes allowedRoles={["admin", "worker", "client"]}>
              <Profile />
            </ProtectedRoutes>
          }
        />

        {/* -------- CLIENT ONLY -------- */}
        <Route path="/products/:category" element={<AllProducts />} />

        <Route path="/product_info/:product_id" element={<ProductInfos />} />

        <Route
          path="/client_card"
          element={
            <ProtectedRoutes allowedRoles={["client"]}>
              <ClientCard />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/my-basket"
          element={
            <ProtectedRoutes allowedRoles={["client"]}>
              <BasketPage />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/my-favorites"
          element={
            <ProtectedRoutes allowedRoles={["client"]}>
              <FavoritePage />
            </ProtectedRoutes>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}
