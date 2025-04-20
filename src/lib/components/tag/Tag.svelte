<script module lang="ts">
	import { htmlOrText, type IHtmlOrText } from '$lib/helpers/htmlOrText.svelte';
	import { govukAttributes, type IAttributes, type IClass } from '$lib/helpers/attributes.js';

	export interface ITag extends IHtmlOrText {
		classes?: IClass;
		attributes?: IAttributes;
	}
</script>

<script lang="ts">
	let { html, text, classes, attributes }: ITag = $props();
</script>

<strong class={['govuk-tag', classes]} {...govukAttributes(attributes)}>
	{@render htmlOrText({ html, text }, 2)}
</strong>
