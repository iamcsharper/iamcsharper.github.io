export interface FootprintData {
    name: string;
    isSquare: boolean;
    perCol: number;
    btnWidth: number;
    btnHeight: number;
    colHeight: (col: number) => number;
    packageWidth: (col: number) => number;
}

export const qfp64: FootprintData = {
    name: 'QFP64',
    isSquare: true,
    perCol: 16,
    btnWidth: 95,
    btnHeight: 24,
    colHeight(col: number) {
        return this.btnHeight * this.perCol;
    },
    packageWidth(col: number) {
        return this.colHeight(col) / 2;
    }
};

export const dip16: FootprintData = {
    name: 'DIP16',
    isSquare: false,
    perCol: 8,
    btnWidth: 95,
    btnHeight: 24,
    colHeight(col: number) {
        return this.btnHeight * this.perCol;
    },
    packageWidth(col: number) {
        return this.colHeight(col) / 2;
    }
};