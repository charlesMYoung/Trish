export type Article = {
  id: string
  title: string
  description: string
  is_release: boolean
  content: string
  release_date: Date
  created_at: Date
  modified_at: Date
  category_id: string
}

export enum MenuType {
  CATEGORY = 'category',
}
