export default class KeyboardAccess
{
  private _context: HTMLElement | Window;
  private _keys: { [key: string]: (e: KeyboardEvent) => void; } = {};

  public constructor(context: HTMLElement | Window)
  {
    this._context = context;
  }

  public AddKeys(...keymaps: [string, (e: KeyboardEvent) => void][])
  {
    keymaps.forEach(keymap => this._keys[keymap[0]] = keymap[1]);
    return this;
  }

  public Allow()
  {
    this._context.onkeydown = (e: KeyboardEvent) => this._keys[e.key]?.(e);
    return this;
  }

  public Block()
  {
    this._context.onkeydown = null;
  }

  public CharFor(handler: (e: KeyboardEvent) => void)
  {
    return Object.keys(this._keys).find(key => this._keys[key] === handler)?.toUpperCase();
  }
}
