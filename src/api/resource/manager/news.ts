import { NewsResource } from "../data/news";
import type { MainManager } from "../main";
import { BaseManager } from "./base";

export class NewsManager extends BaseManager<NewsResource, NewsManager> {
  public constructor (main: MainManager) {
    super(main, 'news')
  }

  public async list (offset?: number, length?: number) {
    const { main: { client: { options: { baseUrl }, api } } } = this
    const url = new URL(baseUrl)

    url.pathname = '/n'
    Object.assign(url.searchParams, { offset, length })

    return (await api.request(url, { method: 'GET' })).data.map((entry: any) => new NewsResource(this, entry._id, entry))
  }

  public async get (id: string) {
    const { main: { client: { options: { baseUrl }, api } } } = this
    const url = new URL(baseUrl)

    url.pathname = `/n/${id}`

    const data = await api.request(url, { method: 'GET' })
    return new NewsResource(this, data._id, data)
  }
}