import type { BaseManager } from "../manager/base";

export abstract class BaseResource<R extends BaseResource<R, M>, M extends BaseManager<R, M>> {
  public constructor (manager: M, id: string, data: Record<string, unknown>) {
    this.#manager = manager
    this.#id = id
    this.#data = data
  }

  #manager: M
  #id: string
  #data: Record<string, unknown>

  public get manager (): M { return this.#manager }
  public get id (): string { return this.#id }
}
