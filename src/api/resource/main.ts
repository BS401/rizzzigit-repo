import type { Client } from "../core/client";
import { NewsManager } from "./manager/news";

export class MainManager {
  public constructor (client: Client) {
    this.#client = client
    this.#news = new NewsManager(this)
  }

  #client: Client
  #news: NewsManager

  public get client (): Client { return this.#client }
  public get news (): NewsManager { return this.#news }
}
