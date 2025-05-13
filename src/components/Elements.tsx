import {Select, SelectSection, SelectItem} from "@heroui/select";

export const SelectorIcon = (props:any) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        width="1em"
        {...props}
      >
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M8 9l4 -4l4 4" />
        <path d="M16 15l-4 4l-4 -4" />
      </svg>
    );
  };

export const animals = [
    {key: "cat", label: "Cat"},
    {key: "dog", label: "Dog"},
    {key: "elephant", label: "Elephant"},
    {key: "lion", label: "Lion"},
    {key: "tiger", label: "Tiger"},
    {key: "giraffe", label: "Giraffe"},
    {key: "dolphin", label: "Dolphin"},
    {key: "penguin", label: "Penguin"},
    {key: "zebra", label: "Zebra"},
    {key: "shark", label: "Shark"},
    {key: "whale", label: "Whale"},
    {key: "otter", label: "Otter"},
    {key: "crocodile", label: "Crocodile"},
  ];
interface CustomProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;

}

export const OwSelect: React.FC<CustomProps> = ({ className, children, ...props }) => {
    return (        
        <Select 
        
        label="Seleccion"
        labelPlacement="outside"
        selectorIcon={<SelectorIcon />}
        classNames={{
          trigger: "shadow-none",
        }}
        >
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
        
      
    )
}
