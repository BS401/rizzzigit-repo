import type { Client } from "../core/client";
import { FileManager } from "./manager/file";
import { NewsManager } from "./manager/news";

export class MainManager {
  public constructor (client: Client) {
    this.#client = client
    this.#news = new NewsManager(this)
    this.#files = new FileManager(this)
  }

  #client: Client
  #news: NewsManager
  #files: FileManager

  public get client (): Client { return this.#client }
  public get news (): NewsManager { return this.#news }
  public get files (): FileManager { return this.#files }
}
