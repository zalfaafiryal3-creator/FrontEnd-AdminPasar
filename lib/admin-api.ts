import { apiRequest } from "./api";
import type { StoreCategory } from "./store-api";

export type ApiAdminUser = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "seller";
  phone: string;
  status: string;
  createdAt: string;
};

export type UserCreateInput = {
  name: string;
  email: string;
  phone: string;
  role?: "admin" | "seller";
  status?: string;
  password?: string;
};

export type UserUpdateInput = Partial<UserCreateInput>;

export type ApiSeller = {
  id: number;
  name: string;
  shop: string;
  block: string;
  status: string;
  phone: string;
  email: string;
  type: string;
  photoUrl: string | null;
};

export type SellerInput = Omit<ApiSeller, "id">;

export function createCategory(name: string): Promise<StoreCategory> {
  return apiRequest<StoreCategory>("/api/categories", {
    method: "POST",
    body: { name },
  });
}

export function deleteCategory(id: number): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/api/categories/${id}`, {
    method: "DELETE",
  });
}

export function getUsers(): Promise<ApiAdminUser[]> {
  return apiRequest<ApiAdminUser[]>("/api/users");
}

export function createUser(input: UserCreateInput): Promise<ApiAdminUser> {
  return apiRequest<ApiAdminUser>("/api/users", {
    method: "POST",
    body: input,
  });
}

export function updateUser(id: number, input: UserUpdateInput): Promise<ApiAdminUser> {
  return apiRequest<ApiAdminUser>(`/api/users/${id}`, {
    method: "PUT",
    body: input,
  });
}

export function deleteUser(id: number): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/api/users/${id}`, {
    method: "DELETE",
  });
}

export function getSellers(): Promise<ApiSeller[]> {
  return apiRequest<ApiSeller[]>("/api/sellers");
}

export function createSeller(input: SellerInput): Promise<ApiSeller> {
  return apiRequest<ApiSeller>("/api/sellers", {
    method: "POST",
    body: input,
  });
}

export function updateSeller(id: number, input: Partial<SellerInput>): Promise<ApiSeller> {
  return apiRequest<ApiSeller>(`/api/sellers/${id}`, {
    method: "PUT",
    body: input,
  });
}

export function deleteSeller(id: number): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/api/sellers/${id}`, {
    method: "DELETE",
  });
}
