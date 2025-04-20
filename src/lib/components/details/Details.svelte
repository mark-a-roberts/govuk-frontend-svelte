<script module lang="ts">
	import { htmlOrText, type IHtmlOrText } from '$lib/helpers/htmlOrText.svelte';
	import { govukAttributes, type IAttributes, type IClass } from '$lib/helpers/attributes.js';

	export interface IDetails extends IHtmlOrText{
		classes?: IClass;
		attributes?: IAttributes;
		id?: string;
		open?: boolean;
		summaryHtml?: string;
		summaryText?: string;
		caller?: () => any;
	}
</script>

<script lang="ts">
	let { classes, attributes, id, open, html, text, summaryHtml, summaryText, caller }: IDetails =
		$props();
</script>

<details {id} class={['govuk-details', classes]} {...govukAttributes(attributes)} {open}>
	<summary class="govuk-details__summary">
		<span class="govuk-details__summary-text">
			{@render htmlOrText({ html: summaryHtml, text: summaryText }, 6)}
		</span>
	</summary>
	<div class="govuk-details__text">
		{#if caller}
			{caller()}
		{:else}
			{@render htmlOrText({ html, text }, -1)}
		{/if}
	</div>
</details>
