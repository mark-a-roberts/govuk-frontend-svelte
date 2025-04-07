<script lang="ts">
	import {htmlOrText} from '$lib/helpers/htmlOrText.svelte';
	import govukAttributes  from '$lib/helpers/attributes.svelte';

	let { classes, attributes, id, open, caller, html, text, summaryHtml, summaryText}: {
		classes?: string[],
		attributes?:any,
		id?: string,
		open?: boolean,
		caller?: ()=>(),
		html?: string,
		text?: string,
		summaryHtml?: string,
		summaryText?: string
	} = $props();

</script>
<details {id} class={["govuk-details", classes]}
				 { ...govukAttributes(attributes) }
				 {open}>
	<summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
			{@render htmlOrText({html: summaryHtml, text: summaryText}, 6)}
    </span>
	</summary>
	<div class="govuk-details__text">
		{#if caller}
			{caller()}
		{:else}
			{@render htmlOrText({ html, text}, -1)}
			{/if}
	</div>
</details>
