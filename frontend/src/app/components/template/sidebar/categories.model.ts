export interface Category{
    id: number
    name: string
    parentId: number | null
    path?: string
    children?: Category[]
}