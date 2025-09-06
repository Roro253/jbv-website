'use client';
type Props = { options: string[]; value: string; onChange: (v: string) => void };
export default function FilterChips({ options, value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={"px-3 py-1 rounded-full border text-sm " + (value===opt ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50")}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
