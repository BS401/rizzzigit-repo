import type NewsComponent from "../../../components/main/home-panel/content/news-component.svelte";
import type { FileResource } from "../data/file";
import { NewsResource } from "../data/news";
import type { MainManager } from "../main";
import { BaseManager } from "./base";

export class NewsManager extends BaseManager<NewsResource, NewsManager> {
  public constructor (main: MainManager) {
    super(main, 'news')
  }

  public async list (offset?: number, length?: number) {
    const { main: { client: { api } } } = this

    return (await api.request(this.generateURL(['n'], { offset, length }), { method: 'GET' })).data.map((entry: any) => new NewsResource(this, entry._id, entry))
  }

  public async get (id: string) {
    const { main: { client: { options: { baseUrl }, api } } } = this
    const url = new URL(baseUrl)

    url.pathname = `/n/${id}`

    const data = await api.request(url, { method: 'GET' })
    return new NewsResource(this, data._id, data)
  }

  public async create (title: string, thumbnail: FileResource, contents: NewsComponent[]): Promise<NewsResource> {
    const { newsId } = await this.main.client.api.request(this.generateURL(['n']), {
      method: 'PUT',
      body: { title, thumbnail: thumbnail.id, contents }
    })

    return await this.get(newsId) as NewsResource
  }
}
