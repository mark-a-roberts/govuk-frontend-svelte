<script lang="ts">
	import { htmlOrText } from '$lib/helpers/htmlOrText.svelte';
	import { govukAttributes, type IAttributes, type IClass } from '$lib/helpers/attributes.js';

	interface IDetails {
		classes?: IClass;
		attributes?: IAttributes;
		id?: string;
		open?: boolean;
		html?: string;
		text?: string;
		summaryHtml?: string;
		summaryText?: string;
		caller?: () => any;
	}

	let {
		classes,
		attributes,
		id,
		open,
		html,
		text,
		summaryHtml,
		summaryText,
		caller
	}: IDetails = $props();
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
