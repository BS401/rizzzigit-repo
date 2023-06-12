import type { BaseResource } from "../data/base";
import type { MainManager } from "../main";

export abstract class BaseManager<R extends BaseResource<R, M>, M extends BaseManager<R, M>> {
  public constructor (main: MainManager, name: string) {
    this.#main = main
    this.#name = name
  }

  #main: MainManager
  #name: string

  public get main (): MainManager { return this.#main }
  public get name (): string { return this.#name }
}
