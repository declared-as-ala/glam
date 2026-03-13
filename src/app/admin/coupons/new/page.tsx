import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { CouponForm } from "@/components/admin/coupon-form";

export default function AdminNewCouponPage() {
  return (
    <div>
      <AdminPageHeader title="Nouveau coupon" />
      <CouponForm />
    </div>
  );
}
