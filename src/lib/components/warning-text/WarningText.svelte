<script module lang="ts">
	import { govukAttributes, type IAttributes, type IClass } from '$lib/helpers/attributes.js';
	import type { IHtmlOrText } from "$lib/helpers/htmlOrText.svelte";
	export interface IWarning extends IHtmlOrText {
		id?: string;
		classes?: IClass;
		attributes?: IAttributes;
		iconFallbackText?: string;
	}
</script>

<script lang="ts">
	import { htmlOrText } from '$lib/helpers/htmlOrText.svelte';
	let { id, classes, attributes, html, text, iconFallbackText }: IWarning = $props();
</script>

<div {id} class={['govuk-warning-text', classes]} {...govukAttributes(attributes)}>
	<span class="govuk-warning-text__icon" aria-hidden="true">!</span>
	<strong class="govuk-warning-text__text">
		<span class="govuk-visually-hidden">{iconFallbackText ?? 'Warning'}</span>
		{@render htmlOrText({ html, text },-1)}
	</strong>
</div>
