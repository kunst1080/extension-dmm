import { Book } from "./Book";
import { Pager } from "./Pager";

export type SeriesJson = {
  pager: Pager;
  volume_books: Array<Book>;
};
