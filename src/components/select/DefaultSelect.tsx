interface DefaultSelectProps<T extends number | string> {
  defaultSelection: T;
  selection: T[];
  setSelection: (select: T) => void;
  title?: string;
  className?: string;
}

export default function DefaultSelect<T extends number | string>(
  props: DefaultSelectProps<T>
) {
  const { defaultSelection, selection, setSelection, className, title } = props;

  function onSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelection(e.target?.value as T);
  }

  return (
    <select
      onChange={onSelect}
      defaultValue={defaultSelection}
      className={`select ${className}`}
      id={title}
    >
      {selection?.map((item) => {
        return <option key={item}>{item}</option>;
      })}
    </select>
  );
}
