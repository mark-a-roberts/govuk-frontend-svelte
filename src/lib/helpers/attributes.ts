interface KSType {
	[key: string]: any;
}

export const govukAttributes = (attributes: { name: string; value: any, optional?: boolean }[] | KSType) => {
	if (Array.isArray(attributes)) {
		return attributes.reduce((result: KSType, attribute: KSType) => {
			result[attribute.name] = attribute.value;
			return result;
		}, {});
	}
	return attributes;
};
