<script module lang="ts">
	import { htmlOrText } from '$lib/helpers/htmlOrText.svelte';
	import { govukAttributes, type IAttributes, type IClass } from '$lib/helpers/attributes.js';

	export interface IHint {
		id?: string;
		classes?: IClass;
		attributes?: IAttributes;
		html?: string;
		text?: string;
	}
</script>

<script lang="ts">
	let { id, classes, attributes, html, text }: IHint = $props();
</script>

<div {id} class={['govuk-hint', classes]} {...govukAttributes(attributes)}>
	{@render htmlOrText({ html, text }, 2)}
</div>
