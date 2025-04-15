<script lang="ts">
	import { govukAttributes } from '$lib/helpers/attributes.js';
	export interface IHint {
		id?: string;
		classes?: string | string[];
		html?: string;
		text?: string;
	}
	let { id, classes, attributes, html, text }: IProps = $props();
</script>

<div {id} class={['govuk-hint', classes]} {...govukAttributes(attributes)}>
	{@render htmlOrText({ html, text }, 2)}
</div>
