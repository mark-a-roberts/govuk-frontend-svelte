<script module lang="ts">
	import { govukAttributes, type IAttributes, type IClass } from '$lib/helpers/attributes.js';
	import { htmlOrText, type IHtmlOrText } from "$lib/helpers/htmlOrText.svelte";

	export interface IHint extends IHtmlOrText{
		id?: string;
		classes?: IClass;
		attributes?: IAttributes;
	}
</script>

<script lang="ts">
	let { id, classes, attributes, html, text }: IHint = $props();
</script>

<div {id} class={['govuk-hint', classes]} {...govukAttributes(attributes)}>
	{@render htmlOrText({ html, text }, 2)}
</div>
