import { Selector } from "./selector"
import { TraitConstructor, DefaultTrait } from "./trait"

export type ScopeOptions = {
  selector: Selector | string,
  traitConstructor?: TraitConstructor,
  eventListeners?: EventListenerSet,
  childScopes?: ScopeOptions[]
} | Scope

export type EventListenerSet = {
  [key: string]: EventListener
}

export class Scope {
  static wrap(definition: ScopeOptions): Scope {
    if (definition instanceof Scope) {
      return definition
    } else {
      return new Scope(definition)
    }
  }

  selector: Selector
  traitConstructor: TraitConstructor
  eventListeners: EventListenerSet
  childScopes: Scope[]

  constructor({selector, traitConstructor, eventListeners, childScopes}: ScopeOptions) {
    this.selector = Selector.get(selector)
    this.traitConstructor = traitConstructor || <TraitConstructor> <Function> DefaultTrait
    this.eventListeners = eventListeners || {}
    this.childScopes = (<Scope[]> (childScopes || [])).map(Scope.wrap)
  }
}
