import { FootprintData } from "./footprints";
import IPin from "./interfaces/Pin";

export interface ICol {
    left: number;
    top: number;
    pins: IPin[] | null,
    rotation: number
}

export const generateCols = (data: FootprintData): ICol[] => {
    if (data.isSquare) {
        const cols: ICol[] = [
            //левая
            {
                left: -data.btnWidth - data.packageWidth(0),
                top: -data.packageWidth(0),
                pins: null,
                rotation: 0
            },
            //нижняя
            {
                left: -data.btnWidth/2,
                top: data.btnWidth/2,
                pins: null,
                rotation: -90
            },
            //правая
            {
                left: data.packageWidth(2),
                top: -data.packageWidth(2),
                pins: null,
                rotation: 0
            },
            //верхняя
            {
                left: -data.btnWidth/2,
                top: -data.packageWidth(3)*2-data.btnWidth/2,
                pins: null,
                rotation: -90
            }
        ]
        
        for (let j = 0; j < 4; ++j) {
            const arr: IPin[] = [];
            for (let i = 0; i < data.perCol; ++i) {
                const id = ((j < 2) ? i : (data.perCol - 1 - i)) + j * data.perCol;
                arr.push({
                    id,
                    name: 'Pin' + (id+1),
                    x: 0,
                    y: 0
                });
            }
            
            cols[j].pins = arr;
        }
    
        return cols;
    } else {
        const cols: ICol[] = [
            //левая
            {
                left: -data.btnWidth - data.packageWidth(0),
                top: -data.packageWidth(0),
                pins: null,
                rotation: 0
            },
            //правая
            {
                left: data.packageWidth(0),
                top: -data.packageWidth(0),
                pins: null,
                rotation: 0
            },
        ]
        
        for (let j = 0; j < 2; ++j) {
            const arr: IPin[] = [];
            for (let i = 0; i < data.perCol; ++i) {
                const id = ((j < 2) ? i : (data.perCol - 1 - i)) + j * data.perCol;
                arr.push({
                    id,
                    name: 'Pin' + (id+1),
                    x: 0,
                    y: 0
                });
            }
            
            cols[j].pins = arr;
        }
    
        return cols;
    }
}