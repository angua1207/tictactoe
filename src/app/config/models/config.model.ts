import { GridSize, PlayerSymbol } from "../../enum/playerSymbol";

export class ConfigParameters {
    gridSize: GridSize = GridSize.Three;
    playerSymbol: PlayerSymbol = PlayerSymbol.X;

    getGridSize(): number {
        return Number.parseInt(this.gridSize);
    }

    getPlayerSymbol(): PlayerSymbol {
        return this.playerSymbol;
    }

    getSecondPlayerSymbol(): PlayerSymbol {
        return this.playerSymbol === PlayerSymbol.X ? PlayerSymbol.O : PlayerSymbol.X;
    }
}

