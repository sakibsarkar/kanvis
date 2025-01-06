import { ICanvas } from "./project";
import { IShape } from "./shape";
import { TUser } from "./user";

export interface ITemplate {
  _id: string;
  projectName: string;
  thumbnail: string;
  owner: TUser;
  shapes: IShape[];
  canvas: ICanvas;
  createdAt: string; // ISO 8601 format date
}
