export type Promotion = {
  id: string;
  title: string;
  description: string;
  price: number;
  img_url: string;
  link_url: string;
  created_at: string;
  updated_at: string;
  category: {
    id: string;
    name: string;
    tag: string;
  };
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