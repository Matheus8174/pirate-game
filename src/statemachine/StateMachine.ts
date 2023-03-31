/* eslint-disable no-console */
export interface IStateBase {
  onEnter?: () => void
  // eslint-disable-next-line no-unused-vars
  onUpdate?: (dt: number) => void
  onExit?: () => void
}

interface IState extends IStateBase {
  name: string
}

let idCount = 0;

export default class StateMachine {
  // eslint-disable-next-line no-plusplus
  private id = (++idCount).toString();

  private context?: object;

  private states = new Map<string, IState>();

  private previousState?: IState;

  private currentState?: IState;

  private isChangingState = false;

  private changeStateQueue: string[] = [];

  get previousStateName() {
    if (!this.previousState) return '';

    return this.previousState.name;
  }

  constructor(context?: object, id?: string) {
    this.id = id ?? this.id;
    this.context = context;
  }

  public isCurrentState(name: string) {
    if (!this.currentState) return false;

    return this.currentState.name === name;
  }

  public addState(name: string, config?: IStateBase) {
    const { context } = this;

    this.states.set(name, {
      name,
      onEnter: config?.onEnter?.bind(context),
      onUpdate: config?.onUpdate?.bind(context),
      onExit: config?.onExit?.bind(context),
    });

    return this;
  }

  public setState(name: string) {
    if (!this.states.has(name)) {
      console.warn(`Tried to change to unknown state: ${name}`);
      return;
    }

    if (this.isCurrentState(name)) return;

    if (this.isChangingState) {
      this.changeStateQueue.push(name);
      return;
    }

    this.isChangingState = true;

    // console.log(`[StateMachine (${this.id})]
    // from ${this.currentState?.name ?? 'none'} to ${name}`);

    if (this.currentState && this.currentState.onExit) {
      this.currentState.onExit();
    }

    this.previousState = this.currentState;
    this.currentState = this.states.get(name)!;

    if (this.currentState.onEnter) {
      this.currentState.onEnter();
    }

    this.isChangingState = false;
  }

  public update(dt: number) {
    if (this.changeStateQueue.length > 0) {
      this.setState(this.changeStateQueue.shift()!);
      return;
    }

    if (this.currentState && this.currentState.onUpdate) {
      this.currentState.onUpdate(dt);
    }
  }
}
