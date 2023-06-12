import type { NewsManager } from "../manager/news";
import { BaseResource } from "./base";

export class NewsResource extends BaseResource<NewsResource, NewsManager> {
  public constructor (manager: NewsManager, id: string, data: Record<string, unknown>) {
    super(manager, id, data)

    this.#data = data
  }

  #data: Record<string, unknown>

  public get newsContent (): NewsContent[] {
    return this.#data.contents as NewsContent[]
  }
}

export enum NewsContentType {
  Image, Text, Link
}

export type NewsContent = (
  {
    contentType: NewsContentType.Image
    url: string
  } | {
    contentType: NewsContentType.Text
    content: string
  } | {
    contentType: NewsContentType.Link
    name: string
    link: string
  }
)
