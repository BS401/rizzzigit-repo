import { MainManager } from "../resource/main"
import { API } from "./api"

export interface ClientOptions {
  baseUrl: string
}

export class Client {
  static #instance?: Client
  public static getInstance (): Client {
    return this.#instance ?? (this.#instance = new this())
  }

  public constructor (options?: Partial<ClientOptions>) {
    this.#api = new API(this)
    this.#options = {
      baseUrl: 'http://localhost:8081',

      ...options
    }

    this.#resources = new MainManager(this)
  }

  #options: ClientOptions
  #api: API
  #resources: MainManager

  public get options (): ClientOptions { return this.#options }
  public get api (): API { return this.#api }
  public get resources (): MainManager { return this.#resources }
}
