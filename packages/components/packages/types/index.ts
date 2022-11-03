/**
 * 元组类型
 */
export type Tuple<T, TLength extends number> = [T, ...T[]] & { length: TLength };