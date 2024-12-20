import React from "react";
import { DateTime } from "luxon";

interface FormattedDateProps {
	date: string | Date;
	format?: string;
	timezone?: string;
	locale?: string;
}

const FormattedDate: React.FC<FormattedDateProps> = ({
	date,
	format = "DDDD",
	timezone = "local",
	locale = "es",
}) => {
	const dateTime = DateTime.fromISO(
		date instanceof Date ? date.toISOString() : date
	)
		.setZone(timezone)
		.setLocale(locale);
	const formattedDate = dateTime.toFormat(format);

	return <span>{formattedDate}</span>;
};

export default FormattedDate;
