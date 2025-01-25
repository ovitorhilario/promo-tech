export type Coupon = {
  id: string;
  title: string;
  description: string;
  code: string;
  link_url: string;
  is_expired: boolean;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    username: string;
  }
  store: {
    id: string;
    name: string;
    img_url: string;
    tag: string;
  }
}