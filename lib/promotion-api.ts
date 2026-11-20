import { apiRequest } from "./api";

export type PromotionStatus =
  | "Sedang Berlangsung"
  | "Akan Datang"
  | "Setiap Akhir Pekan"
  | "Hari Pasaran Khusus"
  | "Hampir Habis"
  | "Ditangguhkan";

export type Promotion = {
  id: number;
  title: string;
  store: string;
  owner: string;
  category: string;
  description: string;
  bannerImage: string | null;
  status: PromotionStatus;
  periodType: "range" | "days" | "specific";
  periodDisplay: string;
  operatingHours: string;
  terms: string;
  code: string;
  quota: string;
  discountType: string;
  createdAt: string;
  canManage?: boolean;
};

export type PromotionInput = Omit<Promotion, "id" | "createdAt">;
export type PromotionUpdateInput = Partial<Omit<PromotionInput, "status">> & {
  status?: PromotionStatus | "Aktif";
};

export function getManagedPromotions(): Promise<Promotion[]> {
  return apiRequest<Promotion[]>("/api/promotions/manage");
}

export function createPromotion(input: PromotionInput): Promise<Promotion> {
  return apiRequest<Promotion>("/api/promotions", { method: "POST", body: input });
}

export function updatePromotion(
  id: number,
  input: PromotionUpdateInput,
): Promise<Promotion> {
  return apiRequest<Promotion>(`/api/promotions/${id}`, {
    method: "PUT",
    body: input,
  });
}

export function deletePromotion(id: number): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/api/promotions/${id}`, {
    method: "DELETE",
  });
}
