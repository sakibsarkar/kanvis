import { IShape } from "./shape";

export interface IProjects {
  projectName: string;
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
  _id: string;
}

export interface ICanvas {
  width: number;
  height: number;
  bgColor: string;
}

export interface IProject {
  projectName: string;
  canvas: ICanvas;
  thumbnail: string;
  shapes: IShape[] | [];
}
