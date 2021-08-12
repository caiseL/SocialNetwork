import DatauriParser from "datauri/parser";

const parser = new DatauriParser();
export const dataURIParser = (buffer: Buffer) => parser.format(".jpg", buffer);
