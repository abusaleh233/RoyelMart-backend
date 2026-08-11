export interface IAdminDashboard {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

export interface IUpdateUserRole {
  role: "USER" | "ADMIN";
}

export interface IUpdateOrderStatus {
  status:
    | "PENDING"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED";
}