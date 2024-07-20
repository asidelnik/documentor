
export interface IDropDownProps {
  buttonText: string;
  options: { [key: number]: string };
  update: (value: number) => void;
}
