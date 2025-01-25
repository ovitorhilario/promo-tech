import { Routes, Route } from "react-router";
import Promotions from "./routes/promocoes/main/page";
import SignIn from "./routes/auth/sign-in/page";
import SignUp from "./routes/auth/sign-up/page";
import { PrivateRoutes } from "./routes/private-routes";
import { MainDashboard } from "./components/main-dashboard";
import CreatePromotion from "./routes/promocoes/create/page";
import CreateCoupon from "./routes/cupons/create/page";
import CreateStore from "./routes/lojas/create/page";
import Coupons from "./routes/cupons/main/page";
import Stores from "./routes/lojas/main/page";
import EditStore from "./routes/lojas/edit/page";
import EditPromotion from "./routes/promocoes/edit/page";
import EditCoupon from "./routes/cupons/edit/page";

export function Router() {
  return (
    <Routes>
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      
      <Route element={<MainDashboard />}>
        {/* Public Routes */}
        <Route path="/" element={<Promotions />} />
        <Route path="/cupons" element={<Coupons />} />
        <Route path="/lojas" element={<Stores />} />

        {/* Private routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="criar/promocao" element={<CreatePromotion />} />
          <Route path="criar/cupom" element={<CreateCoupon />} />
          <Route path="criar/loja" element={<CreateStore />} />

          <Route path="editar/loja/:slug" element={<EditStore />} />
          <Route path="editar/promocao/:slug" element={<EditPromotion />} />
          <Route path="editar/cupom/:slug" element={<EditCoupon />} />
        </Route>
      </Route>
    </Routes>
  );
}