	interface I18nAttribute {
		messages?: string[];
		message?: string;
		key: string;
	}

	interface KeyValue {
		[key:string]: any
	}

	export const govukI18nAttributes = ( params: I18nAttribute ): KeyValue => {
		const key = `data-i18n.${params.key}`;
		if (params.messages) {
			return  params.messages.map(
					( message,index) => [ `${key}[${index}]`, encodeURI(message)]);
		} else if (params.message) {
			return { [key]: encodeURI(params.message) }
		}
		return {}
	};
