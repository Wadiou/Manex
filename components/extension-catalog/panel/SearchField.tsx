import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SearchFieldProps = {
	value: string;
	onChange: (value: string) => void;
};

export function SearchField({
	value,
	onChange,
}: SearchFieldProps) {
	return (
		<div className="flex flex-col gap-2">
			<Label className="text-xs" htmlFor="manex-search">
				Search
			</Label>
			<Input
				id="manex-search"
				type="search"
				placeholder="Name, id, or description"
				value={value}
				onChange={(e) => {
					onChange(e.target.value);
				}}
				autoComplete="off"
				className="w-full"
			/>
		</div>
	);
}
