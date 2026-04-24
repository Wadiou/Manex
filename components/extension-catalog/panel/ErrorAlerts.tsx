type ErrorAlertsProps = {
	loadError: string | null;
	actionError: string | null;
};

export function ErrorAlerts({
	loadError,
	actionError,
}: ErrorAlertsProps) {
	return (
		<div className="flex flex-col gap-2">
			{loadError ? (
				<p role="alert" className="text-destructive text-sm">
					{loadError}
				</p>
			) : null}
			{actionError ? (
				<p role="alert" className="text-destructive text-sm">
					{actionError}
				</p>
			) : null}
		</div>
	);
}
