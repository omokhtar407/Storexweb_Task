interface Movie {
  category_id: number,
  description: string,
  id: number,
  image: string,
  name: string,
  created_at: string,
  updated_at: string,
}

interface Category {
  id: number,
  name: string,
  created_at: string,
  updated_at: string,
}

export { Movie , Category};
