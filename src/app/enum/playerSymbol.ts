export enum PlayerSymbol {
  X = 'X',
  O = 'O'
}

export const EmptySymbol = "";

export type GridContent = PlayerSymbol | typeof EmptySymbol | undefined;

export enum GridSize {
  Three = "3",
  Four = "4",
  Five = "5"
}