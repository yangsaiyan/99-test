
interface DefaultSelectProps<T extends number | string> {
    defaultSelection: T
    selection: T[]
    setSelection: (select: T) => void
    className?: string
}

export default function DefaultSelect<T extends number | string>(props: DefaultSelectProps<T>) {

    const { defaultSelection, selection, setSelection, className } = props

    function onSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelection(e.target?.value as T)
    }

    return (
        <select onChange={onSelect} defaultValue={defaultSelection} className={`select ${className}`}>
            {selection?.map((item) => {
                return <option key={item}>{item}</option>
            })}
        </select>
    )
}