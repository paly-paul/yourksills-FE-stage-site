export type EnumType<T> = keyof T;
export type JSONValue = Record<string, string | number | boolean | null>;
export interface ChartData extends Record<string, string | number> {
  name: string;
  value: number;
}
