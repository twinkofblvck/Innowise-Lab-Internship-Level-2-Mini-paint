export interface IImage
{
  name: string;
  url: string;
  author: string;
}

export interface IListImage extends IImage
{
  id: string;
}