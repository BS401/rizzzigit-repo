import type { Client } from "./client";

export class API {
  public constructor (client: Client) {
    this.#client = client
  }

  #client: Client

  public async request(url: URL, options: {
    body?: string | FileList[0]
    method: 'POST' | 'PUT' | 'DELETE' | 'GET',
    query?: Record<string, unknown>
  }) {
    const { body, method } = options
    const response = await fetch(url, { body, method })

    return await response.json()
  }
}
