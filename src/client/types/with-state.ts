export type WithState<T, K extends string> = {
    [P in K]: T;
} & {
    [P in `set${Capitalize<K>}`]:
    React.Dispatch<React.SetStateAction<T>>;
};
